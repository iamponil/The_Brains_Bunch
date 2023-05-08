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
import ProjectMenu from 'components/cards/ProjectMenu.js';
import Projects from 'components/cards/Projects.js';
import CreatProject from 'components/hero/CreatProject.js';
import Basics from 'components/hero/Basics.js';
// import Previewproject from 'components/cards/previewProject.js';
import ProjectDetailsS from 'components/cards/ProjectDetails.js';
import Projectbyuser from 'components/cards/MyProjects.jsx';
import AllProjects from 'components/cards/AllProjects.js';
import EditProfile from 'pages/editprofile/editProfile.jsx';
import InformationForm from 'components/forms/editInformations.jsx';
import AddressForm from 'components/forms/editAddress.jsx';
import PaymentForm from 'components/forms/paymentMethod.jsx';
import CredentialsForm from 'components/forms/editCredentials.jsx';
import ContactUs from 'pages/ContactUsPage.jsx';
import Story from 'pages/story.js';
export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/loading" element={<ThankYouPage />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/ProjectCreat" element={<CreatProject />} />
          <Route path="/AllProjects" element={<AllProjects />} />
          <Route path="/Projectbyuser" element={<Projectbyuser />} /> 
          <Route path="/project/:id" element={<ProjectDetailsS/>} />
          <Route path="/projectMenu" element={<ProjectMenu />} />
          <Route path="/basics/:titre" element={<Basics />} />
          <Route path="/projectss" element={<Projects />} />
          <Route path="/story" element={<Story />} />
          <Route path="/" element={<MainLandingPage />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/previewProject" element={<Previewproject />} /> */}
          <Route path="/editProfile" element={<EditProfile />}>
            <Route path="editInformation" element={<InformationForm />} />
            <Route path="editAddress" element={<AddressForm />} />
            <Route path="payment" element={<AddressForm />} />
            <Route path="" element={<CredentialsForm />} />
          </Route>
          <Route path="/ContactUs" element={<ContactUs/>} />

          <Route
            path="/activationemail/:activation_token"
            element={<ActivationEmail />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
