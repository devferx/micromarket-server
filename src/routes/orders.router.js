const { Router } = require('express')

const Order = require('../models/pedido')

const router = Router()

router.get('/', async (req, res) => {
  const ordersRetrived = await Order.find()
    .populate('prov_ped', 'nom_prov cel_prov')
    .populate('prod_ped', 'nom_prod precio_comp_prod img_prod')

  const orders = ordersRetrived.map((order) => {
    const products = order.prod_ped.map((product, index) => ({
      ...product._doc,
      quantity: order.cant_ped[index],
      delivered: order.entr_prod_ped[index]
    }))

    // eslint-disable-next-line no-unused-vars
    const { cant_ped, entr_prod_ped, __v, ...data } = order._doc

    return {
      ...data,
      prod_ped: products
    }
  })

  res.json({
    message: 'Orders retrived',
    data: orders
  })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  const order = await Order.findById(id)
    .populate('prov_ped')
    .populate('prod_ped', 'nom_prod precio_comp_prod img_prod')

  if (!order) {
    return res.status(404).json({
      message: 'Order not found'
    })
  }

  const products = order.prod_ped.map((product, index) => ({
    ...product._doc,
    quantity: order.cant_ped[index],
    delivered: order.entr_prod_ped[index]
  }))

  // eslint-disable-next-line no-unused-vars
  const { cant_ped, entr_prod_ped, __, ...data } = order._doc

  res.json({
    message: 'Order retrived',
    data: {
      ...data,
      prod_ped: products,
      prec_total_ped: products.reduce(
        (acc, product) => acc + product.precio_comp_prod * product.quantity,
        0
      )
    }
  })
})

router.post('/', async (req, res) => {
  const { provider: prov_ped, products } = req.body

  const prod_ped = products.map((product) => product._id)
  const cant_ped = products.map((product) => product.quantity)
  const entr_prod_ped = products.map(() => false)

  const createdOrder = new Order({
    prov_ped,
    prod_ped,
    cant_ped,
    entr_prod_ped
  })

  await createdOrder.save()

  res.json({
    message: 'Order created',
    data: createdOrder
  })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const data = req.body

  const updatedOrder = await Order.findByIdAndUpdate(id, data, { new: true })

  res.json({
    message: 'Order updated',
    data: updatedOrder
  })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const deletedOrder = await Order.findByIdAndDelete(id)

  res.json({
    message: 'Order deleted',
    data: deletedOrder
  })
})

module.exports = router
