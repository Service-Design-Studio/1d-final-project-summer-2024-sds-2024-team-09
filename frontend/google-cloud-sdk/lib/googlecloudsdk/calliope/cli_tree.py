# -*- coding: utf-8 -*- #
# Copyright 2015 Google LLC. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""A module for the Cloud SDK CLI tree external representation."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

import json
import os
import re
import sys
import textwrap

from googlecloudsdk.calliope import walker
from googlecloudsdk.core import config
from googlecloudsdk.core import exceptions
from googlecloudsdk.core import module_util
from googlecloudsdk.core.util import files

import six

# Lazy import modules to improve tab completion performance.
# Alternatively, this module could be reorganized to separate tree loading from
# dumping but that would have significant fallout for the module's usage
# throughout the code base.
# pylint:disable=g-import-not-at-top

# This module is the CLI tree generator. VERSION is a stamp that is used to
# detect breaking changes. If an external CLI tree version does not exactly
# match VERSION then it is incompatible and must be regenerated or ignored.
# Any changes to the serialized CLI dict attribute names or value semantics
# must increment VERSION. For this reason it's a monotonically increasing
# integer string and not a semver.
VERSION = '1'
DEFAULT_CLI_NAME = 'gcloud'

# A READONLY tree is accepted and never regenerated by default.
CLI_VERSION_READONLY = 'READONLY'
# UNKNOWN is used when we don't know how to regenerate an existing tree.
CLI_VERSION_UNKNOWN = 'UNKNOWN'

# The release CLI version is a semver. In pre-prelease and test environments
# it could be a constant string or YYYY.MM.DD stamp, respectively. For test
# statis the stamp is replaced by a fixed string.
TEST_CLI_VERSION_HEAD = 'HEAD'
TEST_CLI_VERSION_TEST = 'TEST'

LOOKUP_ARGUMENTS = 'arguments'
LOOKUP_CLI_VERSION = 'CLI_VERSION'
LOOKUP_VERSION = 'VERSION'

LOOKUP_ATTR = 'attr'
LOOKUP_CAPSULE = 'capsule'
LOOKUP_CATEGORY = 'category'
LOOKUP_CHOICES = 'choices'
LOOKUP_COMMANDS = 'commands'
LOOKUP_COMPLETER = 'completer'
LOOKUP_CONSTRAINTS = 'constraints'
LOOKUP_DEFAULT = 'default'
LOOKUP_DESCRIPTION = 'description'
LOOKUP_FLAGS = 'flags'
LOOKUP_GROUP = 'group'
LOOKUP_GROUPS = 'groups'
LOOKUP_INVERTED_SYNOPSIS = 'inverted_synopsis'
LOOKUP_IS_GLOBAL = 'is_global'
LOOKUP_IS_GROUP = 'is_group'
LOOKUP_IS_HIDDEN = 'is_hidden'
LOOKUP_IS_MUTEX = 'is_mutex'
LOOKUP_IS_POSITIONAL = 'is_positional'
LOOKUP_IS_REQUIRED = 'is_required'
LOOKUP_NAME = 'name'
LOOKUP_NARGS = 'nargs'
LOOKUP_PATH = 'path'
LOOKUP_POSITIONALS = 'positionals'
LOOKUP_PROPERTY = 'property'
LOOKUP_RELEASE = 'release'
LOOKUP_REQUIRED = 'required'
LOOKUP_SECTIONS = 'sections'
LOOKUP_TYPE = 'type'
LOOKUP_UNIVERSE_COMPATIBLE = 'universe_compatible'
LOOKUP_DEFAULT_UNIVERSE_COMPATIBLE = 'default_universe_compatible'
LOOKUP_VALUE = 'value'


class Error(exceptions.Error):
  """Base exception for this module."""


class CliCommandVersionError(Error):
  """Loaded CLI tree CLI command version mismatch."""


class SdkRootNotFoundError(Error):
  """Raised if SDK root is not found."""


class SdkConfigNotFoundError(Error):
  """Raised if SDK root config/ does not exist."""


