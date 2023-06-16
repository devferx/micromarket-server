const express = require('express')

const Categoria = require('../models/categoria')

const router = express.Router()

router.get('/', async (req, res) => {
  const data = await Categoria.find()
  res.json({data})
})

router.post('/', async (req, res) => {

})

module.exports = router
