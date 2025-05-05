const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Ruta para servir el HTML
app.get('/', (req, res) => {
  try {
    // Leer el archivo JSON
    const productos = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'productos.json'), 'utf-8'));

    // Crear las tarjetas de productos
    let cards = productos.productos.map(prod => `
      <div style="border: 1px solid #ccc; padding: 10px; margin: 10px; width: 200px;">
        <h2>${prod.nombre}</h2>
        <p>Precio: $${prod.precio}</p>
      </div>
    `).join('');

    // Crear el HTML completo
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>Tienda</title>
        <style>
          .product-container {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            padding: 20px;
          }
          .product-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: transform 0.2s;
          }
          .product-card:hover {
            transform: translateY(-5px);
          }
          h1 {
            color: #333;
            text-align: center;
            font-family: Arial, sans-serif;
          }
        </style>
      </head>
      <body>
        <h1>Nuestros Productos</h1>
        <div class="product-container">${cards}</div>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar los productos');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});