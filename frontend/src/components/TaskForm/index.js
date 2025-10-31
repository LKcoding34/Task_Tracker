import React, { useState } from 'react';
import API from '../../api';
import './index.css'

export default function TaskForm({ onTaskCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Open',
    dueDate: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tasks', form);
      setForm({ title: '', description: '', priority: 'Medium', status: 'Open', dueDate: '' });
      onTaskCreated?.();
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} required />
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Open</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}