const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;

    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    const nombreTemporal = `${uuidv4()}.${extension}`;

    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extension ${extension} no es permitida. Extensiones validas: ${extensionesValidas}`
      );
    }

    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      carpeta,
      nombreTemporal
    );

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(nombreTemporal);
    });
  });
};

module.exports = { subirArchivo };
