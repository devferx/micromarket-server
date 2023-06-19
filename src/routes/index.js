const express = require('express')

function routerApi (app) {
  const router = express.Router()
  app.use('/api', router)
  router.use('/categories', require('./categories.router'))
  router.use('/unit-measures', require('./unitMeasure.router'))
  router.use('/products', require('./products.router'))
  router.use('/providers', require('./providers.router'))
  router.use('/orders', require('./orders.router'))
}

module.exports = { routerApi }

