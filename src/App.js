import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Advice from './Advice';  // Make sure Advice.js exists and is in the same folder
import CompletedTasks from './CompletedTasks';  // Ensure this file exists
import './App.css';  // Ensure App.css is properly imported
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
      tasks.map((task) => {
        if (task.id === taskId) {
          const newPriority =
            task.priority === 'low' ? 'medium' : task.priority === 'medium' ? 'high' : 'high';
          return { ...task, priority: newPriority };
        }
        return task;
      })
    );
  };

  const decreasePriority = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const newPriority =
            task.priority === 'high' ? 'medium' : task.priority === 'medium' ? 'low' : 'low';
          return { ...task, priority: newPriority };
        }
        return task;
      })
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>HELLO, LET'S CREATE YOUR TO-DO LIST TOGETHER</h1>
      </header>

      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className={`task-item ${task.priority} ${task.isCompleted ? 'task-completed' : ''}`}>
              <div className="task-info">
                <AiOutlineClockCircle size={22} />
                <span>{task.text}</span>
              </div>
              <div className="task-controls">
                <button className="complete-btn" onClick={() => toggleComplete(task.id)}>
                  <FiCheckCircle />
                </button>
                <input
                  type="range"
                  value={task.progress}
                  onChange={(e) => handleProgressChange(task.id, e.target.value)}
                  min="0"
                  max="100"
                />
                <button onClick={() => increasePriority(task.id)}>
                  <FiArrowUp />
                </button>
                <button onClick={() => decreasePriority(task.id)}>
                  <FiArrowDown />
                </button>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  <FiTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No tasks yet</div>
        )}
      </div>

      <div className="add-task-section">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add Task"
        />
        <button onClick={addTask} className="add-task-btn">
          <FiPlusCircle size={40} />
        </button>
      </div>
    </div>
  );
}

// Circular Menu Component for Navigation
function CircularMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`circular-menu ${open ? 'open' : ''}`}>
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        <FiMenu size={40} />
      </button>
      <nav className={`menu-options ${open ? 'visible' : ''}`}>
        <Link to="/" className="menu-option">To-Do List</Link>
        <Link to="/advice" className="menu-option">Advice</Link>
        <Link to="/completed" className="menu-option">Completed Tasks</Link>
      </nav>
    </div>
  );
}

// Completed Tasks Page
function CompletedTasks({ tasks }) {
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div className="completed-task-list">
      <h2>COMPLETED TASKS</h2>
      {completedTasks.length > 0 ? (
        <ul>
          {completedTasks.map((task) => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>
      ) : (
        <p>No tasks completed yet</p>
      )}
      <Link to="/">Go back to To-Do List</Link>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <Router>
      <div className="app">
        {/* Circular Menu */}
        <CircularMenu />
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