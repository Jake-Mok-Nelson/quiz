import React, { useState } from "react";
import "./Quiz.css";

const Quiz = ({ quizQuestions, onReset}) => {
  const [questions] = useState(quizQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState("");

  if (!quizQuestions || quizQuestions.length === 0) {
    return <div>Quiz data is not available.</div>;
  }

  const handleAnswer = (answerIndex) => {
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    } else {
      setShowExplanation(true);
      setExplanation(questions[currentQuestion].explanation);
      return;
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz">
    {showScore ? (
    <div className="score-section">
        You scored {score} out of {questions.length}
        <br />
        <button onClick={onReset}>Home</button>
    </div>
    ) : showExplanation ? (
        <div className="explanation-section">
          <div className="explanation-text">{explanation}</div>
          <button onClick={handleNextQuestion}>
            {currentQuestion + 1 < questions.length ? "Next Question" : "Show Score"}
          </button>
        </div>
      ) : (
        <div>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
              {questions[currentQuestion].imageURL && (
                <div className="question-image">
                  <img src={questions[currentQuestion].imageURL} alt="Question" />
                </div>
              )}
            <div className="question-text">
              {questions[currentQuestion]?.question}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
