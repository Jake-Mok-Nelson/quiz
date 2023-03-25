import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Quiz from './Quiz';


test("test_incorrect_answer_selected", () => {
  const quizQuestions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correctAnswer: 1,
      explanation: "Paris is the capital of France.",
    },
    {
      question: "What is the largest country in the world?",
      options: ["Russia", "Canada", "China", "USA"],
      correctAnswer: 0,
      explanation: "Russia is the largest country in the world.",
    },
  ];
  const onReset = jest.fn();
  const { getByText } = render(<Quiz quizQuestions={quizQuestions} onReset={onReset} />);
  fireEvent.click(getByText("London"));
  expect(getByText("Paris is the capital of France.")).toBeInTheDocument();
  expect(getByText("Next Question")).toBeInTheDocument();
  fireEvent.click(getByText("Next Question"));
  fireEvent.click(getByText("Russia"));
  expect(getByText("You scored 1 out of 2")).toBeInTheDocument();
  expect(getByText("Home")).toBeInTheDocument();
});


test("test_all_questions_answered", () => {
  const quizQuestions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correctAnswer: 1,
      explanation: "Paris is the capital of France.",
    },
    {
      question: "What is the largest country in the world?",
      options: ["Russia", "Canada", "China", "USA"],
      correctAnswer: 0,
      explanation: "Russia is the largest country in the world.",
    },
  ];
  const onReset = jest.fn();
  const { getByText } = render(<Quiz quizQuestions={quizQuestions} onReset={onReset} />);
  fireEvent.click(getByText("Paris"));
  fireEvent.click(getByText("Russia"));
  expect(getByText("You scored 2 out of 2")).toBeInTheDocument();
  expect(getByText("Home")).toBeInTheDocument();
});

test("test_quiz_data_not_available", () => {
  const quizQuestions = [];
  const onReset = jest.fn();
  const { getByText } = render(<Quiz quizQuestions={quizQuestions} onReset={onReset} />);
  expect(getByText("Quiz data is not available.")).toBeInTheDocument();
});

test("test_last_question_incorrect_answer", () => {
  const quizQuestions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correctAnswer: 1,
      explanation: "Paris is the capital of France.",
    },
    {
      question: "What is the largest country in the world?",
      options: ["Russia", "Canada", "China", "USA"],
      correctAnswer: 0,
      explanation: "Russia is the largest country in the world.",
    },
  ];
  const onReset = jest.fn();
  const { getByText } = render(<Quiz quizQuestions={quizQuestions} onReset={onReset} />);
  fireEvent.click(getByText("Paris"));
  fireEvent.click(getByText("Canada"));
  expect(getByText("Russia is the largest country in the world.")).toBeInTheDocument();
  expect(getByText("Show Score")).toBeInTheDocument();
  fireEvent.click(getByText("Show Score"));
  expect(getByText("You scored 1 out of 2")).toBeInTheDocument();
  expect(getByText("Home")).toBeInTheDocument();
});

test("test_image_question", () => {
  const quizQuestions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correctAnswer: 1,
      explanation: "Paris is the capital of France.",
      imageURL: "https://www.example.com/image.jpg",
    },
  ];
  const onReset = jest.fn();
  const { getByAltText } = render(<Quiz quizQuestions={quizQuestions} onReset={onReset} />);
  expect(getByAltText("Question")).toBeInTheDocument();
});
