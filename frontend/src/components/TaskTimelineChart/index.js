import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function TaskTimelineChart({ tasks }) {
  const hasTasks = tasks && tasks.length > 0;

  const data = hasTasks
    ? {
        labels: tasks.map(t => new Date(t.dueDate).toLocaleDateString()),
        datasets: [
          {
            label: 'Tasks Due',
            data: tasks.map(() => 1),
            backgroundColor: '#007bff',
          },
        ],
      }
    : {
        labels: [],
        datasets: [],
      };

  const options = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Due Date' } },
      y: { title: { display: true, text: 'Task Count' }, beginAtZero: true },
    },
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Task Timeline</h3>
      {hasTasks ? (
        <Bar data={data} options={options} />
      ) : (
        <p>No tasks availableto display timeline.</p>
      )}
    </div>
  );
}