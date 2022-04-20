const { response } = require("express");
const { request } = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res
      .status(500)
      .json({ msg: "Se quiere verificar el rol sin validar el token primero" });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res
      .status(401)
      .json({ msg: `${nombre} no es administrador. No se puede hacer esto.` });
  }

  next();
};

const tieneRole =
  (...rest) =>
  (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol sin validar el token primero"
      });
    }
    if (!rest.includes(req.usuario.rol)) {
      return res
        .status(401)
        .json({ msg: `El servicio requiere uno de estos roles ${rest}` });
    }
    next();
  };

module.exports = { esAdminRole, tieneRole };
