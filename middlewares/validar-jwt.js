const { request } = require('express');
const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJwt = async(req = request, res = response, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer el usuario que ha solicitado la peticion
        const usuario = await Usuario.findById(uid);
        if (!usuario ){
            return res.status(401).json({
                msg: 'Token invalido'
            });
        }

        // Verificar si el usuario que ha solicitado la peticion sigue activo
        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Token invalido'
            });
        }


        req.usuario = usuario;

        next();

    } catch (error) {
        res.status(401).json({
            msg: 'Token invalido'
        });
    }

}

module.exports = {
    validarJwt
}