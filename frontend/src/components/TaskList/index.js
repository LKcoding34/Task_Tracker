import React from 'react';
import API from '../../api';
import './index.css';

export default function TaskList({ tasks, filter, setFilter, page, setPage, totalPages, onUpdate }) {
  const handleDelete = async (taskId) => {
    const confirm = window.confirm('Are you sure you want to delete this task?');
    if (!confirm) return;

    try {
      await API.delete(`/tasks/${taskId}`);
      onUpdate?.();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleUpdate = async (taskId, status, priority) => {
    try {
      await API.patch(`/tasks/${taskId}`, { status, priority });
      onUpdate?.();
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  return (
    <div>
      <h3>Tasks</h3>
      <select value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
        <option value="">All Status</option>
        <option>Open</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <select value={filter.priority} onChange={e => setFilter({ ...filter, priority: e.target.value })}>
        <option value="">All Priority</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> — {task.priority} — {task.status} — Due: {new Date(task.dueDate).toLocaleDateString()}
            <div className='update-controls'>
              <select
                value={task.status}
                onChange={e => handleUpdate(task.id, e.target.value, task.priority)}
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
              <select
                value={task.priority}
                onChange={e => handleUpdate(task.id, task.status, e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <button className='delete' type="button" onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
      <span> Page {page} of {totalPages} </span>
      <button type="button" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}