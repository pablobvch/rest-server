const dbValidators = require("./dbValidators");
const generarJWT = require("./generarJWT");
const googleVerify = require("./googleVerify");
const subirArchivo = require("./subirArchivos");

module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...googleVerify,
  ...subirArchivo
};
