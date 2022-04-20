const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
  usuariosPost
} = require("../controllers/usuarios");
const {
  esRoleValido,
  emailExiste,
  existeUsuarioById
} = require("../helpers/dbValidators");
const {
  validarCampos,
  validarJWT,
  tieneRole,
  esAdminRole
} = require("../middlewares");
const router = Router();

router.get("/", usuariosGet);
router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioById),
    check("rol").custom(esRoleValido),
    validarCampos
  ],
  usuariosPut
);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 6 caracteres")
      .isLength({ min: 6 })
      .not()
      .isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRoleValido), //es lo mismo que rol => esRoleValido(rol)
    validarCampos
  ], //el error se almacena en la request
  usuariosPost
);
router.delete(
  "/:id",
  [
    validarJWT,
    //esAdminRole,
    tieneRole("ADMIN_ROLE", "USER_ROLE", "VENTAR_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos
  ],
  usuariosDelete
);
router.patch("/", usuariosPatch);

module.exports = router;