class SdkDataCliNotFoundError(Error):
  """Raised if SDK root data/cli/ does not exist."""


class CliTreeVersionError(Error):
  """Loaded CLI tree version mismatch."""


class CliTreeLoadError(Error):
  """CLI tree load error."""


def _IsRunningUnderTest():
  """Mock function that returns True if running under test."""
  return False


def _GetDefaultCliCommandVersion():
  """Return the default CLI command version."""
  if _IsRunningUnderTest():
    # test installation - return a constant version for reproducability
    return TEST_CLI_VERSION_TEST
  version = config.CLOUD_SDK_VERSION
  if version != TEST_CLI_VERSION_HEAD:
    # normal installation
    return version
  try:
    from googlecloudsdk.core.updater import update_manager

    manager = update_manager.UpdateManager()
    components = manager.GetCurrentVersionsInformation()
    # personal installation
    version = components['core']  # YYYY.MM.DD more informative than HEAD
  except (KeyError, exceptions.Error):
    # HEAD will have to do
    pass
  return version


def _GetDescription(arg):
  """Returns the most detailed description from arg."""
  from googlecloudsdk.calliope import usage_text

  return usage_text.GetArgDetails(arg)


def _NormalizeDescription(description):
  """Normalizes description text.

  Args:
    description: str, The text to be normalized.

  Returns:
    str, The normalized text.
  """
  if callable(description):
    description = description()
  if description:
    description = textwrap.dedent(description)
  return six.text_type(description or '')


class Argument(object):
  """Group, Flag or Positional argument.

  Attributes:
    attr: dict, Miscellaneous {name: value} attributes.
    description: str, The help text.
    is_hidden: bool, True if the argument help text is disabled.
    is_group: bool, True if this is an argument group.
    is_positional: bool, True if this is a positional argument.
    is_mutex: bool, True if this is a mutex group.
    is_required: bool, The argument must be specified.
  """

  def __init__(self, arg):

    self.attr = {}
    self.description = _NormalizeDescription(_GetDescription(arg))
    self.is_group = False
    self.is_hidden = getattr(arg, 'is_hidden', getattr(arg, 'hidden', False))
    self.is_positional = False
    self.is_mutex = getattr(arg, 'is_mutex', getattr(arg, 'mutex', False))
    self.is_required = arg.is_required


class FlagOrPositional(Argument):
  """Group, Flag or Positional argument.

  Attributes:
    category: str, The argument help category name.
    completer: str, Resource completer module path.
    default: (self.type), The default flag value or None if no default.
    description: str, The help text.
    name: str, The normalized name ('_' => '-').
    nargs: {0, 1, '?', '*', '+'}
    value: str, The argument value documentation name.
  """

  def __init__(self, arg, name):

    super(FlagOrPositional, self).__init__(arg)
    self.category = getattr(arg, LOOKUP_CATEGORY, '')
    completer = getattr(arg, LOOKUP_COMPLETER, None)
    if completer:
      try:
        # A calliope.parser_completer.ArgumentCompleter object.
        completer_class = completer.completer_class
      except AttributeError:
        # An argparse callable completer.
        completer_class = completer
      completer = module_util.GetModulePath(completer_class)
    self.completer = completer
    self.default = arg.default
    self.description = _NormalizeDescription(_GetDescription(arg))
    self.name = six.text_type(name)
    self.nargs = six.text_type(arg.nargs or 0)
    if arg.metavar:
      self.value = six.text_type(arg.metavar)
    else:
      self.value = self.name.lstrip('-').replace('-', '_').upper()
    self._Scrub()

  def _Scrub(self):
    """Scrubs private paths in the default value and description.

    Argument default values and "The default is ..." description text are the
    only places where dynamic private file paths can leak into the cli_tree.
    This method is called on all args.

    The test is rudimentary but effective. Any default value that looks like an
    absolute path on unix or windows is scrubbed. The default value is set to
    None and the trailing "The default ... is ..." sentence in the description,
    if any, is deleted. It's OK to be conservative here and match aggressively.
    """
    if not isinstance(self.default, six.string_types):
      return
    if not re.match(r'/|[A-Za-z]:\\', self.default):
      return
    self.default = None
    match = re.match(
        r'(.*\.) The default (value )?is ', self.description, re.DOTALL
    )
    if match:
      self.description = match.group(1)


