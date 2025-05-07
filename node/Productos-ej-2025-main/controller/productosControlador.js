const {obtenerProductos} = require('../model/productosModelos');

function mostrarProductos(req, res){
    const lista = obtenerProductos();
    res.render('index', {productos: lista});
}

module.exports = {mostrarProductos};