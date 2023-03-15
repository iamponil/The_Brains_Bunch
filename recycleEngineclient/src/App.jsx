import 'tailwindcss/dist/base.css';
import 'styles/globalStyles.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import { MainLandingPage } from './MainLandingPage.jsx';

import { ThankYouPage } from 'ThankYouPage';
import ForgetPassword from './pages/ForgetPassword';
import Register from './pages/register';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/g" element={<ThankYouPage />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/" element={<MainLandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
