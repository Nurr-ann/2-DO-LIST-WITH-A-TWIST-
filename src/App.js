import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTaskItem = { text: newTask, completed: false };
    setTasks([...tasks, newTaskItem]);
    setNewTask("");
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation Menu */}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/tasks">Task Page</Link>
          <Link to="/completed">Completed Tasks</Link>
          <Link to="/advice">Task Management Advice</Link>
        </nav>

        {/* Routes to different pages */}
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* Task Page Route */}
          <Route path="/tasks" element={
            <TaskPage 
              tasks={tasks} 
              newTask={newTask}
              setNewTask={setNewTask}
              addTask={addTask}
              completeTask={completeTask}
            />
          }/>

          {/* Completed Tasks Route */}
          <Route path="/completed" element={<CompletedTasks tasks={tasks} />} />

          {/* Advice Page Route */}
          <Route path="/advice" element={<Advice />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to the To-Do List App</h1>
      <p>Use the menu to navigate through the pages.</p>
    </div>
  );
}

function TaskPage({ tasks, newTask, setNewTask, addTask, completeTask }) {
  return (
    <div>
      <h1>Task Page</h1>
      <div className="new-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

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
    </div>
  );
}

function CompletedTasks({ tasks }) {
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div>
      <h1>Completed Tasks</h1>
      {completedTasks.length > 0 ? (
        <ul>
          {completedTasks.map((task, index) => (
            <li key={index}>{task.text}</li>
          ))}
        </ul>
      ) : (
        <p>No tasks completed yet.</p>
      )}
    </div>
  );
}

function Advice() {
  return (
    <div>
      <h1>Task Management Advice</h1>
      <ul>
        <li>Prioritize your tasks by importance and urgency.</li>
        <li>Break down large tasks into smaller, more manageable steps.</li>
        <li>Set specific deadlines for each task.</li>
        <li>Review your to-do list regularly to adjust priorities.</li>
        <li>Focus on one task at a time to avoid feeling overwhelmed.</li>
      </ul>
    </div>
  );
}

export default App;
