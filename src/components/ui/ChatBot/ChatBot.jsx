import { useState, useEffect, useRef } from "react"; 
import { Plus, Mic, SendHorizontal } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Bot, User, Volume2, Copy } from "lucide-react"; 
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Navbar from "./Navbar"; 
import BottomNav from "./BottomNav"; 
import Home from "./Home";
import Camera from "./Camera";
import Trade from "./Trade";

import Profile from "./Profile";
const Chatbot = ({ mic, micHandler, onSend }) => {
  const [input, setInput] = useState("");
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <p className="text-center text-red-500 p-4">
        Browser does not support speech recognition.
      </p>
    );
  }

  function handleSendClick() {
    const messageToSend = input.trim() || transcript.trim();
    if (!messageToSend) return;

    onSend(messageToSend);
    setInput("");
    resetTranscript();
    SpeechRecognition.stopListening();
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") handleSendClick();
  }

  function handleMicToggle() {
    if (mic) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
    micHandler();
  }

  return (
    <div
      className="fixed bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 
      bg-white rounded-3xl shadow-lg w-[95%] sm:w-[90%] md:w-[70%] lg:w-[50%] 
      px-4 py-2 flex flex-row items-center gap-3 z-50"
    >
      <Plus className="cursor-pointer text-gray-600 w-5 h-5 sm:w-6 sm:h-6" />

      <Mic
        className={`cursor-pointer w-5 h-5 sm:w-6 sm:h-6 ${
          mic ? "text-red-500" : "text-gray-600"
        }`}
        onClick={handleMicToggle}
      />

      <input
        value={input || transcript}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        type="text"
        className="flex-1 p-2 text-sm sm:text-base rounded-3xl focus:outline-none
          focus:ring-2 focus:ring-green-500"
        placeholder="Type your message..."
      />

      <SendHorizontal
        className="cursor-pointer text-black w-5 h-5 sm:w-6 sm:h-6"
        onClick={handleSendClick}
      />
    </div>
  );
};

function AppContent() {
  const location = useLocation();

  const [mic, setMic] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null); 

  function micHandler() { 
    setMic(!mic); 
  } 

  function generateBotResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    if (msg.includes("hello") || msg.includes("hi")) {
      return "Hello there! Nice to meet you!";
    } else if (msg.includes("how are you")) {
      return "I'm doing great, thank you! How are you?";
    } else if (msg.includes("time")) { 
      return `The current time is ${new Date().toLocaleTimeString()}`;
    } else if (msg.includes("bye")) {
      return "Goodbye! It was nice chatting with you.";
    } else { 
      const responses = [
        "That's interesting! Tell me more.", 
        "I see. What else would you like to discuss?",
        "Thanks for sharing that!", 
        "Good point. What do you think?", 
      ]; 
      return responses[Math.floor(Math.random() * responses.length)];
    } 
  }
 
  function handleSend(message) {
    const userMessage = { text: message, sender: "user", timestamp: new Date() }; 
    setMessages((prev) => [...prev, userMessage]);
    setTimeout(() => { 
      const botMessage = { 
        text: generateBotResponse(message), 
        sender: "bot", 
        timestamp: new Date(),
      }; 
      setMessages((prev) => [...prev, botMessage]); 
    }, 600);
  } 
 
  useEffect(() => { 
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    } 
  }, [messages]);

  const handleSpeakClick = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/profile" element={<Profile />} />

        {/* Chatbot route */}
        <Route path="/chatbot" element={
          <>
            <div className="flex flex-col items-start justify-end gap-3 px-3 sm:px-6 py-20 
              max-w-5xl mx-auto w-full pb-32">
              
              {messages.length === 0 && (
                <p className="text-gray-500 text-lg sm:text-xl text-center mx-auto mt-20"> 
                  👋 Start chatting with me... 
                </p>
              )}
        
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2 w-full ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 
                      bg-green-500 rounded-full flex items-center justify-center">
                      <Bot size={22} className="text-white" />
                    </div>
                  )}

                  <div className="flex flex-col items-start max-w-[80%] sm:max-w-[70%]">
                    <div
                      className={`px-4 py-2 rounded-lg shadow text-sm sm:text-base ${
                        msg.sender === "user"
                          ? "bg-green-500 text-white rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === "user" ? "text-blue-100" : "text-gray-500"
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="flex flex-row gap-2 mt-2">
                      <button>
                        <Volume2
                          onClick={() => handleSpeakClick(msg.text)}
                          size={18}
                          className="text-gray-600 hover:text-black"
                        />
                      </button>
                      <button onClick={() => navigator.clipboard.writeText(msg.text)}>
                        <Copy size={16} className="text-gray-600 hover:text-black" />
                      </button>
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 
                      bg-gray-500 rounded-full flex items-center justify-center">
                      <User size={18} className="text-white" />
                    </div>
                  )}
                </div>
              ))}

              <div ref={chatEndRef}></div>
            </div>

            <Chatbot mic={mic} micHandler={micHandler} onSend={handleSend} />
          </>
        } />
      </Routes>

      <BottomNav />
    </>
  );
}

export default AppContent;
