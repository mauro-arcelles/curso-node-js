const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerProducto, crearProducto, actualizarProducto, borrarProducto, obtenerProductos } = require("../controllers/productos");


const { existeProductoPorId, existeCategoriaPorId } = require("../helpers/db-validators");

const { validarCampos, validarJwt, adminRole } = require("../middlewares");

const router = Router();

router.get("/", obtenerProductos);

router.get(
    "/:id",
    [
        check("id", "No es id válido").isMongoId(),
        check("id").custom(existeProductoPorId),
        validarCampos,
    ],
    obtenerProducto
);

router.post(
    "/",
    [
        validarJwt,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("categoria", "No es un id de mongo").isMongoId(),
        check("categoria").custom(existeCategoriaPorId),
        validarCampos,
    ],
    crearProducto
);

router.put(
    "/:id",
    [
        validarJwt,
        check("id").custom(existeProductoPorId),
        check("categoria", "No es un id de mongo").isMongoId(),
        check("id").custom(existeProductoPorId),
        validarCampos,
    ],
    actualizarProducto
);

router.delete(
    "/:id",
    [
        validarJwt,
        adminRole,
        check("id").custom(existeProductoPorId),
        validarCampos,
    ],
    borrarProducto
);

module.exports = router;
