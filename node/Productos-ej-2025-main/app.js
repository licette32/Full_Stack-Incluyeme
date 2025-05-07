const express = require('express');
const app = express(); 
const path = require('path');
const rutaProductos = require('./route/productosRutas');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', rutaProductos);

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
});

