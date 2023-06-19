const { Router } = require('express')
const Proveedor = require('../models/proveedor')

const router = Router()

router.get('/', async (req, res) => {
  const proveedores = await Proveedor.find().sort({ nom_prov: 1 })
  res.json({proveedores})
})

router.post('/', async (req, res) => {
  const {
    nit_prov,
    nom_prov,
    dir_prov,
    cel_prov,
    cat_prov
  } = req.body
  const createdProvider = new Proveedor({
    nit_prov,
    nom_prov,
    dir_prov,
    cel_prov,
    cat_prov
  })

  await createdProvider.save()
  res.json({
    message: 'Provider created',
    data: createdProvider
  })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const data = req.body

  const updatedProvider = await Proveedor.findByIdAndUpdate(id, data, { new: true })

  res.json({
    message: 'Provider updated',
    data: updatedProvider
  })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const deletedProvider = await Proveedor.findByIdAndDelete(id)

  res.json({
    message: 'Provider deleted',
    data: deletedProvider
  })
})

module.exports = router
