const {Router} = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const {roleValido, emailExiste, usuarioExistePorId} = require('../helpers/db-validators');

// const {validarCampos} = require('../middlewares/validar-campos');
// const { validarJwt } = require('../middlewares/validar-jwt');
// const { adminRole, tieneRole } = require('../middlewares/validar-roles');
const {validarCampos, validarJwt, adminRole, tieneRole} = require('../middlewares');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    check('rol').custom(roleValido),
    validarCampos
] ,usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(roleValido),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    validarJwt,
    // adminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    validarCampos
], usuariosDelete);




module.exports = router;