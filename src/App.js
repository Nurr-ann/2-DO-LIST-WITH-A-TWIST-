// File: App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Advice from './Advice'; // Importing the Advice component
import './App.css';
import { FiPlusCircle, FiMenu, FiCheckCircle } from 'react-icons/fi';
import { AiOutlineClockCircle } from 'react-icons/ai';

// To-Do List component (embedded inside App.js for simplicity)
function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;
    const task = {
      id: Date.now(),
      text: newTask,
      isCompleted: false,
      progress: 0,
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleProgressChange = (taskId, value) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, progress: value } : task
      )
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>COM·DO LIST</h1>
      </header>

      <div className="task-progress-section">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-info">
                <div className="task-header">
                  <AiOutlineClockCircle size={22} className="task-icon" />
                  <span className="task-title">{task.text}</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="task-controls">
                <button
                  className={`complete-btn ${
                    task.isCompleted ? 'completed' : ''
                  }`}
                  onClick={() => toggleComplete(task.id)}
                >
                  <FiCheckCircle size={24} />
                </button>
                <input
                  type="range"
                  className="progress-input"
                  value={task.progress}
                  onChange={(e) =>
                    handleProgressChange(task.id, e.target.value)
                  }
                  min="0"
                  max="100"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="no-tasks">Add a task to get started</div>
        )}
      </div>

      <div className="add-task-section">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add Task"
          className="task-input"
        />
        <button onClick={addTask} className="add-task-btn">
          <FiPlusCircle size={40} />
        </button>
      </div>

      <div className="menu-section">
        <button className="menu-btn">
          <FiMenu size={24} />
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navigation */}
        <nav className="app-nav">
          <ul>
            <li><Link to="/">To-Do List</Link></li>
            <li><Link to="/advice">Advice</Link></li>
          </ul>
        </nav>

        {/* Routes for Navigation */}
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/advice" element={<Advice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;