class Flag(FlagOrPositional):
  """Flag info.

  Attributes:
    choices: list|dict, The list of static choices.
    is_global: bool, True if the flag is global (inherited from the root).
    type: str, The flag value type name.
  """

  def __init__(self, flag, name):
    from googlecloudsdk.calliope import arg_parsers

    super(Flag, self).__init__(flag, name)
    self.choices = []
    self.is_global = flag.is_global
    # ArgParse does not have an explicit Boolean flag type. By
    # convention a flag with arg.nargs=0 and action='store_true' or
    # action='store_false' is a Boolean flag. arg.type gives no hint
    # (arg.type=bool would have been so easy) and we don't have access
    # to args.action here. Even then the flag can take on non-Boolean
    # values. If arg.default is not specified then it will be None, but
    # it can be set to anything. So we do a conservative 'truthiness'
    # test here.
    if flag.nargs == 0:
      self.type = 'bool'
      self.default = bool(flag.default)
    else:
      if isinstance(flag.type, six.integer_types) or isinstance(
          flag.default, six.integer_types
      ):
        self.type = 'int'
      elif isinstance(flag.type, float) or isinstance(flag.default, float):
        self.type = 'float'
      elif isinstance(flag.type, arg_parsers.ArgDict):
        self.type = 'dict'
      elif isinstance(flag.type, arg_parsers.ArgList):
        self.type = 'list'
      else:
        self.type = module_util.GetModulePath(flag.type) or 'string'
    if flag.choices:
      choices = sorted(flag.choices)
      if choices == ['false', 'true']:
        self.type = 'bool'
      else:
        self.choices = flag.choices

    if getattr(flag, LOOKUP_INVERTED_SYNOPSIS, False):
      self.attr[LOOKUP_INVERTED_SYNOPSIS] = True
    prop, kind, value = getattr(flag, 'store_property', (None, None, None))
    if prop:
      # This allows actions.Store*Property() to be reconstituted.
      attr = {LOOKUP_NAME: six.text_type(prop)}
      if kind == 'bool':
        flag.type = 'bool'
      if value:
        attr[LOOKUP_VALUE] = value
      self.attr[LOOKUP_PROPERTY] = attr


class Positional(FlagOrPositional):
  """Positional info."""

  def __init__(self, positional, name):

    super(Positional, self).__init__(positional, name)
    self.is_positional = True
    if positional.nargs is None:
      self.nargs = '1'
    self.is_required = positional.nargs not in (0, '?', '*', '...')


class Group(Argument):
  """Makes a constraint group from a command argument interceptor.

  Attributes:
    arguments: [Argument], The list of arguments in the argument group.
  """

  def __init__(self, group, key=None, arguments=None):
    super(Group, self).__init__(group)
    self._key = key
    self.is_group = True
    self.arguments = arguments


class Constraint(Group):
  """Argument constraint group info."""

  def __init__(self, group):
    order = []
    for arg in group.arguments:
      if arg.is_group:
        constraint = Constraint(arg)
        order.append((constraint._key, constraint))  # pylint: disable=protected-access, _key must not be serialized
      elif arg.is_positional:
        name = arg.dest.replace('_', '-')
        order.append(('', Positional(arg, name)))
      else:
        for name in arg.option_strings:
          if name.startswith('--'):
            name = name.replace('_', '-')
            order.append((name, Flag(arg, name)))
    order = sorted(order, key=lambda item: item[0])
    super(Constraint, self).__init__(
        group,
        arguments=[item[1] for item in order],
        key=order[0][0] if order else '',
    )


