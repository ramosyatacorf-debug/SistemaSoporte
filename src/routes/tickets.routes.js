const express = require('express');
const { getConnection } = require('../config/db');
const { ensureAuthApi } = require('../middleware/auth');

const router = express.Router();

router.get('/', ensureAuthApi, async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT t.id, t.titulo, t.descripcion, t.estado, t.prioridad, t.creado_en, u.nombre AS creado_por_nombre
      FROM tickets t
      INNER JOIN usuarios u ON u.id = t.creado_por
      ORDER BY t.creado_en DESC
    `);
    res.json({ tickets: result.recordset });
  } catch (error) {
    console.error('Error tickets:', error);
    res.status(500).json({ message: 'No se pudieron obtener tickets' });
  }
});

router.post('/', ensureAuthApi, async (req, res) => {
  const { titulo, descripcion, prioridad } = req.body;
  if (!titulo || !descripcion || !prioridad) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input('titulo', titulo)
      .input('descripcion', descripcion)
      .input('prioridad', prioridad)
      .input('creado_por', req.session.user.id)
      .query('INSERT INTO tickets (titulo, descripcion, prioridad, creado_por) VALUES (@titulo, @descripcion, @prioridad, @creado_por)');
    return res.status(201).json({ message: 'Ticket creado' });
  } catch (error) {
    console.error('Error crear ticket:', error);
    return res.status(500).json({ message: 'No se pudo crear el ticket' });
  }
});

router.patch('/:id/estado', ensureAuthApi, async (req, res) => {
  const estadosValidos = ['abierto', 'en_proceso', 'resuelto', 'cerrado'];
  const { estado } = req.body;
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ message: 'Estado inválido' });
  }

  try {
    const pool = await getConnection();
    await pool.request().input('id', Number(req.params.id)).input('estado', estado)
      .query('UPDATE tickets SET estado = @estado WHERE id = @id');
    return res.json({ message: 'Estado actualizado' });
  } catch (error) {
    console.error('Error estado:', error);
    return res.status(500).json({ message: 'No se pudo actualizar estado' });
  }
});

module.exports = router;
