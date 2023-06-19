const { Router } = require('express')

const Product = require('../models/producto')

const router = Router()

router.get('/', async (req, res) => {
  // query
  const { limit = 20, skip = 0 } = req.query
  const products = await Product.find()
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

router.post('/', async (req, res, next) => {
  const {
    nom_prod,
    desc_prod,
    precio_vent_prod,
    precio_comp_prod,
    stock_prod,
    img_prod,
    cat_prod,
    um_prod
  } = req.body

  const product = new Product({
    nom_prod,
    desc_prod,
    precio_vent_prod,
    precio_comp_prod,
    stock_prod,
    img_prod,
    cat_prod,
    um_prod
  })

  const savedProduct = await product.save()

  res.json({
    message: 'Product created',
    data: savedProduct
  })
})

router.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const data = req.body

  const product = await Product.findByIdAndUpdate(id, data, { new: true })

  res.json({
    message: 'Product updated',
    data: product
  })
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  const deletedProduct = await Product.findByIdAndDelete(id)

  res.json({
    message: 'Product deleted',
    data: deletedProduct
  })
})

module.exports = router
