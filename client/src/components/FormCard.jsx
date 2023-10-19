import React, { useState, useEffect } from "react";
import axios from "axios";

const QnAComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3500/questions")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async (questionId) => {
    try {
      if (answers[questionId]) {
        const response = await axios.post(
          `http://localhost:3500/answers/${questionId}`,
          {
            answer: answers[questionId],
          }
        );

        setQuestions((prevQuestions) => {
          return prevQuestions.map((q) => {
            if (q.id === questionId) {
              return { ...q, answer: response.data.answer };
            }
            return q;
          });
        });
      }
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() !== "") {
      axios
        .post("http://localhost:3500/questions", { question: newQuestion })
        .then((response) => {
          setQuestions([...questions, response.data]);
          setNewQuestion("");
        })
        .catch((error) => {
          console.error("Error adding question:", error);
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 border border-gray-300 rounded p-4">
        <h3 className="text-xl font-bold mb-2">Add a New Question</h3>
        <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg">
          <input
            type="text"
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <button
            type="button"
            className="inline-flex justify-center px-3 py-2 text-white rounded-xl cursor-pointer
            bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-5"
            onClick={handleAddQuestion}
          >
            Submit
          </button>
        </div>
      </div>
      {questions.map((q) => (
        <div key={q.id} className="mb-4 border border-gray-300 rounded p-4">
          <h3 className="text-xl font-bold mb-2">{q.question}</h3>
          <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg">
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <textarea
              id={`answer-${q.id}`}
              rows="1"
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your message..."
              value={answers[q.id] || ""}
              onChange={(e) => handleAnswer(q.id, e.target.value)}
            />
            <button
              type="button"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100"
              onClick={() => handleSubmit(q.id)}
            >
              <svg
                className="w-6 h-6 rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
          {q.answer && (
            <div className="mt-2 p-2 rounded border bg-blue-50 text-blue-800">
              <strong>Your Answer:</strong> {q.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QnAComponent;
