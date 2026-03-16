// ============================================================
// models/usuariosModel.js - Capa de acceso a datos: usuarios
//
// Los modelos son la capa más cercana a la base de datos.
// Solo contienen las consultas SQL, sin ninguna lógica de negocio.
// El controlador llama a estas funciones y decide qué responder.
//
// Todas las funciones usan callbacks porque sqlite3 es asíncrono:
// primero se lanza la consulta, y cuando termina se ejecuta el callback
// con el resultado (err, resultado).
// ============================================================

const db = require('../db/db'); // Importamos la conexión a SQLite

// Obtiene todos los usuarios de la tabla
const obtenerTodos = (callback) => {
  db.all('SELECT * FROM usuarios', [], callback);
  // db.all → trae múltiples filas
  // [] → no hay parámetros en esta consulta
};

// Obtiene un usuario por su ID
const obtenerPorId = (id, callback) => {
  db.get('SELECT * FROM usuarios WHERE id = ?', [id], callback);
  // db.get → trae una sola fila
  // El ? se reemplaza con el valor de id (evita SQL injection)
};

// Busca un usuario por su email (para verificar duplicados al crear)
const obtenerPorEmail = (email, callback) => {
  db.get('SELECT id FROM usuarios WHERE email = ?', [email], callback);
};

// Busca un usuario por email pero excluyendo un ID específico
// (para verificar duplicados al editar sin contar el mismo usuario)
const obtenerPorEmailExcluyendo = (email, id, callback) => {
  db.get('SELECT id FROM usuarios WHERE email = ? AND id != ?', [email, id], callback);
};

// Inserta un nuevo usuario en la base de datos
const insertar = (datos, callback) => {
  const { nombre, apellido, email, telefono } = datos;
  db.run(
    'INSERT INTO usuarios (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)',
    [nombre, apellido || null, email, telefono || null],
    // Si apellido o telefono no vienen, guardamos null en lugar de string vacío
    callback
  );
};

// Actualiza los datos de un usuario existente
const actualizar = (id, datos, callback) => {
  const { nombre, apellido, email, telefono } = datos;
  db.run(
    'UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, telefono = ? WHERE id = ?',
    [nombre, apellido || null, email, telefono || null, id],
    callback
  );
};

// Elimina un usuario por su ID
const eliminar = (id, callback) => {
  db.run('DELETE FROM usuarios WHERE id = ?', [id], callback);
};

// Exportamos todas las funciones para usarlas en el controlador
module.exports = {
  obtenerTodos,
  obtenerPorId,
  obtenerPorEmail,
  obtenerPorEmailExcluyendo,
  insertar,
  actualizar,
  eliminar
};