class Command(object):
  """Command/group info.

  Attributes:
    capsule: str, The first line of the command docstring.
    commands: {name:Command}, The subcommands in a command group.
    constraints: [Argument], Argument constraint tree.
    flags: {str:Flag}, Command flag dict, indexed by normalized flag name.
    is_global: bool, True if the command is the root command.
    is_hidden: bool, True if the command is hidden.
    universe_compatible: bool, True if the command is universe compatible.
    default_universe_compatible: bool, True if the command is compatible in the
      default universe.
    name: str, The normalized name ('_' => '-').
    positionals: [dict], Command positionals list.
    release: str, The command release name {'internal', 'alpha', 'beta', 'ga'}.
    sections: {str:str}, Section help dict, indexed by section name. At minimum
      contains the DESCRIPTION section.
  """

  def __init__(self, command, parent):
    from googlecloudsdk.core.console import console_io

    self.commands = {}
    self.flags = {}
    self.is_global = not bool(parent)
    self.is_group = command.is_group
    self.is_hidden = command.IsHidden()
    self.universe_compatible = command.IsUniverseCompatible()
    self.default_universe_compatible = command.IsDefaultUniverseCompatible()
    self.name = command.name.replace('_', '-')
    self.path = command.GetPath()
    self.positionals = []
    self.release = command.ReleaseTrack().id
    self.sections = {}
    command_path_string = ' '.join(self.path)
    parent_path_string = ' '.join(parent.path) if parent else ''
    self.release, capsule = self.__Release(
        command, self.release, getattr(command, 'short_help', '')
    )

    # This code block must be meticulous on when and where LazyFormat expansion
    # is applied to the markdown snippets. First, no expanded text should be
    # passed as a LazyFormat kwarg. Second, no unexpanded text should appear
    # in the CLI tree. The LazyFormat calls are ordered to make sure that
    # doesn't happen.
    capsule = _NormalizeDescription(capsule)
    sections = {}
    self.release, description = self.__Release(
        command, self.release, getattr(command, 'long_help', '')
    )
    detailed_help = getattr(command, 'detailed_help', {})
    sections.update(detailed_help)
    description = _NormalizeDescription(description)
    if 'DESCRIPTION' not in sections:
      sections['DESCRIPTION'] = description
    notes = command.GetNotesHelpSection()
    if notes:
      sections['NOTES'] = notes
    if sections:
      for name, contents in six.iteritems(sections):
        # islower() section names were used to convert markdown in command
        # docstrings into the static self.section[] entries seen here.
        if name.isupper():
          self.sections[name] = console_io.LazyFormat(
              _NormalizeDescription(contents),
              command=command_path_string,
              index=capsule,
              description=description,
              parent_command=parent_path_string,
          )
    self.capsule = console_io.LazyFormat(
        capsule,
        command=command_path_string,
        man_name='.'.join(self.path),
        top_command=self.path[0] if self.path else '',
        parent_command=parent_path_string,
        **sections
    )

    # _parent is explicitly private so it won't appear in serialized output.
    self._parent = parent
    if parent:
      parent.commands[self.name] = self
    args = command.ai

    # Collect the command specific flags.
    for arg in args.flag_args:
      for name in arg.option_strings:
        if name.startswith('--'):
          # Don't include ancestor flags, with the exception of --help.
          if name != '--help' and self.__Ancestor(name):
            continue
          name = name.replace('_', '-')
          flag = Flag(arg, name)
          self.flags[flag.name] = flag

    # Collect the ancestor flags.
    for arg in args.ancestor_flag_args:
      for name in arg.option_strings:
        if name.startswith('--'):
          name = name.replace('_', '-')
          flag = Flag(arg, name)
          self.flags[flag.name] = flag

    # Collect the positionals.
    for arg in args.positional_args:
      name = arg.dest.replace('_', '-')
      positional = Positional(arg, name)
      self.positionals.append(positional)

    # Collect the arg group constraints.
    self.constraints = Constraint(args)

  def __Ancestor(self, flag):
    """Determines if flag is provided by an ancestor command.

    Args:
      flag: str, The flag name (no leading '-').

    Returns:
      bool, True if flag provided by an ancestor command, false if not.
    """
    command = self._parent
    while command:
      if flag in command.flags:
        return True
      command = command._parent  # pylint: disable=protected-access
    return False

  def __Release(self, command, release, description):
    """Determines the release type from the description text.

    Args:
      command: Command, The CLI command/group description.
      release: int, The default release type.
      description: str, The command description markdown.

    Returns:
      (release, description): (int, str), The actual release and description
        with release prefix omitted.
    """
    description = _NormalizeDescription(description)
    path = command.GetPath()
    if len(path) >= 2 and path[1] == 'internal':
      release = 'INTERNAL'
    return release, description


