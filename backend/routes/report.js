const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

router.get('/full', authMiddleware, async (req, res) => {
  const result = await pool.query(`
    SELECT item_id, item_name, type, description, enter_date,
           original_quantity, quantity_received, used_quantity,
           remaining_quantity, saved, created_at
    FROM items ORDER BY created_at DESC
  `);
  res.json(result.rows);
});

module.exports = router;