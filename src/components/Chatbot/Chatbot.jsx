import React, { useState, useRef, useEffect } from "react"; 
import { useAuth } from "@clerk/clerk-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User, Mic, SendHorizontal, Volume2, Copy } from "lucide-react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { chat } from "../../api/chatbot";
import { useLanguage } from "@/contexts/LanguageContext";

const Chatbot = () => {
  const { getToken } = useAuth();
  const { language } = useLanguage();

  const [messages, setMessages] = useState([]);
  const [mic, setMic] = useState(false);
  const [voices, setVoices] = useState([]);
  const [input, setInput] = useState("");

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Load voices for TTS
  useEffect(() => {
    function loadVoices() {
      const synthVoices = window.speechSynthesis.getVoices();
      setVoices(synthVoices);
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!browserSupportsSpeechRecognition) {
    return <p className="text-center text-red-500 p-4">Browser does not support speech recognition.</p>;
  }

  const micHandler = () => {
    setMic(!mic);
    if (!mic) SpeechRecognition.startListening({ continuous: true, language });
    else SpeechRecognition.stopListening();
  };

  const handleSendClick = async () => {
    const messageToSend = input.trim() || transcript.trim();
    if (!messageToSend) return;

    const userMessage = { text: messageToSend, sender: "user", timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);

    setInput("");
    resetTranscript();
    if (inputRef.current) inputRef.current.style.height = "40px";

    const token = await getToken();
    const response = await chat(token, messageToSend);

    setTimeout(() => {
      const botMessage = { text: response.reply, sender: "bot", timestamp: new Date() };
      setMessages(prev => [...prev, botMessage]);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  const handleSpeakClick = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices.find(v => v.lang === language);
    if (selectedVoice) utterance.voice = selectedVoice;
    else utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      {/* Chat Messages */}
      <div className="flex flex-col items-start justify-end gap-3 px-3 sm:px-6 py-20 max-w-5xl mx-auto w-full pb-32">
        {messages.length === 0 && (
          <p className="text-gray-500 text-lg sm:text-xl text-center mx-auto mt-20">👋 Start chatting with me...</p>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Bot size={22} className="text-white" />
              </div>
            )}

            <div className="flex flex-col items-start max-w-[80%] sm:max-w-[70%]">
              <div className={`px-4 py-2 rounded-lg shadow text-sm sm:text-base ${msg.sender === "user" ? "bg-green-500 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none"}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>

              <div className="flex flex-row gap-2 mt-2">
                <button><Volume2 onClick={() => handleSpeakClick(msg.text)} size={18} className="text-gray-600 hover:text-black" /></button>
                <button onClick={() => navigator.clipboard.writeText(msg.text)}><Copy size={16} className="text-gray-600 hover:text-black" /></button>
              </div>
            </div>

            {msg.sender === "user" && (
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gray-500 rounded-full flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
            )}
          </div>
        ))}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input Box + Mic + Send */}
      <div className="fixed bottom-16 sm:bottom-18 left-1/2 transform -translate-x-1/2 bg-white rounded-3xl shadow-lg w-[95%] sm:w-[90%] md:w-[70%] lg:w-[50%] px-4 py-2 flex flex-row gap-3 z-0 items-center">
        <Mic className={`cursor-pointer w-5 h-5 sm:w-6 sm:h-6 ${mic ? "text-green-500" : "text-gray-600"}`} onClick={micHandler} />

        <textarea
          ref={inputRef}
          value={input || transcript}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={1}
          placeholder="Type your message..."
          className="flex-1 resize-none overflow-hidden p-2 text-sm sm:text-base rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-500"
          style={{ minHeight: "40px", maxHeight: "150px" }}
          onInput={(e) => { e.target.style.height = "auto"; e.target.style.height = `${e.target.scrollHeight}px`; }}
        />

        <SendHorizontal className="cursor-pointer text-black w-5 h-5 sm:w-6 sm:h-6" onClick={handleSendClick} />
      </div>
    </div>
  );
};

export default Chatbot;
