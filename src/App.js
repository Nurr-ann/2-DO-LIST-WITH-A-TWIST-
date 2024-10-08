import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState(""); 
  const [priority, setPriority] = useState("low"); 

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
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
    };
    setTasks([...tasks, newTask]); 
    setNewTaskText("");
  };