class CliTreeGenerator(walker.Walker):
  """Generates an external representation of the gcloud CLI tree.

  This implements the resource generator for gcloud meta list-gcloud.
  """

  def __init__(self, cli=None, branch=None, *args, **kwargs):
    """branch is the command path of the CLI subtree to generate."""
    super(CliTreeGenerator, self).__init__(*args, cli=cli, **kwargs)
    self._branch = branch

  def Visit(self, node, parent, is_group):
    """Visits each node in the CLI command tree to construct the external rep.

    Args:
      node: group/command CommandCommon info.
      parent: The parent Visit() return value, None at the top level.
      is_group: True if node is a command group.

    Returns:
      The subtree parent value, used here to construct an external rep node.
    """
    if self._Prune(node):
      return parent
    return Command(node, parent)

  def _Prune(self, command):
    """Returns True if command should be pruned from the CLI tree.

    Branch pruning is mainly for generating static unit test data. The static
    tree for the entire CLI would be an unnecessary burden on the depot.

    self._branch, if not None, is already split into a path with the first
    name popped. If branch is not a prefix of command.GetPath()[1:] it will
    be pruned.

    Args:
      command: The calliope Command object to check.

    Returns:
      True if command should be pruned from the CLI tree.
    """
    # Only prune if branch is not empty.
    if not self._branch:
      return False
    path = command.GetPath()
    # The top level command is never pruned.
    if len(path) < 2:
      return False
    path = path[1:]
    # All tracks in the branch are active.
    if path[0] in ('alpha', 'beta'):
      path = path[1:]
    for name in self._branch:
      # branch is longer than path => don't prune.
      if not path:
        return False
      # prefix mismatch => prune.
      if path[0] != name:
        return True
      path.pop(0)
    # branch is a prefix of path => don't prune.
    return False


_LOOKUP_SERIALIZED_FLAG_LIST = 'SERIALIZED_FLAG_LIST'


