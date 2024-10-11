// File: Advice.js
import React from 'react';
import './advice.css';
import { FiCheckSquare, FiArrowRightCircle, FiTarget } from 'react-icons/fi';
import { AiOutlineClockCircle } from 'react-icons/ai';

function Advice() {
  const adviceList = [
    {
      id: 1,
      title: "Prioritize Tasks",
      description:
        "Identify the most important tasks and tackle them first. Prioritizing helps you focus on what matters most.",
      icon: <FiTarget size={28} />,
    },
    {
      id: 2,
      title: "Break Down Large Tasks",
      description:
        "If a task feels overwhelming, break it down into smaller, more manageable steps. This will make it easier to start.",
      icon: <FiArrowRightCircle size={28} />,
    },
    {
      id: 3,
      title: "Set Deadlines",
      description:
        "Give each task a realistic deadline to keep yourself accountable and motivated to complete tasks on time.",
      icon: <AiOutlineClockCircle size={28} />,
    },
    {
      id: 4,
      title: "Check Off Completed Tasks",
      description:
        "Mark tasks as complete to give yourself a sense of accomplishment and keep track of your progress.",
      icon: <FiCheckSquare size={28} />,
    },
  ];

  return (
    <div className="advice-container">
      <header className="advice-header">
        <h1>How to Create an Effective To-Do List</h1>
        <p>These tips will help you organize your tasks and improve productivity.</p>
      </header>

      <div className="advice-list">
        {adviceList.map((advice) => (
          <div key={advice.id} className="advice-item">
            <div className="advice-icon">{advice.icon}</div>
            <div className="advice-content">
              <h2>{advice.title}</h2>
              <p>{advice.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Advice;
