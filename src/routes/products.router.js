const { Router } = require('express')
const multer = require('multer')
const boom = require('@hapi/boom')
const fs = require('fs')

const Product = require('../models/producto')

const router = Router()
const upload = multer({ dest: 'src/uploads/' })

router.get('/', async (req, res) => {
  // query
  const { limit = 20, skip = 0, cat } = req.query

  const query = {}

  if (cat) {
    query.cat_prod = cat
  }

  const products = await Product.find(query)
    .limit(Number(limit))
    .skip(Number(skip))
    .sort('nom_prod')
    .populate('cat_prod', 'nom_cat')
    .populate('um_prod', 'nom_um')

  res.json({
    message: 'Products retrieved',
    data: products
  })
})

router.post('/', upload.single('img_prod'), async (req, res, next) => {
  const {
    nom_prod,
    desc_prod,
    precio_vent_prod,
    precio_comp_prod,
    stock_prod,
    cat_prod,
    unid_prod,
    um_prod
  } = req.body

  const imgProd = req.file
    ? `/uploads/${req.file.filename}`
    : 'https://picsum.photos/300/300'

  const product = new Product({
    nom_prod,
    desc_prod,
    precio_vent_prod,
    precio_comp_prod,
    stock_prod,
    img_prod: imgProd,
    cat_prod,
    unid_prod,
    um_prod
  })

  const savedProduct = await product.save()

  res.json({
    message: 'Product created',
    data: savedProduct
  })
})

router.put('/:id', upload.single('img_prod'), async (req, res, next) => {
  const { id } = req.params
  const data = req.body

  if (req.file) {
    const prevProduct = await Product.findById(id)
    if (prevProduct.img_prod && prevProduct.img_prod.startsWith('/uploads')) {
      const imgPath = `src${prevProduct.img_prod}`
      fs.unlinkSync(imgPath)
    }

    data.img_prod = `/uploads/${req.file.filename}`
  }

  const product = await Product.findByIdAndUpdate(id, data, { new: true })

  res.json({
    message: 'Product updated',
    data: product
  })
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const deletedProduct = await Product.findByIdAndDelete(id)

    if (
      deletedProduct.img_prod &&
      deletedProduct.img_prod.startsWith('/uploads')
    ) {
      const imgPath = `src${deletedProduct.img_prod}`
      fs.unlinkSync(imgPath)
    }

    res.json({
      message: 'Product deleted',
      data: deletedProduct
    })
  } catch (err) {
    console.log(err)
    next(boom.badImplementation())
  }
})

module.exports = router