def _Serialize(tree):
  """Returns the CLI tree optimized for serialization.

  Serialized data does not support pointers. The CLI tree can have a lot of
  redundant data, especially with ancestor flags included with each command.
  This function collects the flags into the _LOOKUP_SERIALIZED_FLAG_LIST array
  in the root node and converts the flags dict values to indices into that
  array.

  Serialization saves a lot of space and allows the ancestor flags to be
  included in the LOOKUP_FLAGS dict of each command. It also saves time for
  users of the tree because the LOOKUP_FLAGS dict also contains the ancestor
  flags.

  Apply this function to the CLI tree just before dumping. For the 2017-03
  gcloud CLI with alpha and beta included and all ancestor flags included in
  each command node this function reduces the generation time from
  ~2m40s to ~35s and the dump file size from 35Mi to 4.3Mi.

  Args:
    tree: The CLI tree to be optimized.

  Returns:
    The CLI tree optimized for serialization.
  """
  # If tree is already serialized we're done.
  if getattr(tree, _LOOKUP_SERIALIZED_FLAG_LIST, None):
    return tree

  # Collect the dict of all flags.
  all_flags = {}

  class _FlagIndex(object):
    """Flag index + definition."""

    def __init__(self, flag):
      self.flag = flag
      self.index = 0

  def _FlagIndexKey(flag):
    return '::'.join([
        six.text_type(flag.name),
        six.text_type(flag.attr),
        six.text_type(flag.category),
        '[{}]'.format(', '.join(six.text_type(c) for c in flag.choices)),
        six.text_type(flag.completer),
        six.text_type(flag.default),
        six.text_type(flag.description),
        six.text_type(flag.is_hidden),
        six.text_type(flag.is_global),
        six.text_type(flag.is_group),
        six.text_type(flag.is_required),
        six.text_type(flag.nargs),
        six.text_type(flag.type),
        six.text_type(flag.value),
    ])

  def _CollectAllFlags(command):
    for flag in command.flags.values():
      all_flags[_FlagIndexKey(flag)] = _FlagIndex(flag)
    for subcommand in command.commands.values():
      _CollectAllFlags(subcommand)

  _CollectAllFlags(tree)

  # Order the dict into the ordered tree _LOOKUP_SERIALIZED_FLAG_LIST list and
  # assign ordered indices to the all_flags dict entry. The indices are ordered
  # for reproducible serializations for testing.
  all_flags_list = []
  for index, key in enumerate(sorted(all_flags)):
    fi = all_flags[key]
    fi.index = index
    all_flags_list.append(fi.flag)

  # Replace command flags dict values by the _LOOKUP_SERIALIZED_FLAG_LIST index.
  # Negative indices index into the command positionals.

  def _ReplaceConstraintFlagWithIndex(arguments):
    positional_index = 0
    for i, arg in enumerate(arguments):
      if isinstance(arg, int):
        pass
      elif arg.is_group:
        _ReplaceConstraintFlagWithIndex(arg.arguments)
      elif arg.is_positional:
        positional_index -= 1
        arguments[i] = positional_index
      else:
        try:
          arguments[i] = all_flags[_FlagIndexKey(arg)].index
        except KeyError:
          pass

  def _ReplaceFlagWithIndex(command):
    for name, flag in six.iteritems(command.flags):
      command.flags[name] = all_flags[_FlagIndexKey(flag)].index
      _ReplaceConstraintFlagWithIndex(command.constraints.arguments)
    for subcommand in command.commands.values():
      _ReplaceFlagWithIndex(subcommand)

  _ReplaceFlagWithIndex(tree)

  setattr(tree, _LOOKUP_SERIALIZED_FLAG_LIST, all_flags_list)

  return tree


def _DumpToFile(tree, f):
  """Dump helper."""
  from googlecloudsdk.core.resource import resource_printer
  from googlecloudsdk.core.resource import resource_projector

  resource_printer.Print(
      resource_projector.MakeSerializable(_Serialize(tree)), 'json', out=f
  )


def CliTreeDir():
  """The CLI tree default directory.

  This directory is part of the installation and its contents are managed
  by the installer/updater.

  Raises:
    SdkRootNotFoundError: If the SDK root directory does not exist.
    SdkDataCliNotFoundError: If the SDK root data CLI directory does not exist.

  Returns:
    The directory path.
  """
  paths = config.Paths()
  if paths.sdk_root is None:
    raise SdkRootNotFoundError(
        'SDK root not found for this installation. CLI tree cannot be '
        'loaded or generated.'
    )
  directory = os.path.join(paths.sdk_root, 'data', 'cli')
  if not os.path.isdir(directory):
    raise SdkDataCliNotFoundError(
        'SDK root data CLI directory [{}] not found for this installation. '
        'CLI tree cannot be loaded or generated.'.format(directory)
    )
  return directory


def CliTreeConfigDir():
  """Returns the CLI tree config directory.

  This directory is part of the user config directory its contents are stable
  across releases/installations/updates.

  Raises:
    SdkConfigNotFoundError: If the SDK config directory does not exist.

  Returns:
    The directory path.
  """
  global_config_dir = config.Paths().global_config_dir
  cli_tree_config_dir = os.path.join(global_config_dir, 'cli')
  if os.path.isdir(global_config_dir):
    if not os.path.isdir(cli_tree_config_dir):
      os.makedirs(cli_tree_config_dir, exist_ok=True)
  else:
    raise SdkConfigNotFoundError(
        'CLI config directory [{}] not found for this installation. '
        'CLI tree cannot be loaded or generated.'.format(
            global_config_dir
        )
    )
  return cli_tree_config_dir


