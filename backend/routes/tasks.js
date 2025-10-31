const express = require('express');
const db = require('../db');
const auth = require('../authMiddleware');
const router = express.Router();

// Create New Task
router.post('/', auth, (req, res) => {
  const { title, description, priority, status, dueDate } = req.body;
  if (!title || !dueDate) {
    return res.status(400).json({ error: 'Title and dueDate required' });
  }

  const query = `
    INSERT INTO tasks (title, description, priority, status, dueDate, userId)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [title, description, priority, status, dueDate, req.userId];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to create task' });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Get Tasks with Filters and Pagination
router.get('/', auth, (req, res) => {
  const { page = 1, limit = 5, status, priority } = req.query;
  const offset = (page - 1) * limit;

  const filters = ['userId = ?'];
  const params = [req.userId];

  if (status && status !== '') {
    filters.push('status = ?');
    params.push(status);
  }
  if (priority && priority !== '') {
    filters.push('priority = ?');
    params.push(priority);
  }

  const whereClause = filters.join(' AND ');
  const taskQuery = `
    SELECT * FROM tasks
    WHERE ${whereClause}
    ORDER BY dueDate ASC
    LIMIT ? OFFSET ?
  `;
  const countQuery = `
    SELECT COUNT(*) as count FROM tasks
    WHERE ${whereClause}
  `;

  db.serialize(() => {
    db.all(taskQuery, [...params, limit, offset], (err, tasks) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch tasks' });
      }

      db.get(countQuery, params, (err, countRow) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to count tasks' });
        }

        res.json({
          tasks,
          totalPages: Math.ceil(countRow.count / limit),
          currentPage: parseInt(page)
        });
      });
    });
  });
});

// Update Task Status and Priority
router.patch('/:id', auth, (req, res) => {
  const { status, priority } = req.body;
  const query = `
    UPDATE tasks
    SET status = ?, priority = ?
    WHERE id = ? AND userId = ?
  `;
  const params = [status, priority, req.params.id, req.userId];

  db.run(query, params, function (err) {
    if (err || this.changes === 0) {
      return res.status(404).json({ error: 'Task not found or not updated' });
    }
    res.json({ message: 'Task updated' });
  });
});

// Delete Task
router.delete('/:id', auth, (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM tasks WHERE id = ? AND userId = ?`;
  const params = [id, req.userId];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete task' });
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

module.exports = router;