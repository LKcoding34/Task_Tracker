const express = require('express');
const db = require('./db');
const auth = require('./authMiddleware');
const router = express.Router();

router.get('/', auth, (req, res) => {
  db.all(`SELECT priority, status, dueDate FROM tasks WHERE userId = ?`, [req.userId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to compute insights' });

    const total = rows.length;
    const highPriority = rows.filter(t => t.priority === 'High').length;
    const dueSoon = rows.filter(t => new Date(t.dueDate) - Date.now() < 3 * 86400000).length;

    const dayCount = {};
    rows.forEach(t => {
      const day = new Date(t.dueDate).toLocaleDateString();
      dayCount[day] = (dayCount[day] || 0) + 1;
    });

    const busiestDay = Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    const insightText = `You have ${total} tasks — ${highPriority} are High priority, ${dueSoon} are due soon. Busiest day: ${busiestDay}.`;
    res.json({ insightText });
  });
});

module.exports = router;