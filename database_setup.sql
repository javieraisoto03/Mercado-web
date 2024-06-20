-- database_setup.sql

-- Crear la base de datos
CREATE DATABASE come_sano;

-- Conectar a la base de datos
\c come_sano;

-- Crear la tabla de productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    imagen VARCHAR(100) NOT NULL
);

-- Insertar datos en la tabla de productos
INSERT INTO productos (nombre, imagen) VALUES
('banana', 'banana.png'),
('cebollas', 'cebollas.png'),
('lechuga', 'lechuga.png'),
('papas', 'papas.png'),
('pimenton', 'pimenton.png'),
('tomate', 'tomate.png');
