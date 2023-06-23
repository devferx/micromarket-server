const express = require('express')
const boom = require('@hapi/boom')
const multer = require('multer')
const fs = require('fs')

const Categoria = require('../models/categoria')

const router = express.Router()
const upload = multer({ dest: 'src/uploads/' })

router.get('/', async (req, res, next) => {
  try {
    const data = await Categoria.find().sort({ nom_cat: 1 })
    res.json({ message: 'Retrieved Categories', data })
  } catch (error) {
    console.log(error)
    next(boom.badImplementation())
  }
})

router.post('/', upload.single('img_cat'), async (req, res, next) => {
  try {
    let { nom_cat, desc_cat } = req.body

    nom_cat = nom_cat.trim().toLowerCase()
    nom_cat = nom_cat.charAt(0).toUpperCase() + nom_cat.slice(1)

    const categoryExists = await Categoria.findOne({ nom_cat })
    if (categoryExists) {
      return next(boom.conflict('Ya existe una categoría con el nombre dado'))
    }

    const imgUrl = req.file
      ? `/uploads/${req.file.filename}`
      : 'https://picsum.photos/300/300'

    const categoria = new Categoria({
      nom_cat,
      desc_cat,
      img_cat: imgUrl
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

// update category
router.put('/:id', upload.single('img_cat'), async (req, res, next) => {
  const { id } = req.params
  const data = req.body

  if (data.nom_cat) {
    data.nom_cat = data.nom_cat.trim().toLowerCase()
    data.nom_cat = data.nom_cat.charAt(0).toUpperCase() + data.nom_cat.slice(1)

    const categoryExists = await Categoria.findOne({ nom_cat: data.nom_cat })
    if (categoryExists) {
      return next(boom.conflict('Ya existe una categoría con el nombre dado'))
    }
  }

  if (req.file) {
    // delete prev image
    const prevCategory = await Categoria.findById(id)
    if (
      prevCategory &&
      prevCategory.img_cat &&
      prevCategory.img_cat.startsWith('/uploads')
    ) {
      const imgPath = `src${prevCategory.img_cat}`
      fs.unlinkSync(imgPath)
    }

    data.img_cat = `/uploads/${req.file.filename}`
  }

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

    const deletedCateogory = await Categoria.findByIdAndDelete(id)

    // delete image from uploads folder
    if (
      deletedCateogory.img_cat &&
      deletedCateogory.img_cat.startsWith('/uploads')
    ) {
      const imgPath = `src${deletedCateogory.img_cat}`
      fs.unlinkSync(imgPath)
    }

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
