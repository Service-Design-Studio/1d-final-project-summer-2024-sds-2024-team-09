# Use the official lightweight Ruby image.
# https://hub.docker.com/_/ruby
FROM ruby:3.2.4

RUN (curl -sS https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor | apt-key add -) && \
    echo "deb https://deb.nodesource.com/node_14.x buster main"      > /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && apt-get install -y nodejs lsb-release

RUN (curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -) && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

ARG MASTER_KEY
ENV RAILS_MASTER_KEY=${MASTER_KEY}

# Install production dependencies.
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

WORKDIR /app
COPY Gemfile Gemfile.lock ./
# ENV BUNDLE_FROZEN=true
# RUN gem install bundler -v 2.3.26
# RUN bundle config set --local without 'test'
# RUN bundle install 
# Copy the Gemfile and Gemfile.lock

RUN apt-get update && apt-get install -y libpq-dev python3-distutils

RUN gem install bundler -v 2.4.22 && \
    bundle install && \
    bundle config set --local deployment 'true' && \
    bundle config set --local without 'development test' && \
    bundle install



# Copy local code to the container image.
COPY . /app

# Copy the rest of the application code
# COPY . .

RUN chmod +x ./app/*
RUN chmod +x /app/bin/*

ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true
# Redirect Rails log to STDOUT for Cloud Run to capture
ENV RAILS_LOG_TO_STDOUT=true
ENV SECRET_KEY_BASE=0f68460d8b6d8a2f728162be2cd457726c5c9c849880121b8fdac3fb5e6317cb1618ee476a1edb1bdf6df6ac27c2bae00592ecefa89cc5f8413a19518c6d6a8d

ENV RAILS_ENV=production

# RUN bundle exec rake db:create
# RUN bundle exec rake db:migrate
# RUN bundle exec rake db:seed

EXPOSE 8080
CMD ["bin/rails", "server", "-b", "0.0.0.0", "-p", "8080"]