// src/contexts/GlobalStateContext.js
import React, { createContext, useState } from "react";

export const GlobalStateContext = createContext();
export const GlobalStateProvider = ({ children }) => {
  const [stateObj, setStateObj] = useState({});
  const updateStateObj = (newState) => {
    setStateObj((prevState) => ({ ...prevState, ...newState }));
  };
  return (
    <GlobalStateContext.Provider value={{ stateObj, updateStateObj }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
