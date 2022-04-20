const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generarJWT");

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

module.exports = { login };
