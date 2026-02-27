const express = require("express");
const router = express.Router()



const usuarios = [
  { id: 1, Nombre: "carla", Apellido: "bravo", email: "@carla.com", telefono:35515425},
  { id: 2, Nombre: "davier", Apellido: "quinto", email: "@davier.com", telefono:2949892},
  { id: 3, Nombre: "manuela", Apellido: "cordoba", email: "@cordabo", telefono:15984+69},
  { id: 4, Nombre: "miguel sama ", Apellido: "montalvo", email: "@monta.com", telefono:498516876+5 },
];


const CONTRASENA = "sena2025";

const verificarContrasena = (req, res, next) => {
  const password = req.headers['password'];
  if (!password || password !== CONTRASENA) {
    return res.status(401).json({ error: "Incorrect password, or password not sent" });
  }
  next();
};

// GET - filtrar todos los usuarios (pide password)
router.get('/', verificarContrasena, (req, res) => {
  const id = req.query.id|| req.query.id;
  const Nombre = req.query.Nombre || req.query.Nombre;
  const Apellido = req.query.Apellido || req.query.Apellido;
  const email = req.query.email || req.query.email;
  const telefono = req.query.telefono || req.query.telefono;

  let filteredusuarios = usuarios.filter(u => {
    return (
      (!id || u.idtoLowerCase().includes(usuarios.toLowerCase())) &&
      (!Nombre || u.Nombre == Nombre) &&
      (!Apellido|| u.Apellido.toLowerCase().includes(Apellido.toLowerCase())) &&
      (!email|| u.email== email) &&
      (!telefono|| u.telefono.toLowerCase().includes(telefono.etoLowerCase()))
    );
  });

  res.send(JSON.stringify(filteredusuarios, null, 2));
});


//

// GET - usuarios por id (pide password)
router.get('/:id', verificarContrasena, (req, res) => {
  const usuarios = usuarios.find((p) => p.id == req.params.id);
  if (!usuarios) return res.status(404).json({ error: "usuario no encontrado" });
  res.send(JSON.stringify(usuarios, null, 2));
});

//

// POST - agregar usuarios(pide password)
router.post('/', verificarContrasena, (req, res) => {
  const { password, ...nuevousuario } = req.body;
  nuevousuario.id = usuarios.length + 1;
  usuarios.push(nuevousuario);
  res.status(201).send(JSON.stringify(nuevousuario, null, 2));
});

//

// PUT - actualizar usuario (pide password)
router.put('/:id', verificarContrasena, (req, res) => {
  const index = usuarios.findIndex((p) => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "usuario no encontrado" });
  usuarios[index] = { ...usuarios[index], ...req.body };
  res.send(JSON.stringify(usuarios[index], null, 2));
});

//

// DELETE - eliminar usuarios (pide password)
router.delete('/:id', verificarContrasena, (req, res) => {
  const index = usuarios.findIndex((p) => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "usuarios no encontrado" });
  const eliminado = usuarios.splice(index, 1);
  res.send(JSON.stringify({ mensaje: "usuarios eliminado", usuarios: eliminado[0] }, null, 2));
});

//

module.exports = router;