const express = require('express');
const bcrypt = require('bcryptjs');
const { getConnection } = require('../config/db');

const router = express.Router();

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'No autenticado' });
  }
  return res.json({ user: req.session.user });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
  }

  try {
    const pool = await getConnection();
    const result = await pool.request().input('email', email).query(
      'SELECT TOP 1 id, nombre, email, password_hash, rol FROM usuarios WHERE email = @email'
    );

    const user = result.recordset[0];
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    req.session.user = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol
    };

    return res.json({ user: req.session.user });
  } catch (error) {
    console.error('Error login:', error);
    return res.status(500).json({ message: 'Error interno' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ message: 'Sesión cerrada' }));
});

module.exports = router;
