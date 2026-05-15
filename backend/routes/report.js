const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

router.get('/full', authMiddleware, (req, res) => {
  const items = db.prepare(`
    SELECT item_id, item_name, type, description, enter_date,
           original_quantity, quantity_received, used_quantity,
           remaining_quantity, saved, created_at
    FROM items ORDER BY created_at DESC
  `).all();
  res.json(items);
});

module.exports = router;