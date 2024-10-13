import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Advice from './Advice';
import CompletedTasks from './CompletedTasks';
import './App.css';
import { FiPlusCircle, FiMenu, FiCheckCircle, FiTrash, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { AiOutlineClockCircle } from 'react-icons/ai';

// To-Do List component
function TodoList({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState('');
  const [timer, setTimer] = useState(0);
  const [category, setCategory] = useState('Work'); // State for category selection
  const [filter, setFilter] = useState('All'); // State for filtering tasks by category
  const [dueDate, setDueDate] = useState('');

  const isTaskOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const taskDueDate = new Date(dueDate);
    return taskDueDate.setHours(23, 59, 59, 999) < today;
  };
  
  const addTask = () => {
    if (newTask.trim() === '') return;
    const task = {
      id: Date.now(),
      text: newTask,
      category: category, // Add category to the task
      priority: 'low', // Default priority
      isCompleted: false,
      progress: 0,
      timer: timer, // Add timer to task
      dueDate: dueDate,
    };
    setTasks([...tasks, task]);
    setNewTask('');
    setTimer(0); // Reset timer input after adding task
    setCategory('Work'); // Reset category selection
    setDueDate('');
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted, animate: true } : task
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
            task.priority === 'low' ? 'medium' :
            task.priority === 'medium' ? 'high' : 'low'; // Loop back to low after high
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
            task.priority === 'medium' ? 'low' : 'high'; // Loop back to high after low
          return { ...task, priority: newPriority };
        }
        return task;
      })
    );
  };

  // Function to sort tasks by priority: high > medium > low
  const sortByPriority = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorityOrder = { low: 3, medium: 2, high: 1 }; // Order: high first
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    setTasks(sortedTasks);
  };

  // Function to filter tasks by category
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true; // Show all tasks if filter is set to 'All'
    return task.category === filter;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ADD AND EDIT YOUR TASKS</h1>
      </header>

      {/* Filter Dropdown */}
      <div className="filter-section">
        <label htmlFor="filter">Filter by Category:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
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
              className={`task-item ${task.isCompleted ? 'task-completed' : ''} ${
                isTaskOverdue(task.dueDate) ? 'overdue' : ''
              }`}
            >
              <div className="task-info">
                {/* Colored category tag */}
                <span className={`category-tag ${task.category.toLowerCase()}`}>
                  {task.category}
                </span>
                {/* Circle representing priority */}
                <span
                  className={`priority-circle ${task.priority}`}
                  title={`Priority: ${task.priority}`}
                ></span>
                <AiOutlineClockCircle size={22} />
                <span>{task.text}</span>
                {task.timer > 0 && (
                  <span className="task-timer">⏲ {task.timer} min</span>
                )}
                
                {/* Display due date */}
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
        />
        <input
          type="number"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
          placeholder="Timer (min)"
          min="0"
        />
        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>

        {/* Date Picker for Due Date */}
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

  return (
    <Router>
      <div className="app">
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