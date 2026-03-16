// ============================================================
// routes/usuariosRutas.js - Rutas del módulo usuarios
//
// Las rutas solo definen qué URL corresponde a qué función
// del controlador. No tienen lógica de negocio.
//
// Cada ruta pasa por el middleware verificarContrasena antes
// de llegar al controlador, así nos aseguramos de que todas
// las rutas estén protegidas.
// ============================================================

const express           = require('express');
const router            = express.Router();
const verificarContrasena = require('../middlewares/auth');       // Middleware de autenticación
const usuariosController  = require('../controllers/usuariosController');

// GET    /usuarios        → obtiene todos
// GET    /usuarios/:id    → obtiene uno por ID
// POST   /usuarios        → crea uno nuevo
// PUT    /usuarios/:id    → actualiza uno existente
// DELETE /usuarios/:id    → elimina uno
router.get('/',       verificarContrasena, usuariosController.obtenerUsuarios);
router.get('/:id',    verificarContrasena, usuariosController.obtenerUsuarioPorId);
router.post('/',      verificarContrasena, usuariosController.crearUsuario);
router.put('/:id',    verificarContrasena, usuariosController.actualizarUsuario);
router.delete('/:id', verificarContrasena, usuariosController.eliminarUsuario);

module.exports = router;


// ============================================================
// routes/productosRutas.js - Rutas del módulo productos
// Mismo patrón que usuariosRutas.js
// ============================================================

// const express              = require('express');
// const router               = express.Router();
// const verificarContrasena  = require('../middlewares/auth');
// const productosController  = require('../controllers/productosController');

// router.get('/',       verificarContrasena, productosController.obtenerProductos);
// router.get('/:id',    verificarContrasena, productosController.obtenerProductoPorId);
// router.post('/',      verificarContrasena, productosController.crearProducto);
// router.put('/:id',    verificarContrasena, productosController.actualizarProducto);
// router.delete('/:id', verificarContrasena, productosController.eliminarProducto);

// module.exports = router;


// ============================================================
// routes/pedidosRutas.js - Rutas del módulo pedidos
// Mismo patrón que usuariosRutas.js
// ============================================================

// const express            = require('express');
// const router             = express.Router();
// const verificarContrasena = require('../middlewares/auth');
// const pedidosController  = require('../controllers/pedidosController');

// router.get('/',       verificarContrasena, pedidosController.obtenerPedidos);
// router.get('/:id',    verificarContrasena, pedidosController.obtenerPedidoPorId);
// router.post('/',      verificarContrasena, pedidosController.crearPedido);
// router.put('/:id',    verificarContrasena, pedidosController.actualizarPedido);
// router.delete('/:id', verificarContrasena, pedidosController.eliminarPedido);

// module.exports = router;


// ============================================================
// routes/ventasRutas.js - Rutas del módulo ventas
// Mismo patrón que usuariosRutas.js
// ============================================================

// const express           = require('express');
// const router            = express.Router();
// const verificarContrasena = require('../middlewares/auth');
// const ventasController  = require('../controllers/ventasController');

// router.get('/',       verificarContrasena, ventasController.obtenerVentas);
// router.get('/:id',    verificarContrasena, ventasController.obtenerVentaPorId);
// router.post('/',      verificarContrasena, ventasController.crearVenta);
// router.put('/:id',    verificarContrasena, ventasController.actualizarVenta);
// router.delete('/:id', verificarContrasena, ventasController.eliminarVenta);

// module.exports = router;