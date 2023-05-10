import React, { useState } from "react";
import axios from "axios";
import Footer from 'components/footers/FiveColumnDark';
import logo from 'images/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ContactUs.css";
import { Header } from 'components/headers/profileHeader';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
function ContactUs() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   // setName("");
  //   // setEmail("");
  //   // setMessage("");
  //   console.log(name,email,message)
  //   await axios.post("http://localhost:5000/users/send-email", {
  //     name,
  //     email,
  //     msg: message,
  //   });

  // };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/users/send-email", {
        name,
        email,
        msg: message,
      });
      console.log(response.status)

      if (response.status === 200) {
        // show success toast
        toast.success("Email sent successfully!");
      } else {
        // show error toast
        toast.success('Failed to send email. Please try again later.');
      }
    } catch (error) {
      console.error(error);



    }
  };
  return (<div>
    
    <Header/>
   



    <iframe title="engine" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=783fb4a8-14aa-410c-8a25-0fc6a4e4b247&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&filterPaneEnabled=false&navContentPaneEnabled=false"  frameborder="0" allowFullScreen="true"></iframe>

    <Footer />
     
  </div>
     
  );
}

export default ContactUs;