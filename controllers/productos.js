const { response } = require("express");
const {Producto} = require('../models');

const obtenerProductos = async(req, res = response) => {
    const {limit = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(desde)
            .limit(limit)
    ]);

    res.json({
        total,
        productos
    });

}


const obtenerProducto = async(req, res=response) => {
    const {id} = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria','nombre');

    res.json(producto);
}


const crearProducto = async(req, res = response) => {

    // Obtener el nombre de la categoria del body de la peticion
    const {nombre, estado, usuario, ...body} = req.body;

    const productoDB = await Producto.findOne({nombre});
    if (productoDB){
        return res.status(400).json({
            msg: `La producto ${productoDB.nombre} ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: nombre.toUpperCase(),
        // El middleware validarJwt se le agrega el usuario autenticado
        usuario: req.usuario._id
    }

    const producto = await new Producto(data);

    await producto.save();

    res.status(201).json(producto);

}

const actualizarProducto = async(req, res = response) => {

    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    if (data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    // Recordar que gracias al middleware validarJwt tenemos el usuario autenticado
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

    res.json(producto);

}

const borrarProducto = async(req, res = response) => {

    const {id} = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(productoBorrado);

}

module.exports = {
    obtenerProducto,
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto
};
