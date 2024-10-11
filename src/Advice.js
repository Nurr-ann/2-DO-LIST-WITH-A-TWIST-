import React from 'react';
import './Advice.css';

const Advice = () => {
  const advices = [
    "Break tasks into smaller steps.",
    "Prioritize tasks by urgency and importance.",
    "Set realistic deadlines.",
    "Eliminate distractions while working.",
    "Review your progress daily.",
    "Use tools like calendars and to-do lists effectively."
  ];

  return (
    <div className="advice-page">
      <h1>Productivity Advice</h1>
      <div className="advice-list">
        {advices.map((advice, index) => (
          <div key={index} className="advice-item">
            <p>{advice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advice;
