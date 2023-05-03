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
import SimpleContactUs from 'components/cards/SingleCol.js';
import TwoColumnWithInput from 'components/hero/CreatProject.js';
import TwoColumnWithInput2 from 'pages/SimpleContactUs.js';
import Basics from 'components/hero/Basics.js';
import Previewproject from 'components/cards/previewProject.js';
import ProjectDetailsS from 'components/cards/ProjectDetails.js';
import Projectbyuser from 'components/cards/PortfolioTwoCardsWithImage.jsx';
import AllProjects from 'components/cards/TabCardGrid.js';
export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/loading" element={<ThankYouPage />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/ProjectCreat" element={<TwoColumnWithInput />} />
          <Route path="/AllProjects" element={<AllProjects />} />
          <Route path="/Projectbyuser" element={<Projectbyuser />} /> 
          <Route path="/project/:id" element={<ProjectDetailsS/>} />
          <Route path="/oo" element={<SimpleContactUs />} />
          <Route path="/basics/:titre" element={<Basics />} />
          <Route path="/" element={<MainLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/previewProject" element={<Previewproject />} />
          <Route
            path="/activationemail/:activation_token"
            element={<ActivationEmail />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
