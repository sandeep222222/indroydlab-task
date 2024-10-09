import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import questions from "./questions"
import './index.css'

function DisplayQuestion({ updatePlayerScores }) {
  const [name, setName] = useState('');
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [score, setScore] = useState(0);


  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userChoice, setUserChoice] = useState('');

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (userChoice === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setUserChoice('');
    setCurrentQuestion(currentQuestion + 1);
  };


  const handleNameSubmit = (e) => {
    e.preventDefault();
    setIsNameSubmitted(true);
  };

  return (
    <div className='questionBg-container'>
      {!isNameSubmitted ? (
        <form onSubmit={handleNameSubmit} className='nameForm'>
          <h2 className='enterText'>Enter your <span className='nameSpan'>name</span> to start the quiz</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className='nameInput'
            required
          />
          <button type="submit" className='startQuizButton'>Start Quiz</button>
        </form>
      ) : (
        <div>
          <h2 className='welcomeText'>Welcome, <span className='nameSpan'>{name}!</span> Let's start the quiz.</h2>
          {currentQuestion < questions.length ? (
            <div>
              <h3 className='question'>
                Question {currentQuestion + 1}: {questions[currentQuestion].question}
              </h3>
              <form onSubmit={handleQuizSubmit}>
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className='options-container'>
                    <label className='label'>
                      <input
                        type="radio"
                        name='option'
                        className='option'
                        value={option}
                        checked={userChoice === option}
                        onChange={(e) => setUserChoice(e.target.value) }
                        required
                      />
                      {option}
                    </label>
                  </div>
                ))}
                <button type="submit" className='startQuizButton' >Submit Answer</button>
              </form>
            </div>
          ) : (
            <div>
              <h3 className='completedText'>Quiz completed! Your score is: {score} / {questions.length}</h3>
              <button className='startQuizButton'
                onClick={() => updatePlayerScores(name, score)}
              >
                Submit Score
              </button>
              <Link to='/'>
              <button className='startQuizButton' type='button'> Back </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DisplayQuestion;