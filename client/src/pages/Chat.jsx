import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [inputLanguage, setInputLanguage] = useState("en");
  const [outputLanguage, setOutputLanguage] = useState("en");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const userMessage = { text: newMessage, isUser: true };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");

      axios
        .post(
          `http://127.0.0.1:5000/chatbot/${encodeURIComponent(newMessage)}/${inputLanguage}/${outputLanguage}/0`
        )
        .then((response) => {
          const botMessage = { text: response.data.Answer, isUser: false };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
          scrollToBottom();
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleInputLanguageChange = (language) => {
    setInputLanguage(language);
  };

  const handleOutputLanguageChange = (language) => {
    setOutputLanguage(language);
  };

  return (
    <div className="bg-[#F5EEC8]">
      <Navbar />
      <section className="relative py-16 cursor-pointer px-28 rounded-md h-[100vh]">
        <div className="bg-[#F5EEC8] flex flex-col justify-between h-[90vh]">
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.isUser
                      ? "bg-indigo-700 text-white"
                      : "bg-gray-200 text-gray-700"
                  } p-2 rounded-lg max-w-2xl`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-12">
            <div className="flex items-center">
              <input
                type="text"
                className="flex-grow px-2 py-1 border rounded-l-lg focus:outline-none"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className={`${
                  newMessage.trim() !== ""
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-400 text-gray-700"
                } px-4 py-2 rounded-r-lg`}
                onClick={handleSendMessage}
                disabled={newMessage.trim() === ""}
              >
                Send
              </button>
            </div>
            <div className="mt-4">
              <label>Input Language:</label>
              <select
                onChange={(e) => handleInputLanguageChange(e.target.value)}
                value={inputLanguage}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
            <div className="mt-4">
              <label>Output Language:</label>
              <select
                onChange={(e) => handleOutputLanguageChange(e.target.value)}
                value={outputLanguage}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chat;