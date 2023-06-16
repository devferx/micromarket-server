const { Schema, model } = require('mongoose')

const CategoriaSchema = Schema({
  'nom_cat': {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  'desc_cat': {
    type: String,
    required: [true, 'La descripción es obligatoria']

  },
  'img_cat': {
    type: String,
    required: false
  }
})

CategoriaSchema.methods.toJSON = function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, ...data } = this.toObject()
  return data
}

module.exports = model('Categoria', CategoriaSchema)

