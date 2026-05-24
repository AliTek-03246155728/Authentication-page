import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {  const token = localStorage.getItem('token');
      if (!token) { setLoading(false);
        return; }
      authService.getUserProfile()
        .then((data) => setUser(data.user))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    };
    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Invalid credentials' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const data = await authService.register(name, email, password);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };  } };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);  window.location.href = '/login';  };
  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>);};

export const useAuth = () => useContext(AuthContext);