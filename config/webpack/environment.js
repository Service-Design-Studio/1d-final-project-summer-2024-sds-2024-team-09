const { environment } = require('@rails/webpacker');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

environment.plugins.prepend('NodePolyfill', new NodePolyfillPlugin());

module.exports = environment;
