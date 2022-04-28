const { request } = require("express");
const { response } = require("express");
const res = require("express/lib/response");
const { Categoria } = require("../models");
const categoria = require("../models/categoria");
const usuario = require("../models/usuario");

const obtenerCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(),
    Categoria.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite))
  ]);

  res.json({ total, categorias });
};

const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.status(201).json({ categoria });
};

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDb = await Categoria.findOne({ nombre });

  if (categoriaDb) {
    return res.status(400).json({ msg: `La categoria ${nombre} ya existe` });
  }

  const data = { nombre, usuario: req.usuario._id };

  const categoria = new Categoria(data);

  await categoria.save();

  res.status(201).json(categoria);
};

//en el body viaja el nombre solamente
const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...rest } = req.body;

  rest.nombre = rest.nombre.toUpperCase();
  rest.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, rest, { new: true });

  res.json(categoria);
};

const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoriaBorrada = await Categoria.findByIdAndUpdate(
    id,
    {
      estado: false
    },
    { new: true }
  );
  res.json({ categoriaBorrada });
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
};
