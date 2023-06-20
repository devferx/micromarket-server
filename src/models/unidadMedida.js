const { Schema, model } = require('mongoose')

// TODO: Agregar abreviatura
const UnidadMedidaSchema = Schema({
  nom_um: {
    type: String,
    required: [true, 'El nombre de la unidad de medida es obligatorio']
  },
  desc_um: {
    type: String,
    maxLength: 30
  }
})

UnidadMedidaSchema.methods.toJSON = function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, ...data } = this.toObject()
  return data
}

module.exports = model('UnidadMedida', UnidadMedidaSchema)
