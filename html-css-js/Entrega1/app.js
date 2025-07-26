// Importa el módulo 'express' para crear y configurar la aplicación del servidor.
const express = require('express');
// Crea una instancia de la aplicación Express.
const app = express();
// Importa el módulo 'path' para trabajar con rutas de archivos y directorios.
const path = require('path');
// Importa 'body-parser' para analizar los cuerpos de las solicitudes entrantes (middleware).
const bodyParser = require('body-parser');
// Importa 'method-override' para usar verbos HTTP como PUT o DELETE en formularios HTML.
const methodOverride = require('method-override');
// Importa las rutas específicas para los productos desde un archivo local.
const routerProducto = require('./routes/productoRouter');
// const multer = require('multer'); // Este módulo está comentado, se usaría para manejar la carga de archivos.

// Usa 'body-parser' para analizar cuerpos de solicitudes en formato JSON.
app.use(bodyParser.json());
// Usa 'body-parser' para analizar cuerpos de solicitudes codificados en URL (datos de formularios HTML).
// La opción 'extended: true' permite analizar objetos anidados.
app.use(bodyParser.urlencoded({extended: true}));

// Usa 'method-override' para permitir que los formularios HTML utilicen métodos HTTP como PUT y DELETE.
// Busca un parámetro de consulta llamado '_method' para determinar el método a usar.
app.use(methodOverride('_method'));
// Sirve archivos estáticos (como CSS, JavaScript del lado del cliente, imágenes) desde la carpeta 'public'.
app.use(express.static("public"));

// Configura 'ejs' como el motor de plantillas para renderizar vistas.
app.set('view engine', 'ejs');
// Establece la ubicación de las vistas, uniéndolas a la ruta absoluta del directorio actual.
app.set('views', path.join(__dirname, 'views'));

// Asocia las rutas definidas en 'routerProducto' con el prefijo raíz '/'.
// Esto significa que todas las rutas definidas en 'routerProducto' serán accesibles desde la URL base.
app.use('/', routerProducto);

// Inicia el servidor y lo pone a escuchar en el puerto 3000.
app.listen(3000, () =>{
    // Muestra un mensaje en la consola una vez que el servidor se ha iniciado correctamente.
    console.log('Server is running en port 3000');
});
































// Importa el módulo 'fs' (File System) para interactuar con el sistema de archivos (leer, escribir).
const fs = require('fs');
// Importa el módulo 'path' para trabajar con rutas de archivos y directorios de manera segura.
const path = require('path');

// Construye la ruta completa al archivo JSON de productos.
// '__dirname' es la ruta del directorio actual. '..' sube un nivel para llegar a la carpeta 'data'.
const productosFilePath = path.join(__dirname, '../data/productos.json');
// Lee el contenido del archivo 'productos.json' de forma síncrona.
// 'utf-8' especifica la codificación del archivo.
// Luego, parsea el contenido JSON a un objeto JavaScript.
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

