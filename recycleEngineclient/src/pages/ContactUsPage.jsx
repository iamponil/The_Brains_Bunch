import React, { useState } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import "./ContactUs.css";
import image from "../images/contactUs.png";
import {Hero} from "../components/hero/BackgroundAsImage.jsx"
import { NavLink } from "react-router-dom";
function ContactUs() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // setName("");
    // setEmail("");
    // setMessage("");
    console.log(name,email,message)
    await axios.post("http://localhost:5000/users/send-email", {
      name,
      email,
      msg: message,
    });
    
  };

  return (<div>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Recycle Engine</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/">Home</NavLink>
          </Nav>
          </Container>
    </Navbar>
    <div className="contact-us-container">
      <div className="contact-us-image-container">
        <img src={image} alt="Contact Us" className="contact-us-image" />
      </div>
      <div className="contact-us-form-container">
        <h1 >Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default ContactUs;
