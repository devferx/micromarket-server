const { Router } = require('express')

const Order = require('../models/pedido')

const router = Router()

router.get('/', async (req, res) => {
  const ordersRetrived = await Order.find()

  res.json({
    message: 'Orders retrived',
    data: ordersRetrived
  })
})

router.post('/', async (req, res) => {
  const data = req.body

  const createdOrder = new Order(data)
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
