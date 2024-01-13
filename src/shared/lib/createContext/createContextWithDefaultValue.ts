import React from "react";

export const createContextWithDefaultValue = <T>(defaultValue: T) => {
    const context = React.createContext<T>(defaultValue);
    const useContext = () => React.useContext(context);
  
    return { ...context, useContext };
  };