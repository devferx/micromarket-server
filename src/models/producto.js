const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({
  nom_prod: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    maxLength: 20
  },
  desc_prod: {
    type: String,
    required: [true, 'La descripción del producto es obligatoria'],
    maxLength: 50
  },
  precio_vent_prod: {
    type: Number,
    required: [true, 'El precio del producto es obligatorio']
  },
  // precio_comp_prod: {
  //   type: Number,
  //   required: [true, 'El precio de compra del producto es obligatorio']
  // },
  stock_prod: {
    type: Number,
    required: [true, 'El stock del producto es obligatorio']
  },
  img_prod: {
    type: String
  },
  cat_prod: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: [true, 'La categoría es obligatoria']
  },
  um_prod: {
    type: String,
    // ref: 'UnidadMedida',
    // required: [true, 'La unidad de medida es obligatoria']
  }
})

ProductoSchema.methods.toJSON = function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, ...data } = this.toObject()
  return data
}

module.exports = model('Producto', ProductoSchema)
