import React, { useEffect, useState, useCallback } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import InsightsPanel from '../components/InsightsPanel';
import TaskTimelineChart from '../components/TaskTimelineChart';
import Logout from '../components/Logout';
import API from '../api';
import './index.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ status: '', priority: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = useCallback(async () => {
    try {
      const params = {
        page,
        limit: 5,
        status: filter.status || undefined,
        priority: filter.priority || undefined,
      };
      const res = await API.get('/tasks', { params });
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  }, [filter, page]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskCreated = () => {
    fetchTasks();
  };

  return (
    <div className="dashboard">
      <h1>Task Tracker and Smart Insights</h1>
      <Logout />
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList
        tasks={tasks}
        filter={filter}
        setFilter={setFilter}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        onUpdate={fetchTasks}
      />
      <TaskTimelineChart tasks={tasks} />
      <InsightsPanel />
    </div>
  );
}