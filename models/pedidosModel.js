// ============================================================
// models/pedidosModel.js - Capa de acceso a datos: pedidos
//
// Solo consultas SQL. Las validaciones de negocio (que el usuario
// y el producto existan) las hace el controlador, no el modelo.
// ============================================================

const db = require('../db/db');

// Obtiene todos los pedidos
const obtenerTodos = (callback) => {
  db.all('SELECT * FROM pedidos', [], callback);
};

// Obtiene un pedido por ID
const obtenerPorId = (id, callback) => {
  db.get('SELECT * FROM pedidos WHERE id = ?', [id], callback);
};

// Inserta un nuevo pedido
// La tabla pedidos tiene FK a usuarios y productos, así que si
// los IDs no existen, SQLite rechazará el INSERT automáticamente
// (siempre que PRAGMA foreign_keys = ON esté activo)
const insertar = (datos, callback) => {
  const { usuarioId, productoId, cantidad, total } = datos;
  db.run(
    'INSERT INTO pedidos (usuarioId, productoId, cantidad, total) VALUES (?, ?, ?, ?)',
    [usuarioId, productoId, Number(cantidad), Number(total)],
    callback
  );
};

// Actualiza un pedido existente
const actualizar = (id, datos, callback) => {
  const { usuarioId, productoId, cantidad, total } = datos;
  db.run(
    'UPDATE pedidos SET usuarioId = ?, productoId = ?, cantidad = ?, total = ? WHERE id = ?',
    [usuarioId, productoId, Number(cantidad), Number(total), id],
    callback
  );
};

// Elimina un pedido por ID
const eliminar = (id, callback) => {
  db.run('DELETE FROM pedidos WHERE id = ?', [id], callback);
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  insertar,
  actualizar,
  eliminar
};