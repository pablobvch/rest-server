const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarProductos = async (termino = "", res = response) => {
  const isMongoId = ObjectId.isValid(termino);
  if (isMongoId) {
    const producto = await Producto.find({
      _id: termino,
      $and: [{ estado: true }]
    }).populate("categoria", "nombre");
    return res.json({ results: producto ? [producto] : [] });
  }
  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    nombre: regex,
    estado: true
  }).populate("categoria", "nombre");

  res.json({ results: productos });
};

const buscarCategorias = async (termino = "", res = response) => {
  const isMongoId = ObjectId.isValid(termino);
  if (isMongoId) {
    const categoria = await Categoria.find({
      _id: termino,
      $and: [{ estado: true }]
    });
    return res.json({ results: categoria ? [categoria] : [] });
  }
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({ nombre: regex, estado: true });

  res.json({ results: categorias });
};

const buscarUsuarios = async (termino = "", res = response) => {
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    //const usuario = await Usuario.findById(termino);
    const usuario = await Usuario.find({
      _id: termino,
      $and: [{ estado: true }]
    });
    return res.json({ results: usuario ? [usuario] : [] });
  }

  const regex = new RegExp(termino, "i"); //que sea insencible a las mayusculas y minusculas

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }]
  });

  res.json({ results: usuarios });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;
    default:
      return res.status(500).json({ msg: `Se le olvido hacer esta busqueda` });
  }
};

module.exports = { buscar };
