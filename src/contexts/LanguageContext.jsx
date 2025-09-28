import React, { createContext, useContext, useState } from "react";

// Context create kiya
const LanguageContext = createContext();

// Custom hook banaya taaki direct use kar sake
export const useLanguage = () => useContext(LanguageContext);

// Provider component
export const LanguageProvider = ({ children }) => {
  // Default language "en" rakha (English)
  const [language, setLanguage] = useState("en-US");

  // Language change karne ka function
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};