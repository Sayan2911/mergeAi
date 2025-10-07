import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App';
import SignUp from './pages/Auth/SignUp';
import LogIn from './pages/Auth/LogIn';
import { PrivateRoute } from './utils/routeProtect';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><App /></PrivateRoute>}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);