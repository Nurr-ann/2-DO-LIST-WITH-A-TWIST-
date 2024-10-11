import React from 'react';
import './Advice.css';

function Advice() {
  const advices = [
    {
      title: 'Prioritize Your Tasks',
      content: 'Focus on the most important tasks first. Use priority labels to help you identify which tasks need to be done urgently.'
    },
    {
      title: 'Break Tasks into Steps',
      content: 'For large tasks, break them into smaller, manageable steps. This makes it easier to track progress and feel accomplished.'
    },
    {
      title: 'Set Realistic Deadlines',
      content: 'Be realistic when setting deadlines. Give yourself enough time to complete each task without overwhelming yourself.'
    },
    {
      title: 'Avoid Multitasking',
      content: 'Focus on one task at a time. Multitasking can reduce your productivity and increase stress levels.'
    },
    {
      title: 'Review and Reflect',
      content: 'At the end of the day, review what you’ve completed and reflect on what you can improve for the next day.'
    },
    {
      title: 'Use Time Blocks',
      content: 'Schedule specific blocks of time for tasks. This helps keep you focused and prevents distractions during working periods.'
    },
    {
      title: 'Celebrate Small Wins',
      content: 'Reward yourself for completing small tasks. Recognizing small achievements can keep you motivated to keep going.'
    }
  ];

  return (
    <div className="advice-page">
      <h1>Task Management Tips</h1>
      <div className="advice-container">
        {advices.map((advice, index) => (
          <div className="advice-box" key={index}>
            <h3>{advice.title}</h3>
            <p>{advice.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Advice;
