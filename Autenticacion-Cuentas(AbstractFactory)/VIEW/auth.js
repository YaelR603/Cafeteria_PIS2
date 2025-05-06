// auth.js (ruta de Express)
const express = require('express');
const router = express.Router();
const CuentaUsuario = require('../modelos/CuentaUsuario');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const cuenta = new CuentaUsuario('', email, password);

  if (cuenta.autenticar()) {
    const usuario = CuentaUsuario.obtenerPorEmail(email);
    res.status(200).json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        tipo: usuario.tipo
      }
    });
  } else {
    res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }
});

module.exports = router;
