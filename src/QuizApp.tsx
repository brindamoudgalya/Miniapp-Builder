import React, { useState, useEffect } from 'react';
import './QuizApp.css';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const fetchQuestions = async (): Promise<Question[]> => {
  const response = await fetch('https://opentdb.com/api.php?amount=50&type=multiple');
  const data = await response.json();
  return data.results.map((item: any) => ({
    question: item.question,
    correct_answer: item.correct_answer,
    incorrect_answers: item.incorrect_answers,
  }));
};

const QuizApp: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchQuestions().then(setQuestions);
  }, []);

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
      }
    } else {
      setShowResults(true);
    }
  };

  const handleNextQuestion = () => {
    if (!showResults) {
      handleAnswerClick(true);
    }
  };

  return (
    <div className="seam">
      <div className="navigation">
        <span className="back-arrow" onClick={onExit}>←</span>
        <span className="exit-button" onClick={onExit}>✖</span>
      </div>
      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : !showResults ? (
        <>
          <div className="question" dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
          <div className="answer-grid">
            {[questions[currentQuestionIndex].correct_answer, ...questions[currentQuestionIndex].incorrect_answers]
              .sort(() => Math.random() - 0.5)
              .map((answer, index) => (
                <div
                  className="answer-choice"
                  key={index}
                  onClick={() => handleAnswerClick(answer === questions[currentQuestionIndex].correct_answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              ))}
          </div>
          <button className="submit-button" onClick={handleNextQuestion}>Submit</button>
        </>
      ) : (
        <div className="seam">
          <h2>Quiz Over!</h2>
          <p>You got {correctAnswersCount} out of {currentQuestionIndex + 1} correct.</p>
        </div>
      )}
    </div>
  );
};

export default QuizApp;