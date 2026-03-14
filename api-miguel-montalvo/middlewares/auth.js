const verificarContrasena = (req, res, next) => {
  const password = req.headers['password'];
  if (!password || password !== process.env.API_PASSWORD) {
    return res.status(401).json({ error: "Incorrect password, or password not sent" });
  }
  next();
};

module.exports = verificarContrasena;