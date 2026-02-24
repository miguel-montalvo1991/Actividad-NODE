const express = require('express');
const app = express();
const port = 3000;

const productosRutas = require('./Productos/ProductosRutas');

app.use(express.json());

// todas las rutas de productos van a pasar por aqui
app.use('/productos', productosRutas);

app.listen(port, () => {
  console.log("Server esta arriba " + port);
});