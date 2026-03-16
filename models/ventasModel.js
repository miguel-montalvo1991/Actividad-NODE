// ============================================================
// models/ventasModel.js - Capa de acceso a datos: ventas
//
// Solo consultas SQL. Sin validaciones, eso le toca al controlador.
// ============================================================

const db = require('../db/db');

// Obtiene todas las ventas
const obtenerTodas = (callback) => {
  db.all('SELECT * FROM ventas', [], callback);
};

// Obtiene una venta por ID
const obtenerPorId = (id, callback) => {
  db.get('SELECT * FROM ventas WHERE id = ?', [id], callback);
};

// Inserta una nueva venta
// La tabla tiene CHECK en metodoPago y estado, así que SQLite
// también rechaza valores no permitidos a nivel de base de datos
const insertar = (datos, callback) => {
  const { usuarioId, fecha, total, metodoPago, estado } = datos;
  db.run(
    'INSERT INTO ventas (usuarioId, fecha, total, metodoPago, estado) VALUES (?, ?, ?, ?, ?)',
    [usuarioId, fecha, Number(total), metodoPago, estado],
    callback
  );
};

// Actualiza una venta existente
const actualizar = (id, datos, callback) => {
  const { usuarioId, fecha, total, metodoPago, estado } = datos;
  db.run(
    'UPDATE ventas SET usuarioId = ?, fecha = ?, total = ?, metodoPago = ?, estado = ? WHERE id = ?',
    [usuarioId, fecha, Number(total), metodoPago, estado, id],
    callback
  );
};

// Elimina una venta por ID
const eliminar = (id, callback) => {
  db.run('DELETE FROM ventas WHERE id = ?', [id], callback);
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  insertar,
  actualizar,
  eliminar
};