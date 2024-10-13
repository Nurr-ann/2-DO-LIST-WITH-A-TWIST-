import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css'; 

function WelcomePage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim()) {
      navigate('/');  // Navigates to the Todo List page
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1>Welcome!</h1>
        <p>Let me know your name</p>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter your name" 
          className="name-input"
        />
        <button onClick={handleSubmit} className="start-btn">
          Go to Todo List
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;

