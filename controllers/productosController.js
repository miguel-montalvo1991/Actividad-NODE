// ============================================================
// controllers/productosController.js - Lógica de negocio: productos
//
// Mismo patrón que usuariosController.js:
// validar → consultar modelo → responder
// ============================================================

const productosModel = require('../models/productosModel');

// GET /productos → Retorna todos los productos
const obtenerProductos = (req, res) => {
  productosModel.obtenerTodos((err, rows) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json(rows);
  });
};

// GET /productos/:id → Retorna un producto por ID
const obtenerProductoPorId = (req, res) => {
  productosModel.obtenerPorId(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!row) return res.status(404).json({ success: false, message: 'producto no encontrado' });
    res.json(row);
  });
};

// POST /productos → Crea un nuevo producto
const crearProducto = (req, res) => {
  const { nombre, categoria, precio, stock } = req.body;

  // Validación: todos los campos son obligatorios
  // precio y stock pueden ser 0 numérico, por eso verificamos con === undefined
  if (!nombre || !categoria || precio === undefined || stock === undefined) {
    return res.status(400).json({ success: false, message: 'nombre, categoria, precio y stock son obligatorios' });
  }

  // El precio debe ser un número mayor a 0
  if (isNaN(precio) || Number(precio) <= 0) {
    return res.status(400).json({ success: false, message: 'precio debe ser un número mayor a 0' });
  }

  // El stock debe ser un entero mayor o igual a 0 (puede ser 0 si no hay disponible)
  if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
    return res.status(400).json({ success: false, message: 'stock debe ser un número entero mayor o igual a 0' });
  }

  productosModel.insertar({ nombre, categoria, precio, stock }, function(err) {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.status(201).json({
      success: true,
      data: { id: this.lastID, nombre, categoria, precio: Number(precio), stock: Number(stock) }
    });
  });
};

// PUT /productos/:id → Actualiza un producto
const actualizarProducto = (req, res) => {
  const { nombre, categoria, precio, stock } = req.body;

  if (!nombre || !categoria || precio === undefined || stock === undefined) {
    return res.status(400).json({ success: false, message: 'nombre, categoria, precio y stock son obligatorios' });
  }

  if (isNaN(precio) || Number(precio) <= 0) {
    return res.status(400).json({ success: false, message: 'precio debe ser un número mayor a 0' });
  }

  if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
    return res.status(400).json({ success: false, message: 'stock debe ser un número entero mayor o igual a 0' });
  }

  // Verificamos que el producto exista antes de actualizar
  productosModel.obtenerPorId(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!row) return res.status(404).json({ success: false, message: 'producto no encontrado' });

    productosModel.actualizar(req.params.id, { nombre, categoria, precio, stock }, function(err) {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true, data: { id: Number(req.params.id), nombre, categoria, precio: Number(precio), stock: Number(stock) } });
    });
  });
};

// DELETE /productos/:id → Elimina un producto
const eliminarProducto = (req, res) => {
  productosModel.obtenerPorId(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!row) return res.status(404).json({ success: false, message: 'producto no encontrado' });

    productosModel.eliminar(req.params.id, (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true, message: 'producto eliminado', producto: row });
    });
  });
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};