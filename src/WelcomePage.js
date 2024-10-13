import React, { useState } from 'react';
import './WelcomePage.css'; // Add this to import the CSS styles

function WelcomePage() {
  const [name, setName] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMessage(true); // Show the welcome message
  };

  return (
    <div className="welcome-container">
      <h1 className={`welcome-heading ${showMessage ? 'slide-up' : ''}`}>
        Welcome {showMessage && name ? name : 'Guest'}!
      </h1>

      {!showMessage && (
        <form className="name-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="name-input"
          />
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      )}
    </div>
  );
}

export default WelcomePage;
