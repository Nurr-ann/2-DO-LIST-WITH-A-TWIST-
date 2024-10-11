// File: CompletedTasks.js
import React from 'react';
import { Link } from 'react-router-dom';

function CompletedTasks({ tasks }) {
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Completed Tasks</h1>
      </header>
      <div className="completed-tasks-section">
        {completedTasks.length > 0 ? (
          <ul className="completed-tasks-list">
            {completedTasks.map((task) => (
              <li key={task.id}>{task.text}</li>
            ))}
          </ul>
        ) : (
          <p>No tasks completed yet.</p>
        )}
        <Link to="/">Go back to To-Do List</Link>
      </div>
    </div>
  );
}

export default CompletedTasks;
