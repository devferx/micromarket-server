const express = require('express')

const Categoria = require('../models/categoria')

const router = express.Router()

router.get('/', async (req, res) => {
  const data = await Categoria.find().sort({ nom_cat: 1 })
  res.json({ message: 'Retrieved Categories', data })
})

router.post('/', async (req, res) => {
  const { nom_cat, desc_cat, img_cat } = req.body
  const categoria = new Categoria({
    nom_cat,
    desc_cat,
    img_cat
  })

  await categoria.save()

  res.status(201).json({

    message: 'Created Category',
    data: categoria
  })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const updatedCategory = await Categoria.findByIdAndUpdate(id, data, {
      new: true
    })

    res.json({
      message: 'Updated Category',
      data: updatedCategory
    })
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  await Categoria.findByIdAndDelete(id)

  res.json({
    message: 'Deleted Category',
    id
  })
})

module.exports = router
