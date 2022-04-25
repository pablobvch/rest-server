const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/googleVerify");

const Usuario = require("../models/usuario");

const login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res
        .status(400)
        .json({ msg: "Usuario y password incorrectos - bad correo" });
    }
    if (!usuario.estado) {
      return res
        .status(400)
        .json({ msg: "Usuario y password incorrectos - estado false" });
    }
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ msg: "Usuario y password incorrectos - password" });
    }

    //generar el jwt
    const token = await generarJWT(usuario.id);

    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Login OK", correo });
  }
};

const googleSignIn = async (req, res = response) => {
  const { idToken } = req.body;

  try {
    const { correo, nombre, img } = await googleVerify(idToken);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        google: true
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res
        .status(401)
        .json({ msg: "Usuario bloqueado - hable con el administrador" });
    }

    //generar el jwt
    const token = await generarJWT(usuario.id);
    res.json({ usuario, token });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ msg: "El token no se pudo verificar" });
  }
};

module.exports = { login, googleSignIn };
