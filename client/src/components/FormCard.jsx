import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [newAnswers, setNewAnswers] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3500/api/questions")
      .then((response) => setQuestions(response.data));
  }, []);

  const handleAddQuestion = () => {
    if (!selectedTag) {
      alert("Please select a tag for your question.");
      return;
    }

    axios
      .post("http://localhost:3500/api/questions", {
        text: newQuestion,
        tag: selectedTag,
      })
      .then(() => {
        setNewQuestion("");
        // setSelectedTag("");
        axios
          .get("http://localhost:3500/api/questions")
          .then((response) => setQuestions(response.data));
      });
  };

  const handleAddAnswer = (questionId) => {
    if (!newAnswers[questionId]) {
      alert("Please enter an answer before submitting.");
      return;
    }

    axios
      .post("http://localhost:3500/api/questions/${questionId}/answers", {
        text: newAnswers[questionId],
      })
      .then(() => {
        setNewAnswers((prevState) => ({ ...prevState, [questionId]: "" }));
        axios
          .get("http://localhost:3500/api/questions")
          .then((response) => setQuestions(response.data));
      });
  };

  const filterQuestionsByTag = (tag) => {
    return questions.filter((question) => !tag || question.tag === tag);
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const filteredQuestions = filterQuestionsByTag(selectedTag);

  return (
    <div className="container mx-auto p-4 h-screen w-screen">
      <h1 className="text-3xl mb-4 text-center">Question Answer Forum</h1>
      <form
        className="mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddQuestion();
        }}
      >
        <label
          htmlFor="question"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Ask a question
        </label>
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="block w-[70%] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ask a question..."
            required
          />
          <div className="relative mx-4">
            {/* <label
              htmlFor="tag"
              className="mb-1 text-sm font-medium text-gray-900"
            >
              Select Tag
            </label> */}
            <select
              id="tag"
              value={selectedTag}
              onChange={handleTagChange}
              className="block w-[110%] p-2 pl-3 pr-5 mr-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">All Tags</option>
              <option value="weather">Weather</option>
              <option value="produce">Produce</option>
              <option value="crops">Crops</option>
              <option value="produce">Pests</option>
              <option value="produce">Policies & Subsidies</option>
              <option value="produce">Yield</option>
            </select>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ml-2"
          >
            Ask
          </button>
        </div>
      </form>
      {filteredQuestions.length > 0 && (
        <div className="grid grid-cols-1 gap-4 w-[75%] p-4">
          {filteredQuestions.map((question) => (
            <div key={question._id} className="bg-gray-100 rounded p-4">
              <div className="mb-2 font-bold text-lg">{question.text}</div>
              {/* <div className="text-blue-600">Tag: {question.tag}</div> */}
              <FormControl>
                {/* <FormLabel>Country</FormLabel> */}
                <Select placeholder="Select answer to view">
                  {question.answers.map((answer, index) => (
                    <option key={index} value={answer.text}>
                      {answer.text}
                    </option>
                  ))}
                </Select>
              </FormControl>
              {/*{question.answers.map((answer, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 p-3 mb-2 rounded"
                >
                  <div className="text-gray-800">{`Answer ${index + 1}: ${
                    answer.text
                  }`}</div>
                </div>
                ))}*/}
              <div className="flex items-center">
                <input
                  type="text"
                  id={`answer-${question._id}`}
                  value={newAnswers[question._id] || ""}
                  onChange={(e) =>
                    setNewAnswers((prevState) => ({
                      ...prevState,
                      [question._id]: e.target.value,
                    }))
                  }
                  className="p-2 border border-gray-300 rounded w-1/2"
                  placeholder="Your answer..."
                />
                <button
                  onClick={() => handleAddAnswer(question._id)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ml-2"
                >
                  Answer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {filteredQuestions.length === 0 && (
        <div className="text-center text-gray-800">No questions found.</div>
      )}
    </div>
  );
};

export default App;