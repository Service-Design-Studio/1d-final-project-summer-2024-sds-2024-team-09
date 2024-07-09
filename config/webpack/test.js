<<<<<<< HEAD
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
=======
process.env.NODE_ENV = process.env.NODE_ENV || 'test'
>>>>>>> 38a4c1af772dc2f687f14c47bf0a491d38b15eef

const environment = require('./environment')

module.exports = environment.toWebpackConfig()
