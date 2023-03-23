import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import quizData from "./quizData.json";
import quotes from "./quotes.json"
import "./QuizList.css";

const QuizList = () => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [randomQuote, setRandomQuote] = useState(null);

    const handleQuizSelection = (quizIndex) => {
        setSelectedQuiz(quizData[0].quizzes[quizIndex]);
    };

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuote(quotes[randomIndex]);
      };
      
      useEffect(() => {
        getRandomQuote();
      }, []);

      return (
        <div className="quiz-list">
          {selectedQuiz ? (
            <Quiz quizQuestions={selectedQuiz.questions} onReset={handleQuizSelection} />
          ) : (
            <div>
                <div className="quote-container">
                <p className="quote-text">"{randomQuote && randomQuote.quote}"</p>
                <p className="quote-author">- {randomQuote && randomQuote.author}</p>
              </div>
              <h2>Select a Quiz:</h2>
              <div className="quiz-cards">
                {quizData[0].quizzes.map((quiz, index) => (
                <div key={index} className="quiz-card" onClick={() => handleQuizSelection(index)}>
                    <img src={quiz.imageURL} alt={quiz.title} />
                    <h3>{quiz.title}</h3>
                </div>
                ))}
            </div>
            
            </div>
        )}
        </div>
    );
};

export default QuizList;
