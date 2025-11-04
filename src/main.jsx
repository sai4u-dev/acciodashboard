import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AppProvider } from './contexts/AppContext.jsx';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UserInfoPage from './pages/UserInfoPage.jsx';


// eslint-disable-next-line react-refresh/only-export-components
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <PrivateRoute>
                <App />
              </PrivateRoute>
            } />
            <Route path="/user/:id" element={
              <PrivateRoute>
                <UserInfoPage />
              </PrivateRoute>
            } />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>,
);