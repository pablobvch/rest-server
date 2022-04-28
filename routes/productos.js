const { Router } = require("express");
const { check } = require("express-validator");
const res = require("express/lib/response");
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto
} = require("../controllers/productos");
const {
  existeProductoPorId,
  existeCategoriaPorId
} = require("../helpers/dbValidators");
const { validarJWT, esAdminRole } = require("../middlewares");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

//Obtener todas las Productos
router.get("/", obtenerProductos);

//Obtener una Producto por Id
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
  ],
  obtenerProducto
);

//Crear una Producto - cualquiera con token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un ID valido").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos
  ],
  crearProducto
);

//Actualizar Producto - cualquiera con token valido
//validar el nombre
router.put(
  "/:id",
  [validarJWT, check("id").custom(existeProductoPorId), validarCampos],
  actualizarProducto
);

//Eliminar una Producto
//que el id sea un id valido de mongo
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
  ],
  borrarProducto
);

module.exports = router;
