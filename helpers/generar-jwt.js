const jwt = require('jsonwebtoken')

const generarJwt = (uid = '') => {
    return new Promise((res, rej) => {
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'

        }, (err, token) => {
            if (err){
                console.log(err);
                rej('Error al generar el token');
            } else {
                res(token);
            }

        });

    });

}

module.exports = {
    generarJwt
}