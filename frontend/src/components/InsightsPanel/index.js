import React, { useEffect, useState } from 'react';
import API from '../../api';
import './index.css';

export default function InsightsPanel({ tasks = [] }) {
  const [insight, setInsight] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    API.get('/insights', { params: { taskCount: tasks.length } })
      .then((res) => {
        if (isMounted) {
          setInsight(res.data.insightText);
          setError('');
        }
      })
      .catch((err) => {
        console.error('Failed to fetch insights:', err);
        if (isMounted) {
          setError('Unable to load insights. Please try again.');
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [tasks]);

  return (
    <div className="insights-panel">
      <h3>Smart Insights</h3>
      {error ? (
        <p className="error">{error}</p>
      ) : loading ? (
        <p>Loading insights...</p>
      ) : (
        <>
          <p>{insight}</p>
          {tasks.length > 0 && (
            <ul className="task-summary">
              {tasks.slice(0, 5).map((task, index) => (
                <li key={index}>{task.title || task.name || `Task ${index + 1}`}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}