import 'tailwindcss/dist/base.css';
import 'styles/globalStyles.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { MainLandingPage } from './MainLandingPage';
import Navbar from './components/Navbar';
import { css } from 'styled-components/macro'; //eslint-disable-line

import LoginPage from 'pages/Login.js';
import axios from 'axios';
import Register from 'pages/register';
import Signup from 'pages/Signup';
import { ThankYouPage } from 'ThankYouPage';

export default function App() {
  //const [user, setUser] = useState(null);

  // const getUser = async () => {
  //   try {
  //     const url = `http://localhost:5000/auth/login/success`;
  //     const { data } = await axios.get(url, { withCredentials: true });
  //     console.log(data.user);
  //     setUser(data.user._json);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  //   console.log(getUser());
  // }, []);
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/g" element={<ThankYouPage />} />
          <Route path="/" element={<MainLandingPage />} />
          <Route
            path="/login"
            element={/*user ? <Navigate to="/" /> :*/ <Login />}
          />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
