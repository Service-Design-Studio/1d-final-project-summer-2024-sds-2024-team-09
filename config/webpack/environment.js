const { environment } = require('@rails/webpacker')

<<<<<<< HEAD
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
=======
// Add additional plugins or configuration here
>>>>>>> 38a4c1af772dc2f687f14c47bf0a491d38b15eef

module.exports = environment
