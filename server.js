// server.js
import 'dotenv/config'; // Carga las variables de entorno desde .env automáticamente

import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const { Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurar Handlebars
const hbs = exphbs.create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Configurar rutas estáticas para Bootstrap, jQuery y la carpeta public
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar PostgreSQL usando variables de entorno
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});

client.connect()
    .then(() => console.log('Conexión exitosa a PostgreSQL'))
    .catch(err => console.error('Error de conexión a PostgreSQL', err));

// Ruta para manejar la página principal
app.get('/', async (req, res) => {
    try {
        const result = await client.query('SELECT nombre, imagen FROM productos');
        const productos = result.rows;
        res.render('main', { productos });
    } catch (err) {
        console.error('Error ejecutando consulta', err.stack);
        res.status(500).send('Error del servidor');
    }
});

// Servir la aplicación en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

/*
Sentencias SQL para crear la base de datos y la tabla:

CREATE DATABASE come_sano;

\c come_sano;

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    imagen VARCHAR(100) NOT NULL
);
*/
