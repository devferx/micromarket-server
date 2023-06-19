const { Schema, model } = require('mongoose')

const ProveedorSchema = new Schema({
  nit_prov: {
    type: String,
    required: true
  },
  nom_prov: {
    type: String,
    required: true
  },
  dir_prov: {
    type: String,
    required: true
  },
  cel_prov: {
    type: String,
    required: true
  },
  cat_prov: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  }
})

ProveedorSchema.methods.toJSON = function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, ...data } = this.toObject()
  return data
}

module.exports = model('Proveedor', ProveedorSchema)
