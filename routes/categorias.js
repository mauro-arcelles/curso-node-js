const {Router} = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarCampos, validarJwt, adminRole } = require('../middlewares');

const router = Router();

router.get('/', obtenerCategorias);

router.get('/:id',[
    check('id', 'No es id válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

router.post('/', [
   validarJwt,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   validarCampos
], crearCategoria);

router.put('/:id', [
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria)

router.delete('/:id', [
    validarJwt,
    adminRole,
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria)


module.exports = router;
