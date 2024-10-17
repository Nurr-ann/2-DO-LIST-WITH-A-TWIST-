import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Advice from './Advice';
import CompletedTasks from './CompletedTasks';
import './App.css';
import { FiPlusCircle, FiMenu, FiCheckCircle, FiTrash, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import WelcomePage from './WelcomePage';

// To-Do List component
function TodoList({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState('');
  const [timer, setTimer] = useState(0);
  const [category, setCategory] = useState('Work');
  const [filter, setFilter] = useState('All');
  const [dueDate, setDueDate] = useState('');

  // Function to check if the task's due date has passed
  const isTaskOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const taskDueDate = new Date(dueDate);
    return taskDueDate.setHours(23, 59, 59, 999) < today;
  };

  // Save to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) setTasks(storedTasks);
  }, [setTasks]); 
  

  const addTask = () => {
    if (newTask.trim() === '') return;
    const task = {
      id: Date.now(),
      text: newTask,
      category: category,
      priority: 'low',
      isCompleted: false,
      progress: 0, // Initial progress set to 0
      timer: timer,
      dueDate: dueDate,
    };
    setTasks([...tasks, task]);
    setNewTask('');
    setTimer(0);
    setCategory('Work');
    setDueDate('');
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

  // Function to handle progress change
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
            task.priority === 'low' ? 'medium' :
              task.priority === 'medium' ? 'high' : 'low';
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
            task.priority === 'high' ? 'medium' :
              task.priority === 'medium' ? 'low' : 'high';
          return { ...task, priority: newPriority };
        }
        return task;
      })
    );
  };

  const sortByPriority = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorityOrder = { low: 3, medium: 2, high: 1 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    setTasks(sortedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    return task.category === filter;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ADD AND EDIT YOUR TASKS</h1>
      </header>

      <div className="filter-section">
        <label htmlFor="filter">Filter by Category:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="sort-select"
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      <button onClick={sortByPriority} className="sort-btn">
        Sort by Priority
      </button>

      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              // Apply only "overdue" or "completed" based on conditions
              className={`task-item ${task.isCompleted ? 'task-completed' : ''} ${isTaskOverdue(task.dueDate) ? 'overdue' : ''}`}
            >
              <div className="task-info">
                <span className={`category-tag ${task.category.toLowerCase()}`}>
                  {task.category}
                </span>
                <span className={`priority-circle ${task.priority}`} title={`Priority: ${task.priority}`}></span>
                <AiOutlineClockCircle size={22} />
                <span>{task.text}</span>
                {task.timer > 0 && (
                  <span className="task-timer">⏲ {task.timer} min</span>
                )}
                {task.dueDate && (
                  <span className="due-date">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="task-controls">
                <button className="complete-btn" onClick={() => toggleComplete(task.id)}>
                  <FiCheckCircle />
                </button>
                {/* Progress bar */}
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
          <div>No tasks available for this category</div>
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
        <input
          type="number"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
          placeholder="Timer (min)"
          min="0"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-picker"
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

function App() {
  const [tasks, setTasks] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleContinue = () => {
    setShowWelcome(false);
  };

  return (
    <Router>
      <div className="app">
        <CircularMenu />
        {showWelcome ? (
          <WelcomePage onContinue={handleContinue} />
        ) : (
          <Routes>
            <Route path="/" element={<TodoList tasks={tasks} setTasks={setTasks} />} />
            <Route path="/advice" element={<Advice />} />
            <Route path="/completed" element={<CompletedTasks tasks={tasks} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
