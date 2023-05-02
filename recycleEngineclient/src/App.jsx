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
import SimpleContactUs from 'pages/SimpleContactUs.js';
import TwoColumnWithInput from 'components/hero/CreatProject.js';
import Basics from 'components/hero/Basics.js';
import Previewproject from 'components/cards/previewProject.js';
import EditProfile from 'pages/editprofile/editProfile.jsx';
import InformationForm from 'components/forms/editInformations.jsx';
import AddressForm from 'components/forms/editAddress.jsx';
import PaymentForm from 'components/forms/paymentMethod.jsx';
import CredentialsForm from 'components/forms/editCredentials.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/loading" element={<ThankYouPage />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/ProjectCreat" element={<TwoColumnWithInput />} />
          <Route path="/oo" element={<SimpleContactUs />} />
          <Route path="/basics" element={<Basics />} />
          <Route path="/" element={<MainLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editProfile" element={<EditProfile />}>
            <Route path="editInformation" element={<InformationForm />} />
            <Route path="editAddress" element={<AddressForm />} />
            <Route path="payment" element={<AddressForm />} />
            <Route path="" element={<AddressForm />} />
          </Route>

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
