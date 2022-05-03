const Role = require("../models/role");
const { Usuario, Categoria, Producto } = require("../models");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};

const existeUsuarioById = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El usuario con id ${id} no existe en la base de datos`);
  }
};

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`La categoria con id ${id} no existe en la base de datos`);
  }
};

const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El producto con id ${id} no existe en la base de datos`);
  }
};

const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const estaIncluida = colecciones.includes(coleccion);
  if (!estaIncluida) {
    throw new Error(`La coleccion ${coleccion} no es permitida ${colecciones}`);
  }
  return true;
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioById,
  existeCategoriaPorId,
  existeProductoPorId,
  coleccionesPermitidas
};
