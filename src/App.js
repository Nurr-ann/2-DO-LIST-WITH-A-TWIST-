import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [priority, setPriority] = useState('low');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskText.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      priority: priority,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const changePriority = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority: task.priority === 'low' ? 'high' : 'low' } : task
      )
    );
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <div className="App">
      <nav>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/advice">Advice</Link>
      </nav>

      <h1>Com-Do List</h1>

      <div className="new-task">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="New Task"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button className="btn-add-task" onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task ${task.priority}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
              {task.text}
            </span>
            <button className="priority-btn" onClick={() => changePriority(task.id)}>
              <span role="img" aria-label={task.priority === 'low' ? 'low priority' : 'high priority'}>
                {task.priority === 'low' ? '⬇️' : '⬆️'}
              </span>
            </button>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              <span role="img" aria-label="delete task">🗑️</span>
            </button>
          </div>
        ))}
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">Progress: {Math.round(progress)}%</p>
    </div>
  );
}

export default App;

