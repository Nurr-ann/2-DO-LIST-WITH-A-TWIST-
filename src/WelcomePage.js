import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css'; 

function WelcomePage() {
  const [name, setName] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim()) {
      setShowMessage(true);  // Show welcome message
    }
  };

  const goToTodoList = () => {
    navigate('/todo');  // Navigate to the To-Do List page
  };

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        {showMessage ? (
          <>
            <h1>Hello, {name}!</h1>
            <button onClick={goToTodoList} className="start-btn">
              Go to Todo List
            </button>
          </>
        ) : (
          <>
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
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default WelcomePage;
