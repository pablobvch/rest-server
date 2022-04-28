const { Router } = require("express");
const { check } = require("express-validator");
const res = require("express/lib/response");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
} = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/dbValidators");
const { validarJWT, esAdminRole } = require("../middlewares");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

//Obtener todas las categorias
router.get("/", obtenerCategorias);

//Obtener una categoria por Id
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
  ],
  obtenerCategoria
);

//Crear una categoria - cualquiera con token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
  ],
  crearCategoria
);

//Actualizar categoria - cualquiera con token valido
//validar el nombre
router.put(
  "/:id",
  [
    validarJWT,
    check("id").custom(existeCategoriaPorId),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
  ],
  actualizarCategoria
);

//Eliminar una categoria
//que el id sea un id valido de mongo
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
  ],
  borrarCategoria
);

module.exports = router;
