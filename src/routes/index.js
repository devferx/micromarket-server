const express = require('express')

function routerApi (app) {
  const router = express.Router()
  app.use('/api', router)
  router.use('/categories', require('./categories.router'))
  router.use('/unit-measures', require('./unitMeasure.router'))
}

module.exports = { routerApi }

