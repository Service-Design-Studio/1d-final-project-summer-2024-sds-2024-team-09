const { environment } = require('@rails/webpacker');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

environment.plugins.append(
    'Environment',
    new webpack.EnvironmentPlugin(process.env)
);

module.exports = environment;
