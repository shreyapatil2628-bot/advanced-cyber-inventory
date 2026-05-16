const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

router.post('/add', authMiddleware, async (req, res) => {
  const { item_id, item_name, description, type, enter_date, quantity_received, saved } = req.body;
  try {
    await pool.query(`
      INSERT INTO items (item_id, item_name, description, type, enter_date, original_quantity, quantity_received, remaining_quantity, saved)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    `, [item_id, item_name, description, type, enter_date, quantity_received, quantity_received, quantity_received, saved]);
    res.json({ message: 'Item added successfully' });
  } catch (e) {
    res.status(400).json({ error: 'Item ID already exists or invalid data' });
  }
});

router.get('/all', authMiddleware, async (req, res) => {
  const result = await pool.query('SELECT * FROM items');
  res.json(result.rows);
});

router.put('/update/:id', authMiddleware, async (req, res) => {
  const { used_quantity } = req.body;
  const result = await pool.query('SELECT * FROM items WHERE id = $1', [req.params.id]);
  const item = result.rows[0];
  if (!item) return res.status(404).json({ error: 'Item not found' });
  const remaining = item.original_quantity - used_quantity;
  if (remaining < 0) return res.status(400).json({ error: 'Used quantity exceeds original' });
  await pool.query('UPDATE items SET used_quantity=$1, remaining_quantity=$2 WHERE id=$3',
    [used_quantity, remaining, req.params.id]);
  res.json({ message: 'Updated successfully' });
});

router.delete('/delete/:id', authMiddleware, async (req, res) => {
  await pool.query('DELETE FROM items WHERE id = $1', [req.params.id]);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;