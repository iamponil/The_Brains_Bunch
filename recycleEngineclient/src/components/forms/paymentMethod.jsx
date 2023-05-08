

import styled from 'styled-components';
import tw from 'twin.macro';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { ReactComponent as SvgDotPatternIcon } from '../../images/dot-pattern.svg';
import axios, { Axios } from 'axios';
import React, { useState, useRef } from "react";
import { render } from "react-dom";
import Card from "react-credit-cards";


import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from 'pages/payment/utils';

import styles from 'pages/payment/styles.css';

import "react-credit-cards/es/styles-compiled.css";
const Content = tw.div`max-w-screen-2xl mx-auto py-20 lg:py-24 `;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-100  text-gray-100 rounded-lg `}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }

  input,
  textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    padding: 8px;

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }

  max-width: 800px; // set a max width for the container

  @media (min-width: 768px) {
    max-width: 900px;
  }
`;
const ImageContainer = styled.div`
  border: 2px dashed gray;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full justify-center sm:w-56 mt-6 py-2 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px text-center  hocus:shadow-xl `;
const buttonStyle = { display: 'revert' };
const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`;

export default function Payment() {
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [issuer, setIssuer] = useState("");
    const [focused, setFocused] = useState("");
    const [formData, setFormData] = useState(null);
    const formRef = useRef(null);
  
    const handleCallback = ({ issuer }, isValid) => {
      if (isValid) {
        setIssuer(issuer);
      }
    };
  
    const handleInputFocus = ({ target }) => {
      setFocused(target.name);
    };
  
    const handleInputChange = ({ target }) => {
      if (target.name === "number") {
        target.value = formatCreditCardNumber(target.value);
        setNumber(target.value);
      } else if (target.name === "expiry") {
        target.value = formatExpirationDate(target.value);
        setExpiry(target.value);
      } else if (target.name === "cvc") {
        target.value = formatCVC(target.value);
        setCvc(target.value);
      } else if (target.name === "name") {
        setName(target.value);
      }
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      const { issuer } = issuer;
      const formData = [...e.target.elements]
        .filter(d => d.name)
        .reduce((acc, d) => {
          acc[d.name] = d.value;
          return acc;
        }, {});
  
      setFormData(formData);
      formRef.current.reset();
    };

  return (
    <div>
      <Content>
          <div key="Payment">
        <div className="App-payment">
         <h1 style={{color:'#a273ff', fontSize:'30px'}}>Payment</h1>
     
<br></br>
<FormContainer ref={formRef} onSubmit={handleSubmit}>   
<Card
  number={number}
  name={name}
  expiry={expiry}
  cvc={cvc}
  focused={focused}
  callback={handleCallback}
/>     
    <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <small>E.g.: 49..., 51..., 36..., 37...</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            
          
              <SubmitButton  >Confirm Payment</SubmitButton>
           
          </FormContainer>
   
        
        </div>
        
      </div>
      </Content>
    </div>
  );
}