// Define el objeto 'productosController' que agrupa las funciones (métodos) para manejar las operaciones CRUD de productos.
const productosController = {
    // Método 'list': Muestra la lista de todos los productos.
    list: (req, res) => {
        // Renderiza la vista 'home' (probablemente una página principal o listado) y le pasa el array de 'productos'.
        res.render('home', { productos });
    },

    // Método 'create': Muestra el formulario para crear un nuevo producto.
    create: (req, res) => {
        // Renderiza la vista específica para la creación de productos.
        res.render('productos/creacionProd');
    },

    // Método 'stock': Maneja la lógica para guardar un nuevo producto en el archivo JSON.
    stock: (req, res) => {
        /* const {marca, modelo, precio} = req.body; */ // Ejemplos de propiedades de productos comentadas.
        // Desestructura las propiedades 'articulo' y 'precio' del cuerpo de la solicitud (enviadas desde un formulario).
        const { articulo, precio } = req.body;
        // Obtiene el nombre del archivo de imagen si se ha subido. Si no hay archivo, 'imagen' será null.
        const imagen = req.file ? req.file.filename : null;

        // Crea un nuevo objeto producto con un ID único (basado en la longitud actual del array + 1).
        const nuevoProduct = {
            id: productos.length + 1,
            articulo,
            precio,
            imagen
        };

        // Bloque try-catch para manejar posibles errores al guardar el archivo.
        try {
            // Agrega el nuevo producto al array existente.
            productos.push(nuevoProduct);
            // Escribe el array actualizado de productos de nuevo en el archivo JSON.
            // 'JSON.stringify(productos, null, " ")' formatea el JSON para que sea legible (indentación con espacios).
            fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
            // Redirige al usuario a la ruta '/productos' después de guardar.
            res.redirect("/productos");
        } catch (err) {
            // Si ocurre un error, lo registra en la consola.
            console.log("Error al guardar el producto");
            console.error(err);
            // Envía una respuesta de error al cliente con un estado 500 (Error interno del servidor).
            res.status(500).send("Error de servidor");
        }
    },

    // Método 'edit': Muestra el formulario para editar un producto existente.
    edit: (req, res) => {
        // Obtiene el ID del producto de los parámetros de la URL.
        const id = req.params.id;
        // Busca el producto en el array 'productos' que coincida con el ID.
        const producto = productos.find(prod => prod.id == id);
        // Renderiza la vista de edición y le pasa el producto encontrado.
        res.render('productos/editarProd', { producto });
    },

    // Método 'update': Maneja la lógica para actualizar un producto existente en el archivo JSON.
    update: (req, res) => {
        // Obtiene el ID del producto de los parámetros de la URL.
        const id = req.params.id;
        // Desestructura las propiedades 'articulo' y 'precio' del cuerpo de la solicitud.
        const { articulo, precio } = req.body;
        // Obtiene el nombre del archivo de imagen si se ha subido.
        const imagen = req.file ? req.file.filename : null;

        // Encuentra el índice del producto en el array que coincide con el ID.
        const productoIndex = productos.findIndex(prod => prod.id == id);
        // Si el producto se encontró (el índice no es -1).
        if (productoIndex !== -1) {
            // Actualiza las propiedades del producto en el array.
            // Asegura que el ID sea numérico.
            productos[productoIndex] = { id: Number(id), articulo, precio, imagen };
            // Bloque try-catch para manejar errores al guardar el archivo.
            try {
                // Escribe el array actualizado de productos de nuevo en el archivo JSON.
                fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
                // Redirige al usuario a la ruta '/productos' después de actualizar.
                res.redirect("/productos");
            } catch (err) {
                // Si ocurre un error, lo registra en la consola.
                console.log("Error al editar el producto");
                console.error(err);
                // Envía una respuesta de error al cliente con un estado 500.
                res.status(500).send("Error de servidor");
            }
        } else {
            // Si el producto no se encontró, envía una respuesta de error 400 (Bad Request).
            res.status(400).send("Producto no encontrado");
        }
    },

    // --- Realizar delete ---
    // Método 'delete': Muestra la página de confirmación para eliminar un producto.
    delete: (req, res) => {
        // Obtiene el ID del producto de los parámetros de la URL.
        const id = req.params.id;
        // Busca el producto en el array que coincide con el ID.
        const producto = productos.find(prod => prod.id == id);
        // Renderiza la vista de eliminación y le pasa el producto.
        res.render('productos/eliminarProd', { producto });
    },

    // Método 'destroy': Maneja la lógica para eliminar un producto del archivo JSON.
    destroy: (req, res) => {
        // Obtiene el ID del producto de los parámetros de la URL.
        const id = req.params.id;
        // Encuentra el índice del producto a eliminar.
        const productoIndex = productos.findIndex(prod => prod.id == id);
        // Si el producto se encontró.
        if (productoIndex !== -1) {
            // Elimina el producto del array usando 'splice'.
            productos.splice(productoIndex, 1);
            // Bloque try-catch para manejar errores al guardar el archivo.
            try {
                // Escribe el array actualizado de productos (sin el producto eliminado) en el archivo JSON.
                fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
                // Redirige al usuario a la lista de productos.
                res.redirect("/productos");
            } catch (err) {
                // Si ocurre un error, lo registra y envía una respuesta de error 500.
                console.log("Error al eliminar el producto");
                console.error(err);
                res.status(500).send("Error al eliminar el producto");
            }
        } else {
            // Si el producto no se encontró, envía una respuesta de error 404 (Not Found).
            res.status(404).send("Producto no encontrado");
        }
    }
};

// Exporta el controlador de productos para que pueda ser utilizado en otras partes de la aplicación (e.g., en las rutas).
module.exports = productosController;








const productosModel = require('../models/productosModel');

const productosController = {
    listarProductos: async (req, res) => {
        try {
            const productos = await productosModel.obtenerTodos();
            res.render('productos/list', {
                title: 'Todos los Productos',
                productos,
                css: '/css/products.css'
            });
        } catch (error) {
            res.status(500).render('500', { title: 'Error del servidor' });
        }
    },

    detalleProducto: async (req, res) => {
        try {
            const producto = await productosModel.obtenerPorId(req.params.id);
            if (!producto) {
                return res.status(404).render('404', { title: 'Producto no encontrado' });
            }
            
            res.render('productos/detail', {
                title: producto.nombre,
                producto,
                css: '/css/products.css',
                js: '/js/product.js'
            });
        } catch (error) {
            res.status(500).render('500', { title: 'Error del servidor' });
        }
    },

    verCarrito: (req, res) => {
        res.render('productos/carrito', {
            title: 'Tu Carrito de Compras',
            css: '/css/cart.css',
            js: '/js/cart.js'
        });
    },

    // Más métodos para crear, editar, eliminar productos...
};

module.exports = productosController;