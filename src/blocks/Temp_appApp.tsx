import React from 'react';
import { BlockModel, ComposerComponentProps, FeedComponentProps } from './types';

// Define your trivia questions and answers
const questions = [
  {
    question: 'What is the capital of France?',
    answers: ['Paris', 'London', 'Berlin', 'Rome'],
    correctAnswer: 'Paris'
  },
  {
    question: 'What is the largest planet in our solar system?',
    answers: ['Earth', 'Saturn', 'Jupiter', 'Uranus'],
    correctAnswer: 'Jupiter'
  },
  // Add more questions here...
];

export const Temp_appComposerComponent = ({ model, done }: ComposerComponentProps) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [userAnswer, setUserAnswer] = React.useState('');
  const [score, setScore] = React.useState(0);

  const handleSubmit = () => {
    if (userAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion >= questions.length - 1) {
      done(model);
    }
  };

  return (
    <div>
      <h1>Trivia Game!</h1>
      <p>Question {currentQuestion + 1} of {questions.length}</p>
      <p>{questions[currentQuestion].question}</p>
      {questions[currentQuestion].answers.map((answer, index) => (
        <button key={index} onClick={() => setUserAnswer(answer)}>
          {answer}
        </button>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      <p>Score: {score}</p>
    </div>
  );
};

export const Temp_appFeedComponent = ({ model }: FeedComponentProps) => {
  // You can display the user's score or other information here
  return <h1>Trivia Game Results!</h1>;
};
