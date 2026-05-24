import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const path = window.location.pathname;
  return (
    <AuthProvider>
      {path === '/dashboard' ? <Dashboard /> : <Login />}
    </AuthProvider>);}

export default App;