import React, { createContext, useReducer } from "react";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  currentUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "SET_AUTHORIZED":
      return { ...state, isLoggedIn: true, currentUser: action.payload };
    case "SET_UNAUTHORIZED":
      return { ...state, isLoggedIn: false };
    case "LOGOUT":
      return {
        ...initialState,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};
