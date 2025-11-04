import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const MOCK_ADMIN = {
  username: "admin",
  password: "admin@1234",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const signIn = (username, password) => {
    setError("");
    if (username === MOCK_ADMIN.username && password === MOCK_ADMIN.password) {
      setUser({ username: "Admin User" });
      return true;
    } else {
      setError("Invalid username or password.");
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
  };

  const contextValue = {
    user,
    error,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
