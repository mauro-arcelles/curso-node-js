const { response } = require("express")

const adminRole = (req, res = response, next) => {

    // Despues del middleware de validar-jwt la request ya tiene el usuario autenticado
    if (!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const {rol, nombre} = req.usuario;

    if (rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: 'El usuario no tiene los privilegios necesarios'
        });
    }

    next();
}

const tieneRole = (...roles) => {

    return (req, res = response, next) => {

        // Despues del middleware de validar-jwt la request ya tiene el usuario autenticado
        if (!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if (!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: 'El usuario no tiene los privilegios necesarios'
            });
        }

        next();
    }
}

module.exports = {
    adminRole,
    tieneRole
}