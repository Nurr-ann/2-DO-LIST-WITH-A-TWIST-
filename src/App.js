import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [progress, setProgress] = useState(0);

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTaskItem = { text: newTask, completed: false };
    setTasks([...tasks, newTaskItem]);
    setNewTask("");
    updateProgress();
  };

  // Toggle task completion
  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    updateProgress();
  };

  // Update the progress bar
  const updateProgress = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    setProgress((completedTasks / tasks.length) * 100);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>

      {/* New Task Input */}
      <div className="new-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task">
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask(index)}
            />
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default App;