def CliTreePath(name=DEFAULT_CLI_NAME, directory=None):
  """Returns the CLI tree file path for name, default if directory is None."""
  return os.path.join(directory or CliTreeDir(), name + '.json')


def CliTreeConfigPath(name=DEFAULT_CLI_NAME, directory=None):
  """Returns the CLI tree config file path for name, default if directory is None."""
  return os.path.join(directory or CliTreeConfigDir(), name + '.json')


def _GenerateRoot(cli, path=None, name=DEFAULT_CLI_NAME, branch=None):
  """Generates and returns the CLI root for name."""
  from googlecloudsdk.core.console import progress_tracker

  if path == '-':
    message = 'Generating the {} CLI'.format(name)
  elif path:
    message = 'Generating the {} CLI and caching in [{}]'.format(name, path)
  else:
    message = 'Generating the {} CLI for one-time use (no SDK root)'.format(
        name
    )
  with progress_tracker.ProgressTracker(message):
    tree = CliTreeGenerator(cli, branch=branch).Walk(hidden=True)
    setattr(tree, LOOKUP_VERSION, VERSION)
    setattr(tree, LOOKUP_CLI_VERSION, _GetDefaultCliCommandVersion())
    return tree


def Dump(cli, path=None, name=DEFAULT_CLI_NAME, branch=None):
  """Dumps the CLI tree to a JSON file.

  The tree is processed by cli_tree._Serialize() to minimize the JSON file size
  and generation time.

  Args:
    cli: The CLI.
    path: The JSON file path to dump to, the standard output if '-', the default
      CLI tree path if None.
    name: The CLI name.
    branch: The path of the CLI subtree to generate.

  Returns:
    The generated CLI tree.
  """
  if path is None:
    path = CliTreeConfigPath()
  tree = _GenerateRoot(cli=cli, path=path, name=name, branch=branch)
  if path == '-':
    _DumpToFile(tree, sys.stdout)
  else:
    with files.FileWriter(path) as f:
      _DumpToFile(tree, f)
  from googlecloudsdk.core.resource import resource_projector

  return resource_projector.MakeSerializable(tree)


def _IsUpToDate(tree, path, ignore_errors, verbose):
  """Returns True if the CLI tree on path is up to date.

  Args:
    tree: The loaded CLI tree.
    path: The path tree was loaded from.
    ignore_errors: If True then return True if tree versions match. Otherwise
      raise exceptions on version mismatch.
    verbose: Display a status line for up to date CLI trees if True.

  Raises:
    CliTreeVersionError: tree version mismatch.
    CliCommandVersionError: CLI command version mismatch.

  Returns:
    True if tree versions match.
  """

  expected_tree_version = VERSION
  actual_tree_version = tree.get(LOOKUP_VERSION)
  if actual_tree_version != expected_tree_version:
    if not ignore_errors:
      raise CliCommandVersionError(
          'CLI tree [{}] version is [{}], expected [{}]'.format(
              path, actual_tree_version, expected_tree_version
          )
      )
    return False

  expected_command_version = _GetDefaultCliCommandVersion()
  actual_command_version = tree.get(LOOKUP_CLI_VERSION)
  test_versions = (TEST_CLI_VERSION_HEAD, TEST_CLI_VERSION_TEST)
  if (
      actual_command_version in test_versions
      or expected_command_version in test_versions
  ):
    pass
  elif actual_command_version != expected_command_version:
    if not ignore_errors:
      raise CliCommandVersionError(
          'CLI tree [{}] command version is [{}], expected [{}]'.format(
              path, actual_command_version, expected_command_version
          )
      )
    return False

  if verbose:
    from googlecloudsdk.core import log

    log.status.Print(
        '[{}] CLI tree version [{}] is up to date.'.format(
            DEFAULT_CLI_NAME, expected_command_version
        )
    )
  return True


