const express = require('express')
const boom = require('@hapi/boom')

const Categoria = require('../models/categoria')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await Categoria.find().sort({ nom_cat: 1 })
    res.json({ message: 'Retrieved Categories', data })
  } catch (error) {
    console.log(error)
    next(boom.badImplementation())
  }
})

// TODO: Agregar imagen
router.post('/', async (req, res, next) => {
  try {
    const { nom_cat, desc_cat } = req.body
    const categoria = new Categoria({
      nom_cat,
      desc_cat
    })
    await categoria.save()

    res.status(201).json({
      message: 'Created Category',
      data: categoria
    })
  } catch (error) {
    console.log(error)
    next(boom.badImplementation())
  }
})

router.put('/:id', async (req, res, next) => {
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
    next(boom.badImplementation())
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    await Categoria.findByIdAndDelete(id)

    res.json({
      message: 'Deleted Category',
      id
    })
  } catch (error) {
    console.log(error)
    next(boom.badImplementation())
  }
})

module.exports = router
