const validarArchivo = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res
      .status(400)
      .send({ msg: "No hay archivo en la peticion - middleware" });
  }
  next();
};

module.exports = {
  validarArchivo
};
