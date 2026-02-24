const express = require('express');
const router = express.Router();

const Productos = [
  { id: 1, Nombre: "Volantes", Precio: 135000, Sustrato: "Propalcote-115", Cantidad: 10000, Colores: "CMYK" },
  { id: 2, Nombre: "Tarjetas de Presentación", Precio: 85000, Sustrato: "Propalcote-300", Cantidad: 1000, Colores: "CMYK" },
  { id: 3, Nombre: "Pendones", Precio: 320000, Sustrato: "Banner-13oz", Cantidad: 50, Colores: "Full Color" },
  { id: 4, Nombre: "Stickers", Precio: 150000, Sustrato: "Adhesivo Mate", Cantidad: 2000, Colores: "CMYK" },
];

// GET - todos los productos
router.get('/', (req, res) => {
  res.send(JSON.stringify(Productos, null, 2));
});

// GET - producto por id
router.get('/:id', (req, res) => {
  const producto = Productos.find((p) => p.id == req.params.id);
  if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
  res.send(JSON.stringify(producto, null, 2));
});

// POST - agregar producto
router.post('/', (req, res) => {
  const nuevoProducto = req.body;
  nuevoProducto.id = Productos.length + 1;
  Productos.push(nuevoProducto);
  res.status(201).send(JSON.stringify(nuevoProducto, null, 2));
});

// PUT - actualizar producto
router.put('/:id', (req, res) => {
  const index = Productos.findIndex((p) => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "producto no encontrado" });
  Productos[index] = { ...Productos[index], ...req.body };
  res.send(JSON.stringify(Productos[index], null, 2));
});

// DELETE - eliminar producto
router.delete('/:id', (req, res) => {
  const index = Productos.findIndex((p) => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "producto no encontrado" });
  const eliminado = Productos.splice(index, 1);
  res.send(JSON.stringify({ mensaje: "producto eliminado", producto: eliminado[0] }, null, 2));
});

module.exports = router;