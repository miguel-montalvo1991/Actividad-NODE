// permite que el servidor entienda JSON en las peticiones
app.use(express.json());


// ruta GET que devuelve todos los productos
// el JSON.stringify con el 2 hace que se vea organizado e indentado
app.get("/productos", (req, res) => {
  res.setHeader("Content-Type", "application/json"); // le dice al cliente que la respuesta es JSON
  res.send(JSON.stringify(Productos, null, 2)); // convierte el array a texto JSON bien formateado
});


// GET por id - busca un solo producto por su id
// el :id es un parametro dinamico, cambia segun lo que pongas en la url
app.get("/productos/:id", (req, res) => {
  const producto = Productos.find((p) => p.id == req.params.id); // recorre el array buscando el id que coincida
  if (!producto) return res.status(404).json({ error: "producto no encontrado" }); // si no existe manda error 404
  res.send(JSON.stringify(producto, null, 2)); // si existe lo devuelve formateado
});


// POST - agrega un producto nuevo al array
// los datos del producto nuevo llegan en el body de la peticion

// PUT - actualiza un producto existente por su id
// solo cambia los campos que mandes, los demas quedan igual


// DELETE - elimina un producto por su id
// lo saca del array y confirma que fue eliminado
app.delete("/productos/:id", (req, res) => {
  const index = Productos.findIndex((p) => p.id == req.params.id); // busca la posicion del producto en el array
  if (index === -1) return res.status(404).json({ error: "producto no encontrado" }); // si no existe manda error
  const eliminado = Productos.splice(index, 1); // lo saca del array y lo guarda en una variable
  res.send(JSON.stringify({ mensaje: "producto eliminado", producto: eliminado[0] }, null, 2)); // confirma que se elimino
});

// inicia el servidor en el puerto 3000
app.listen(port, () => {
  console.log("Server esta arriba " + port);
});