import 'tailwindcss/dist/base.css';
import 'styles/globalStyles.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import { MainLandingPage } from './MainLandingPage.jsx';

import { ThankYouPage } from 'ThankYouPage';
import ForgetPassword from './pages/ForgetPassword';
import Register from './pages/register';
import ActivationEmail from 'pages/ActivationEmail.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/loading" element={<ThankYouPage />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/" element={<MainLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/activationemail/:activation_token"
            element={<ActivationEmail />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
