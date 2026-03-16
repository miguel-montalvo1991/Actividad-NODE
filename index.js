// ============================================================
// index.js - Punto de entrada del servidor
// Este es el primer archivo que se ejecuta cuando iniciamos
// el servidor con "node index.js". Aquí se configura todo:
// CORS, middlewares, rutas y el puerto donde escucha.
// ============================================================

// Cargamos las variables de entorno desde el archivo .env
// (API_PASSWORD y PORT)
require("dotenv").config();

const express = require("express"); // Framework para crear el servidor web
const path = require("path");       // Módulo de Node para manejar rutas de archivos
const cors = require("cors");       // Permite que el frontend se comunique con el backend

const app = express(); // Creamos la aplicación de Express

// ------------------------------------------------------------
// CONFIGURACIÓN DE CORS
// CORS (Cross-Origin Resource Sharing) controla qué dominios
// tienen permiso de hacer peticiones a nuestra API.
// Sin esto, el navegador bloquea las peticiones del frontend.
// ------------------------------------------------------------
app.use(cors({
  origin: [
    "http://localhost:5173",                      // Frontend en local (desarrollo)
    "https://api-miguel-montalvo.netlify.app"     // Frontend desplegado en Netlify
  ],
  allowedHeaders: ["Content-Type", "password"],   // Headers que permitimos recibir
}));

// Permite que Express lea el body de las peticiones en formato JSON
app.use(express.json());

// ------------------------------------------------------------
// SERVIR EL FRONTEND ESTÁTICO
// Express puede servir archivos HTML, CSS y JS directamente.
// Aquí le decimos que sirva el build de React desde la carpeta dist.
// Esto hace que al entrar a la URL del backend también veamos
// el frontend.
// ------------------------------------------------------------
app.use(express.static(path.join(__dirname, "frontend/frontend-tienda/dist")));

// ------------------------------------------------------------
// MIDDLEWARE DE AUTENTICACIÓN GLOBAL
// Antes de que cualquier petición llegue a las rutas de la API,
// pasa por aquí y verificamos que tenga la contraseña correcta
// en el header. Si no la tiene, respondemos con error 401.
// ------------------------------------------------------------
app.use((req, res, next) => {

  // Solo protegemos las rutas de la API, no archivos estáticos
  if (
    req.path.startsWith("/productos") ||
    req.path.startsWith("/usuarios") ||
    req.path.startsWith("/ventas") ||
    req.path.startsWith("/pedidos")
  ) {

    // Leemos el header "password" que debe venir en la petición
    const apiKey = req.headers["password"];

    // Si no viene el header, rechazamos la petición
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: "API key requerida"
      });
    }

    // Si la contraseña no coincide con la del .env, rechazamos
    if (apiKey !== process.env.API_PASSWORD) {
      return res.status(403).json({
        success: false,
        message: "Password incorrecta"
      });
    }
  }

  // Si todo está bien, continuamos con la petición
  next();
});

// ------------------------------------------------------------
// RUTAS DE LA API
// Aquí le decimos a Express qué archivo de rutas usar para
// cada módulo. Por ejemplo, todas las peticiones que empiecen
// con "/usuarios" van a manejarse en usuariosRutas.js
// ------------------------------------------------------------
app.use("/productos", require("./routes/productosRutas"));
app.use("/usuarios",  require("./routes/usuariosRutas"));
app.use("/pedidos",   require("./routes/pedidosRutas"));
app.use("/ventas",    require("./routes/ventasRutas"));

// ------------------------------------------------------------
// ARRANCAR EL SERVIDOR
// process.env.PORT es el puerto que asigna Render automáticamente
// en producción. En local, usamos el 3000 como respaldo.
// ------------------------------------------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});