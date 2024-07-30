const { environment } = require('@rails/webpacker')

// module.exports = environment


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
}

module.exports = environment
