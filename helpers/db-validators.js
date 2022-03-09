const Role = require('../models/role');
const {Usuario, Categoria, Producto} = require('../models');


const roleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol){
        throw new Error(`El rol '${rol}' no es válido`);
    }
}

const emailExiste = async(correo = '') => {
    const usuarioDB = await Usuario.findOne({correo});
    if (usuarioDB) {
        throw new Error('El correo ya está registrado');
    }
}

const usuarioExistePorId = async(id = '') => {
    const usuarioDB = await Usuario.findById(id);
    if (!usuarioDB) {
        throw new Error('El id no existe');
    }
}

const existeCategoriaPorId = async(id = '') => {
    const categoriaDB = await Categoria.findById(id);
    if (!categoriaDB) {
        throw new Error('El id no existe');
    }
}

const existeProductoPorId = async(id = '') => {
    const productoDB = await Producto.findById(id);
    if (!productoDB) {
        throw new Error('El id no existe');
    }
}

// Validar colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida){
        throw new Error('La coleccion no está permitida');
    }
    return true;
}



module.exports = {
    roleValido,
    emailExiste,
    usuarioExistePorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}