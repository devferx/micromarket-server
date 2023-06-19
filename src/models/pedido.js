const { Schema, model } = require('mongoose')

const PedidoSchema = new Schema({
  std_ped: {
    type: String,
    required: true,
    default: 'Pendiente',
    enum: ['Entregado', 'Pendiente', 'Cancelado']
  },
  fec_ini_ped: {
    type: Date,
    default: Date.now,
    required: true
  },
  prov_ped: {
    type: Schema.Types.ObjectId,
    ref: 'Proveedor'
  },
  prod_ped: [{
    type: Schema.Types.ObjectId,
    ref: 'Producto'
  }],
  cant_ped: [{
    type: Number,
    required: true
  }]
})

PedidoSchema.methods.toJSON = function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, ...data } = this.toObject()
  return data
}

module.exports = model('Pedido', PedidoSchema)
