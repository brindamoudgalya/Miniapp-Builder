import React, { useState } from 'react';
import QuizApp from './QuizApp';  // Import the QuizApp component
import './App.css';

const App: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="app-container">
      {showQuiz ? (
        <QuizApp onExit={() => setShowQuiz(false)} />
      ) : (
        <div className="main-screen">
          <h1>Main Application</h1>
          <button className="start-button" onClick={() => setShowQuiz(true)}>
            Start Quiz Miniapp
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
