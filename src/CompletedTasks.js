import React from 'react';
import { Link } from 'react-router-dom';
import './CompletedTasks.css'; // Import CSS

function CompletedTasks({ tasks }) {
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div className="completed-tasks-page">
      <h2 className="completed-tasks-header">Completed Tasks</h2>
      <div className="completed-tasks-content">
        {completedTasks.length > 0 ? (
          <ul className="completed-tasks-list">
            {completedTasks.map((task) => (
              <li key={task.id} className="completed-task-item">
                {task.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-tasks-message">You haven't completed any tasks yet. Keep going!</p>
        )}
      </div>

      <Link to="/" className="go-back-link">Go back to To-Do List</Link>
    </div>
  );
}

export default CompletedTasks;
