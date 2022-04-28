const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true
  },
  estado: {
    type: Boolean,
    required: true,
    default: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  }
});

CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...rest } = this.toObject();
  return rest;
};

module.exports = model("Categoria", CategoriaSchema);
