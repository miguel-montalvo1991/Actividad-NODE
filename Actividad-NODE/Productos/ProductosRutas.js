const express = require('express');
const router = express.Router();

const Productos = [
  { id: 1, Nombre: "Volantes", Precio: 135000, Sustrato: "Propalcote-115", Cantidad: 10000, Colores: "CMYK" },
  { id: 2, Nombre: "Targetas", Precio: 85000, Sustrato: "Propalcote-300", Cantidad: 1000, Colores: "CMYK" },
  { id: 3, Nombre: "Pendones", Precio: 320000, Sustrato: "Banner-13oz", Cantidad: 50, Colores: "Full Color" },
  { id: 4, Nombre: "Stickers", Precio: 150000, Sustrato: "Adhesivo Mate", Cantidad: 2000, Colores: "CMYK" },
];

const CONTRASENA = "sena2025";

const verificarContrasena = (req, res, next) => {
  const password = req.headers['password'];
  if (!password || password !== CONTRASENA) {
    return res.status(401).json({ error: "Incorrect password, or password not sent" });
  }
  next();
};

// GET - filtrar todos los productos (pide password)
router.get('/', verificarContrasena, (req, res) => {
  const Nombre = req.query.Nombre || req.query.nombre;
  const Precio = req.query.Precio || req.query.precio;
  const Sustrato = req.query.Sustrato || req.query.sustrato;
  const Cantidad = req.query.Cantidad || req.query.cantidad;
  const Colores = req.query.Colores || req.query.colores;

  let filteredProductos = Productos.filter(p => {
    return (
      (!Nombre || p.Nombre.toLowerCase().includes(Nombre.toLowerCase())) &&
      (!Precio || p.Precio == Precio) &&
      (!Sustrato || p.Sustrato.toLowerCase().includes(Sustrato.toLowerCase())) &&
      (!Cantidad || p.Cantidad == Cantidad) &&
      (!Colores || p.Colores.toLowerCase().includes(Colores.toLowerCase()))
    );
  });

  res.send(JSON.stringify(filteredProductos, null, 2));
});

// GET - producto por id (pide password)
router.get('/:id', verificarContrasena, (req, res) => {
  const producto = Productos.find((p) => p.id == req.params.id);
  if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
  res.send(JSON.stringify(producto, null, 2));
});

// POST - agregar producto (pide password)
router.post('/', verificarContrasena, (req, res) => {
  const { password, ...nuevoProducto } = req.body;
  nuevoProducto.id = Productos.length + 1;
  Productos.push(nuevoProducto);
  res.status(201).send(JSON.stringify(nuevoProducto, null, 2));
});

// PUT - actualizar producto (pide password)
router.put('/:id', verificarContrasena, (req, res) => {
  const index = Productos.findIndex((p) => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "producto no encontrado" });
  Productos[index] = { ...Productos[index], ...req.body };
  res.send(JSON.stringify(Productos[index], null, 2));
});

// DELETE - eliminar producto (pide password)
router.delete('/:id', verificarContrasena, (req, res) => {
  const index = Productos.findIndex((p) => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "producto no encontrado" });
  const eliminado = Productos.splice(index, 1);
  res.send(JSON.stringify({ mensaje: "producto eliminado", producto: eliminado[0] }, null, 2));
});

module.exports = router;