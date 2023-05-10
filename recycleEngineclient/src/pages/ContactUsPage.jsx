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
   



    <ToastContainer />
    <div className="contact_us_8">
      <div className="responsive-container-block container">
        <form className="form-box" onSubmit={handleSubmit}>
          <div className="container-block form-wrapper">
            <div className="responsive-container-block">
              <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-8 wk-ipadp-12" id="i10mt-9">
                <input
                  className="input"
                  type="text"
                  id="name"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-8 wk-ipadp-12" id="iajvf">
                <input
                  className="input"
                  placeholder="Email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-8 wk-ipadp-12" id="i634i-9">
                <textarea
                  aria-placeholder="What’s on your mind?"
                  placeholder="What’s on your mind?"
                  className="textinput"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-8 wk-ipadp-12 checkbox-container" id="i634i-2-2">
              <div className="checkboc-container">
                <input id="i0m1w" type="checkbox" />
                <p className="checkbox-text" id="i5ywz">
                  I consent to the privacy policy of this application
                </p>
              </div>
            </div>
            <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-8 wk-ipadp-12" id="i0txn-2">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
            <div className="right-side-text">
              <p className="text-blk contactus-head">
                Get in Touch
              </p>
              <p className="text-blk contactus-subhead">
                We'd love to hear from you! Leave a message and we will get in touch with you shortly.

              </p>
              <div className="social-media-links">
                <a href=" https://twitter.com/" id="ix94i-2-3">
                  <img alt="aaa" className="link-img" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png" />
                </a>
                <a href="https://facebook.com/">
                  <img alt="aaa" className="link-img" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png" />
                </a>
                <a href=" https://google.com/">
                  <img alt="aaa" className="link-img" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png" />
                </a>
                <a href=" https://instagram.com/" id="izldf-2-3">
                  <img alt="aaa" className="link-img" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png" />
                </a>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
    <Footer />
     
  </div>
     
  );
}

export default ContactUs;