import { BlockModel, ComposerComponentProps, FeedComponentProps } from './types';
import { useState, useEffect } from 'react';
import axios from 'axios'; // you may need to install axios if you haven't already

const apiRequestURL = 'https://opentdb.com/api.php?amount=1';

export const Temp_appFeedComponent = ({ model }: FeedComponentProps) => {
  const { question, answer, result, streak, winPercentage } = model.data;
  return (
    <div>
      <h1>Question: {question}</h1>
      <h2>Your answer: {answer}</h2>
      <h3>Result: {result}</h3>
      <p>Streak: {streak}</p>
      <p>Win percentage: {winPercentage}%</p>
    </div>
  );
};

export const Temp_appComposerComponent = ({ model, done }: ComposerComponentProps) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [winPercentage, setWinPercentage] = useState(0);

  useEffect(() => {
    axios.get(apiRequestURL)
      .then(response => {
        const questionData = response.data.results[0];
        const question = decodeHtml(questionData.question);
        const answers = decodeHtmlArray([...questionData.incorrect_answers, questionData.correct_answer]);
        setQuestion(question);
        setCorrectAnswer(answers.includes(questionData.correct_answer) ? questionData.correct_answer : decodeHtml(questionData.correct_answer));
        setAnswers(answers);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = () => {
    if (selectedAnswer === correctAnswer) {
      setResult("Correct!");
    } else {
      setResult("Incorrect. The correct answer was " + correctAnswer);
    }
  };

  const decodeHtml = (html: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  };

  const decodeHtmlArray = (array: string[]) => {
    return array.map(item => decodeHtml(item));
  };

  return (
    <div>
      <h1>Question: {question}</h1>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            <button onClick={() => setSelectedAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit</button>
      {result && <h3>Result: {result}</h3>}
    </div>
  );
};