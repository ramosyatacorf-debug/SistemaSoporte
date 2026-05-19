const express = require('express');
const bcrypt = require('bcryptjs');
const { getConnection } = require('../config/db');

const router = express.Router();

router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  return res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render('login', { error: 'Completa correo y contraseña.' });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('email', email)
      .query('SELECT TOP 1 id, nombre, email, password_hash, rol FROM usuarios WHERE email = @email');

    const user = result.recordset[0];

    if (!user) {
      return res.status(401).render('login', { error: 'Credenciales inválidas.' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).render('login', { error: 'Credenciales inválidas.' });
    }

    req.session.user = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol
    };

    return res.redirect('/');
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).render('login', {
      error: 'Error interno. Revisa la conexión a SQL Server.'
    });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
