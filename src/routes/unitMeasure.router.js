const express = require('express')

const router = express.Router()

const UnidadMedida = require('../models/unidadMedida')

router.get('/', async (req, res) => {
  const data = await UnidadMedida.find().sort({ nom_um: 1 })
  res.json({ message: 'Retrieved Unit Measures', data })
})

router.post('/', async (req, res) => {
  const { nom_um, desc_um } = req.body
  const unidadMedida = new UnidadMedida({
    nom_um,
    desc_um
  })

  await unidadMedida.save()

  res.status(201).json({
    message: 'Created Unit Measure',
    data: unidadMedida
  })
})

module.exports = router
