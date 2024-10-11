import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskText.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      priority: priority,
      dueDate: dueDate,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
    setDueDate("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTaskText = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const changePriority = (id, newPriority) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority: newPriority } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <div className="App">
      <h1>To-Do List with a Twist</h1>

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
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks
          .sort((a, b) =>
            a.priority === "high" && b.priority === "low" ? -1 : 1
          )
          .map((task) => (
            <div key={task.id} className={`task ${task.priority}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <EditableTaskText task={task} onEdit={editTaskText} />
              <select
                value={task.priority}
                onChange={(e) => changePriority(task.id, e.target.value)}
              >
                <option value="low">Low</option>
                <option value="high">High</option>
              </select>
              <p>Due: {task.dueDate || "No Due Date"}</p>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          ))}
      </div>

      <button onClick={clearCompleted}>Clear Completed</button>

      <div className="progress-bar">
        <div
          style={{ width: `${progress}%`, background: "#4caf50", height: "20px" }}
        ></div>
      </div>
      <p>Progress: {Math.round(progress)}%</p>
    </div>
  );
}

const EditableTaskText = ({ task, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const saveEdit = () => {
    onEdit(task.id, newText);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
          {task.text}
        </span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default App;
