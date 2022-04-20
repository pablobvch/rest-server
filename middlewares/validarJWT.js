const { request } = require("express");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.headers["x-token"];
  if (!token) {
    return res.status(401).json({ msg: "No hay token en la peticion" });
  }

  try {
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);
    // leer el usuario que corresponde al userId
    const usuario = await Usuario.findById(userId);
    //verificar si el usuario no esta marcado como eliminado
    if (!usuario) {
      return res
        .status(401)
        .json({ msg: "Token no valido: usuario no existe en la db" });
    }
    //verificar si el usuario no esta marcado como eliminado
    if (!usuario.estado) {
      return res
        .status(401)
        .json({ msg: "Token no valido: usuario con estado false" });
    }
    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Token no valido" });
  }
};

module.exports = { validarJWT };
