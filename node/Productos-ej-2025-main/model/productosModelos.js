const productos = require('../database/productos.json');

function obtenerProductos(){
    return productos.productos
}

module.exports = {obtenerProductos};