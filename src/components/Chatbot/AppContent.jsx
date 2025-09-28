import React from 'react'
import { useState, useRef } from "react"; 
import { Mic, SendHorizontal } from "lucide-react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";


const AppContent = ({ mic, micHandler, onSend, language }) => {
  const [input, setInput] = useState("");
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const inputRef = useRef(null); // ref for textarea

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

    // Reset textarea height after sending
    if (inputRef.current) {
      inputRef.current.style.height = "40px"; // original height
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) { // allow Shift+Enter for new line
      e.preventDefault();
      handleSendClick();
    }
  }

  function handleMicToggle() {
    if (mic) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true, language });
    }
    micHandler();
  }

  return (
    <div
      className="fixed bottom-14 sm:bottom-18 left-1/2 transform -translate-x-1/2 
      bg-white rounded-3xl shadow-lg w-[95%] sm:w-[90%] md:w-[70%] lg:w-[50%] 
      px-4 py-2 flex flex-row  gap-3 z-50 items-center"
    >
      <Mic
        className={`cursor-pointer w-5 h-5 sm:w-6 sm:h-6 ${mic ? "text-green-500" : "text-gray-600"}`}
        onClick={handleMicToggle}
      />

      <textarea
        ref={inputRef}
        value={input || transcript}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        rows={1}
        className="flex-1 resize-none overflow-hidden p-2 text-sm sm:text-base rounded-3xl 
          focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Type your message..."
        style={{ minHeight: "40px", maxHeight: "150px" }}
        onInput={(e) => {
          e.target.style.height = "auto"; // reset height
          e.target.style.height = `${e.target.scrollHeight}px`; // adjust height
        }}
      />

      <SendHorizontal
        className="cursor-pointer text-black w-5 h-5 sm:w-6 sm:h-6"
        onClick={handleSendClick}
      />
    </div>
  );
}

export default AppContent
