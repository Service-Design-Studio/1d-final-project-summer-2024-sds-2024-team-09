<<<<<<< HEAD
// module.exports = function(api) {
//   var validEnv = ['development', 'test', 'production']
//   var currentEnv = api.env()
//   var isDevelopmentEnv = api.env('development')
//   var isProductionEnv = api.env('production')
//   var isTestEnv = api.env('test')

//   if (!validEnv.includes(currentEnv)) {
//     throw new Error(
//       'Please specify a valid `NODE_ENV` or ' +
//         '`BABEL_ENV` environment variables. Valid values are "development", ' +
//         '"test", and "production". Instead, received: ' +
//         JSON.stringify(currentEnv) +
//         '.'
//     )
//   }

//   return {
//     presets: [
//       isTestEnv && [
//         '@babel/preset-env',
//         {
//           targets: {
//             node: 'current'
//           }
//         }
//       ],
//       (isProductionEnv || isDevelopmentEnv) && [
//         '@babel/preset-env',
//         {
//           forceAllTransforms: true,
//           useBuiltIns: 'entry',
//           corejs: 3,
//           modules: false,
//           exclude: ['transform-typeof-symbol']
//         }
//       ]
//     ].filter(Boolean),
//     plugins: [
//       'babel-plugin-macros',
//       '@babel/plugin-syntax-dynamic-import',
//       isTestEnv && 'babel-plugin-dynamic-import-node',
//       '@babel/plugin-transform-destructuring',
//       [
//         '@babel/plugin-proposal-class-properties',
//         {
//           loose: true
//         }
//       ],
//       [
//         '@babel/plugin-proposal-object-rest-spread',
//         {
//           useBuiltIns: true
//         }
//       ],
//       [
//         '@babel/plugin-proposal-private-methods',
//         {
//           loose: true
//         }
//       ],
//       [
//         '@babel/plugin-proposal-private-property-in-object',
//         {
//           loose: true
//         }
//       ],
//       [
//         '@babel/plugin-transform-runtime',
//         {
//           helpers: false
//         }
//       ],
//       [
//         '@babel/plugin-transform-regenerator',
//         {
//           async: false
//         }
//       ]
//     ].filter(Boolean)
//   }
// }

module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true
        },
        useBuiltIns: 'entry',
        corejs: { version: 3, proposals: true }
      }
    ]
  ];

  const plugins = [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-private-property-in-object'
  ];

  return {
    presets,
    plugins
  };
};
=======
module.exports = function(api) {
  var validEnv = ['development', 'test', 'production']
  var currentEnv = api.env()
  var isDevelopmentEnv = api.env('development')
  var isProductionEnv = api.env('production')
  var isTestEnv = api.env('test')

  if (!validEnv.includes(currentEnv)) {
    throw new Error(
      'Please specify a valid `NODE_ENV` or ' +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        '"test", and "production". Instead, received: ' +
        JSON.stringify(currentEnv) +
        '.'
    )
  }

  return {
    presets: [
      isTestEnv && [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      (isProductionEnv || isDevelopmentEnv) && [
        '@babel/preset-env',
        {
          forceAllTransforms: true,
          useBuiltIns: 'entry',
          corejs: 3,
          modules: false,
          exclude: ['transform-typeof-symbol']
        }
      ]
    ].filter(Boolean),
    plugins: [
      'babel-plugin-macros',
      '@babel/plugin-syntax-dynamic-import',
      isTestEnv && 'babel-plugin-dynamic-import-node',
      '@babel/plugin-transform-destructuring',
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true
        }
      ],
      [
        '@babel/plugin-proposal-object-rest-spread',
        {
          useBuiltIns: true
        }
      ],
      [
        '@babel/plugin-proposal-private-methods',
        {
          loose: true
        }
      ],
      [
        '@babel/plugin-proposal-private-property-in-object',
        {
          loose: true
        }
      ],
      [
        '@babel/plugin-transform-runtime',
        {
          helpers: false
        }
      ],
      [
        '@babel/plugin-transform-regenerator',
        {
          async: false
        }
      ]
    ].filter(Boolean)
  }
}
>>>>>>> 38a4c1af772dc2f687f14c47bf0a491d38b15eef
