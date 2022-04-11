const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario"); //standar es ponerlo en mayusculas
const { findByIdAndUpdate } = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite))
  ]); //este truco de llamar a promise all es para ganar en performance en vez de tener 2 await sincronicos

  res.json({ total, usuarios });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...rest } = req.body;

  //TODO Validar contra la base de datos
  if (password) {
    //quiere actualizar la pass
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, rest);

  res.status(400).json({
    msg: "put - controlador",
    usuario
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;

  const usuario = new Usuario({ nombre, correo, password, rol });

  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();

  res.json({
    usuario
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch - controlador"
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
};
