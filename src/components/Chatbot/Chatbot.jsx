import React from 'react'
import { useState, useEffect, useRef } from "react"; 
import { useAuth } from "@clerk/clerk-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


// import { useLocation } from "react-router-dom";
import { Bot, User, Volume2, Copy } from "lucide-react"; 
// import Navbar from "./Navbar"; 
// import BottomNav from "./BottomNav"; 
// import Home from "./Home";
// import Camera from "./Camera";
// import Trade from "./Trade";
// import Profile from "./Profile";
import { useLanguage } from "@/contexts/LanguageContext";
import AppContent from './AppContent';
import { chat } from "../../api/chatbot"



const Chatbot = () => {
  const { getToken } = useAuth();

//   const location = useLocation();
    const { language } = useLanguage();
    console.log(language);
//   const [language, setLanguage] = useState("en-US"); // default English
  const [voices, setVoices] = useState([]);
  const [mic, setMic] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null); 

  useEffect(() => {
  function loadVoices() {
    const synthVoices = window.speechSynthesis.getVoices();
    setVoices(synthVoices);
  }

  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}, []);

  function micHandler() { 
    setMic(!mic); 
  } 

  function generateBotResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    if (msg.includes("hello") || msg.includes("hi")) {
      return "Mere Khet Mein tamatar ki fasal hai aur ismein Kale dhabbe Paye Ja Rahe Hain yah kis chij Ki Bimari Ke Karan hai mujhe iska Ilaaj bataiye";
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
 
  async function handleSend(message) {
    const userMessage = { text: message, sender: "user", timestamp: new Date() }; 
    setMessages((prev) => [...prev, userMessage]);
    const token = await getToken();
    const response = await chat(token,message)
    console.log(response)
    setTimeout(() => { 
      const botMessage = { 
        text: response.reply, 
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

  // Find matching voice for selected language
  const selectedVoice = voices.find((v) => v.lang === language);

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  } else {
    // fallback if exact voice not found
    utterance.lang = language;
  }

  window.speechSynthesis.speak(utterance);
};


  return (
    <>
      {/* <Navbar setLanguage={setLanguage}/> */}

      {/* <Routes> */}
        {/* <Route path="/" element={<Home />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/profile" element={<Profile />} /> */}

        {/* Chatbot route */}
        {/* <Route path="/chatbot" element={ */}
          
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
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>

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

            <AppContent mic={mic} micHandler={micHandler} onSend={handleSend} language={language} />
          
        
      {/* </Routes> */}

      {/* <BottomNav /> */}
    </>
  );
}

export default Chatbot
