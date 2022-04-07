const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey } = req.query;
  res.json({
    msg: "get - controlador",
    q,
    nombre,
    apikey
  });
};

const usuariosPut = (req, res = response) => {
  const { id } = req.params;
  res.status(400).json({
    msg: "put - controlador",
    id
  });
};

const usuariosPost = (req, res = response) => {
  const body = req.body;

  res.status(201).json({
    msg: "post - controlador",
    body
  });
};

const usuariosDelete = (req, res = response) => {
  res.status(500).json({
    msg: "delete - controlador"
  });
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
