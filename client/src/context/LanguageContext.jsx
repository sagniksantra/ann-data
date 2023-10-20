// LanguageContext.js
import React, { createContext, useState, useContext } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("english");

  const toggleLanguage = () => {
    setCurrentLanguage((prevLanguage) =>
      prevLanguage === "english" ? "hindi" : "english"
    );
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
