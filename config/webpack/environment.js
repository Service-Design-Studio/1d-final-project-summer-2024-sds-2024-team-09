const { environment } = require('@rails/webpacker');

// Get the existing Babel loader
const babelLoader = environment.loaders.get('babel');
babelLoader.use[0].options = {
  cacheDirectory: true,
  presets: [
    ['@babel/preset-env', { modules: false }]
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    '@babel/plugin-syntax-dynamic-import'
  ]
};

// Add additional plugins or configuration here if needed

module.exports = environment;

