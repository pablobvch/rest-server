const { request } = require("express");
const { response } = require("express");
const { body } = require("express-validator");
const res = require("express/lib/response");
const { Producto } = require("../models");
const producto = require("../models/producto");
const usuario = require("../models/usuario");

const obtenerProductos = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(),
    Producto.find(query)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limite))
  ]);

  res.json({ total, productos });
};

const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.status(201).json({ producto });
};

const crearProducto = async (req, res = response) => {
  const { estado, usuario, ...rest } = req.body;

  const productoDB = await Producto.findOne({
    nombre: req.body.nombre.toUpperCase()
  });

  if (productoDB) {
    return res
      .status(400)
      .json({ msg: `El producto ${productoDB.nombre}, ya existe` });
  }

  const data = {
    usuario: req.usuario._id,
    ...rest
  };

  data.nombre = rest.nombre.toUpperCase();

  const producto = new Producto(data);

  await producto.save();

  res.status(201).json(producto);
};

//en el body viaja el nombre solamente
const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...rest } = req.body;

  if (rest.nombre) {
    rest.nombre = rest.nombre.toUpperCase();
  }

  rest.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, rest, { new: true });

  res.json(producto);
};

const borrarProducto = async (req, res = response) => {
  const { id } = req.params;
  const productoBorrado = await Producto.findByIdAndUpdate(
    id,
    {
      estado: false
    },
    { new: true }
  );
  res.json(productoBorrado);
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto
};
