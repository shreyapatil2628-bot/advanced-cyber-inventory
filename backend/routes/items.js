const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// Add item
router.post('/add', authMiddleware, (req, res) => {
  const { item_id, item_name, description, type, enter_date, quantity_received, saved } = req.body;
  try {
    db.prepare(`
      INSERT INTO items (item_id, item_name, description, type, enter_date, original_quantity, quantity_received, remaining_quantity, saved)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(item_id, item_name, description, type, enter_date, quantity_received, quantity_received, quantity_received, saved);
    res.json({ message: 'Item added successfully' });
  } catch (e) {
    res.status(400).json({ error: 'Item ID already exists or invalid data' });
  }
});

// Get all items
router.get('/all', authMiddleware, (req, res) => {
  const items = db.prepare('SELECT * FROM items').all();
  res.json(items);
});

// Update item (used/remaining)
router.put('/update/:id', authMiddleware, (req, res) => {
  const { used_quantity } = req.body;
  const item = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  const remaining = item.original_quantity - used_quantity;
  if (remaining < 0) return res.status(400).json({ error: 'Used quantity exceeds original' });
  db.prepare('UPDATE items SET used_quantity = ?, remaining_quantity = ? WHERE id = ?')
    .run(used_quantity, remaining, req.params.id);
  res.json({ message: 'Updated successfully' });
});

// Delete item
router.delete('/delete/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM items WHERE id = ?').run(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;