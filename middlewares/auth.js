// ============================================================
// middlewares/auth.js - Middleware de autenticación centralizado
//
// Un middleware en Express es una función que se ejecuta ANTES
// de que la petición llegue al controlador. Puede dejar pasar
// la petición (next()) o responder con un error.
//
// Antes la contraseña estaba repetida en cada módulo de rutas.
// Ahora se define una sola vez aquí y se importa donde se necesite.
// Si en algún momento cambia la contraseña, solo se modifica aquí.
// ============================================================

// Contraseña que deben enviar los clientes en el header "password"
const CONTRASENA = "sena2026";

// ------------------------------------------------------------
// verificarContrasena - función middleware
//
// Parámetros:
//   req  → objeto con la información de la petición (headers, body, params...)
//   res  → objeto para enviar la respuesta al cliente
//   next → función que le dice a Express "todo bien, sigue adelante"
// ------------------------------------------------------------
const verificarContrasena = (req, res, next) => {

  // Leemos el header "password" que debe venir en cada petición
  const password = req.headers['password'];

  // Si no viene el header o la contraseña es incorrecta, rechazamos
  if (!password || password !== CONTRASENA) {
    return res.status(401).json({ error: "Incorrect password, or password not sent" });
  }

  // Si la contraseña es correcta, continuamos con la petición
  next();
};

// Exportamos para usarlo en las rutas
module.exports = verificarContrasena;