def _Load(path, cli=None, force=False, verbose=False):
  """Load() helper. Returns a tree or None if the tree failed to load."""
  try:
    if not force:
      tree = json.loads(files.ReadFileContents(path))
      if _IsUpToDate(tree, path, bool(cli), verbose):
        return tree
      del tree
    # Clobber path to make sure it's regenerated.
    try:
      os.remove(path)
    except OSError:
      pass
  except files.Error as e:
    if not cli:
      raise CliTreeLoadError(six.text_type(e))
  return None


def _Deserialize(tree):
  """Returns the deserialization of a serialized CLI tree."""
  all_flags_list = tree.get(_LOOKUP_SERIALIZED_FLAG_LIST)
  if not all_flags_list:
    # If tree wasn't serialized we're done.
    return tree
  tree[_LOOKUP_SERIALIZED_FLAG_LIST] = None
  del tree[_LOOKUP_SERIALIZED_FLAG_LIST]

  def _ReplaceConstraintIndexWithArgReference(arguments, positionals):
    for i, arg in enumerate(arguments):
      if isinstance(arg, int):
        if arg < 0:  # a positional index
          arguments[i] = positionals[-(arg + 1)]
        else:  # a flag index
          arguments[i] = all_flags_list[arg]
      elif arg.get(LOOKUP_IS_GROUP, False):
        _ReplaceConstraintIndexWithArgReference(
            arg.get(LOOKUP_ARGUMENTS), positionals
        )

  def _ReplaceIndexWithFlagReference(command):
    flags = command[LOOKUP_FLAGS]
    for name, index in six.iteritems(flags):
      flags[name] = all_flags_list[index]
    arguments = command[LOOKUP_CONSTRAINTS][LOOKUP_ARGUMENTS]
    _ReplaceConstraintIndexWithArgReference(
        arguments, command[LOOKUP_POSITIONALS]
    )
    for subcommand in command[LOOKUP_COMMANDS].values():
      _ReplaceIndexWithFlagReference(subcommand)

  _ReplaceIndexWithFlagReference(tree)

  return tree


def Load(
    path=None, cli=None, force=False, one_time_use_ok=False, verbose=False
):
  """Loads the default CLI tree from the json file path.

  Args:
    path: The path name of the JSON file the CLI tree was dumped to. None for
      the default CLI tree path.
    cli: The CLI. If not None and path fails to import, a new CLI tree is
      generated, written to path, and returned.
    force: Update an existing tree by forcing it to be out of date if True.
    one_time_use_ok: If True and the load fails then the CLI tree is generated
      on the fly for one time use.
    verbose: Display a status line for up to date CLI trees if True.

  Raises:
    CliTreeVersionError: loaded tree version mismatch
    CliTreeLoadError: load errors

  Returns:
    The CLI tree.
  """
  if path is None:
    try:
      path = CliTreeConfigPath()
    except SdkConfigNotFoundError:
      if cli and one_time_use_ok:
        from googlecloudsdk.core.resource import resource_projector

        tree = _GenerateRoot(cli)
        return resource_projector.MakeSerializable(tree)
      raise

  # First try to load the tree.
  tree = _Load(path, cli=cli, force=force, verbose=verbose)
  if not tree:
    # The load failed. Regenerate and attempt to load again.
    Dump(cli=cli, path=path)
    tree = _Load(path)

  return _Deserialize(tree)


def Node(
    command=None,
    commands=None,
    constraints=None,
    flags=None,
    path=None,
    positionals=None,
    description=None,
):
  """Creates and returns a CLI tree node dict."""
  path = []
  if command:
    path.append(command)
    if not description:
      description = 'The {} command.'.format(command)
  return {
      LOOKUP_CAPSULE: '',
      LOOKUP_COMMANDS: commands or {},
      LOOKUP_CONSTRAINTS: constraints or {},
      LOOKUP_FLAGS: flags or {},
      LOOKUP_IS_GROUP: True,
      LOOKUP_IS_HIDDEN: False,
      LOOKUP_PATH: path,
      LOOKUP_POSITIONALS: positionals or {},
      LOOKUP_RELEASE: 'GA',
      LOOKUP_SECTIONS: {'DESCRIPTION': description},
  }