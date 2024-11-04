// File: src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for remembered user on initial load
    const rememberedUser = localStorage.getItem('rememberedUser');
    const sessionUser = sessionStorage.getItem('sessionUser');
    
    if (rememberedUser) {
      setUser(JSON.parse(rememberedUser));
    } else if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
    
    setLoading(false);
  }, []);

  const login = (userData, remember = false) => {
    setUser(userData);
    
    // Store user data based on remember preference
    if (remember) {
      localStorage.setItem('rememberedUser', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('sessionUser', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    // Clear both storages on logout
    localStorage.removeItem('rememberedUser');
    sessionStorage.removeItem('sessionUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);