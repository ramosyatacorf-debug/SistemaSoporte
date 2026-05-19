const express = require('express');
const { getConnection } = require('../config/db');
const { ensureAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/tickets', ensureAuth, async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT t.id, t.titulo, t.descripcion, t.estado, t.prioridad, t.creado_en,
             u.nombre AS creado_por_nombre
      FROM tickets t
      INNER JOIN usuarios u ON u.id = t.creado_por
      ORDER BY t.creado_en DESC
    `);

    return res.render('tickets', {
      user: req.session.user,
      tickets: result.recordset,
      error: null
    });
  } catch (error) {
    console.error('Error obteniendo tickets:', error);
    return res.status(500).render('tickets', {
      user: req.session.user,
      tickets: [],
      error: 'No fue posible cargar los tickets.'
    });
  }
});

router.post('/tickets', ensureAuth, async (req, res) => {
  const { titulo, descripcion, prioridad } = req.body;

  if (!titulo || !descripcion || !prioridad) {
    return res.status(400).redirect('/tickets');
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input('titulo', titulo)
      .input('descripcion', descripcion)
      .input('prioridad', prioridad)
      .input('creado_por', req.session.user.id)
      .query(`
        INSERT INTO tickets (titulo, descripcion, prioridad, creado_por)
        VALUES (@titulo, @descripcion, @prioridad, @creado_por)
      `);

    return res.redirect('/tickets');
  } catch (error) {
    console.error('Error creando ticket:', error);
    return res.status(500).redirect('/tickets');
  }
});

router.post('/tickets/:id/estado', ensureAuth, async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const estadosValidos = ['abierto', 'en_proceso', 'resuelto', 'cerrado'];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).redirect('/tickets');
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input('id', Number(id))
      .input('estado', estado)
      .query('UPDATE tickets SET estado = @estado WHERE id = @id');

    return res.redirect('/tickets');
  } catch (error) {
    console.error('Error actualizando estado:', error);
    return res.status(500).redirect('/tickets');
  }
});

module.exports = router;
