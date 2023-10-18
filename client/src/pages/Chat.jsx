import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";


const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState("");

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
        .post("http://127.0.0.1:5000/chatbot/" + encodeURIComponent(newMessage))
        .then((response) => {
          const botMessage = { text: response.data.Answer, isUser: false };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
          scrollToBottom(); // Scroll to the latest message after it's added
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
    <Navbar />
      <div className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 h-screen flex flex-col">
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
                } p-2 rounded-lg max-w-md`}
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
        </div>
      </div>
    </>
  );
};

export default Chat;
