import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take upto 10 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBcRPh0_b9l2BLCbj1wntGZU2zDUC9PJbY`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <>
      <div className="bg-white h-screen p-3">
        <form
          onSubmit={generateAnswer}
          className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 py-2"
        >
          <a href="https://github.com/Vishesh-Pandey/chat-ai" target="_blank">
            <h1 className="text-3xl text-center">Chat AI</h1>
          </a>
          <textarea
            required
            className="border rounded w-11/12 my-2 min-h-fit p-3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300"
            disabled={generatingAnswer}
          >
            Generate answer
          </button>
        </form>
        <div className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 my-1">
          <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Interpreter from './Interpreter';
import Navbar from '../component/Navbar';
// import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const isAuthenticated = localStorage.getItem("name") !== null;
    // const navigate = useNavigate(); // Add this line

    return (
        <Router>
            {isAuthenticated && <Navbar />}
            <Routes>
                <Route path="/" element={isAuthenticated ? <Interpreter /> : <Login />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/interpreter"
                    element={isAuthenticated ? <Interpreter /> : <Navigate to="/login" replace />} // Updated this line
                />
            </Routes>
        </Router>
    );
};

export default HomePage;
