// File: App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Advice from './Advice';
import CompletedTasks from './CompletedTasks'; // Importing the CompletedTasks component
import './App.css';
import { FiPlusCircle, FiMenu, FiCheckCircle, FiTrash, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { AiOutlineClockCircle } from 'react-icons/ai';

// To-Do List component
function TodoList({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;
    const task = {
      id: Date.now(),
      text: newTask,
      priority: 'low',
      isCompleted: false,
      progress: 0,
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
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

  const increasePriority = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              priority: task.priority === 'low' ? 'medium' : 'high',
            }
          : task
      )
    );
  };

  const decreasePriority = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              priority: task.priority === 'high' ? 'medium' : 'low',
            }
          : task
      )
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>HELLO, let's create your to-do list together</h1>
      </header>

      <div className="task-progress-section">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className={`task-item priority-${task.priority}`}>
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
                <button
                  className="priority-btn"
                  onClick={() => increasePriority(task.id)}
                >
                  <FiArrowUp size={18} />
                </button>
                <button
                  className="priority-btn"
                  onClick={() => decreasePriority(task.id)}
                >
                  <FiArrowDown size={18} />
                </button>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  <FiTrash size={24} />
                </button>
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
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <Router>
      <div className="app">
        {/* Navigation */}
        <nav className="app-nav">
          <ul>
            <li><Link to="/">To-Do List</Link></li>
            <li><Link to="/advice">Advice</Link></li>
            <li><Link to="/completed">Completed Tasks</Link></li>
          </ul>
        </nav>

        {/* Routes for Navigation */}
        <Routes>
          <Route path="/" element={<TodoList tasks={tasks} setTasks={setTasks} />} />
          <Route path="/advice" element={<Advice />} />
          <Route path="/completed" element={<CompletedTasks tasks={tasks} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

