const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next(); //sigue con el siguiente middleware, si no hay otro middleware va al controlador
};

module.exports = { validarCampos };
