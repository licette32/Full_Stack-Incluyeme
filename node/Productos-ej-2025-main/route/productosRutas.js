const express = require('express');
const router = express.Router();
const {mostrarProductos} = require('../controller/productosControlador');

router.get('/', mostrarProductos);

module.exports = router;