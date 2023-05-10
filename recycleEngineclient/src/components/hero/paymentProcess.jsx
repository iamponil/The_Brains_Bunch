

import styled from 'styled-components';
import tw from 'twin.macro';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { ReactComponent as SvgDotPatternIcon } from '../../images/dot-pattern.svg';
import axios, { Axios } from 'axios';
import React, { useState, useRef, useEffect } from "react";
import { render } from "react-dom";
import Card from "react-credit-cards";
import { Header } from 'components/headers/profileHeader';
import logo from '../../images/R.png';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from 'pages/payment/utils';

import styles from 'pages/payment/styles.css';
import Footer from 'components/footers/FiveColumnDark';

import "react-credit-cards/es/styles-compiled.css";
const Content = tw.div`max-w-screen-2xl justify-center mx-auto py-20 lg:py-24 flex items-center`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-white text-gray-100 rounded-lg`}
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  form {
    ${tw`mt-4`}
  }

  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }

  input,
  textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-black hocus:border-pink-400 focus:outline-none transition duration-200`};

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
const PaymentContainer = tw.div`flex flex-col sm:flex-row justify-between`;
const Payment = tw.div`sm:w-5/12 flex flex-col`;
const Reward = tw.div`sm:w-5/12 flex flex-col items-center`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm text-black`;
const InputContainer = tw.div`relative py-5 mt-6 mb-4`;
const Input = tw.input`mb-2 border rounded-lg px-3 py-2 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;

const RewardImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full justify-center sm:w-56 mt-6 py-2 bg-gray-100 text-black rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px text-center  hocus:shadow-xl text-center`;

const ButtonContainer = tw.div`flex justify-center`;

const buttonStyle = { display: 'revert' };
const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`;

export default function PaymentProcess({roundedHeaderButton}) {
    const searchParams = new URLSearchParams(window.location.search);
  const amount = searchParams.get('data');
  const amountValue = JSON.parse(amount);
  const idprojectt = searchParams.get('idproject');
  const id_project = JSON.parse(idprojectt);
  const [cardId,setCardId]=useState('');
    const [balance,setBalance]=useState(0);
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    // const [issuer, setIssuer] = useState("");
    const [focused, setFocused] = useState("");
    const [error, setErrors] = useState(null);
    const [formData, setFormData] = useState({
      number:'',
      name:'',
      exp_month:'',
      exp_year:'',
      expiry:"",
      cvc:'',
    });
    const RewardLabel = ({ title, name }) => (
        <InputContainer>
          <Label>{title}</Label>
         
        </InputContainer>
      );
    const formRef = useRef(null);

    const hundelchange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });}
  
  
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
    setFormData(prevState => ({ ...prevState, [target.name]: target.value }));
  } else if (target.name === "cvc") {
    target.value = formatCVC(target.value);
    setCvc(target.value);
  } else if (target.name === "name") {
    setName(target.value);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  hundelchange({ target }); // add this line to update the formData state
};

useEffect(() => {
  
    const fetchUserAddress = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/projects/getUserCard',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );
        const card = response.data.card;
        console.log(response.data);
        if (card) {
            setBalance(card.balance);
            setCardId(card.id);
          setFormData({
            name: card.name,
            expiry: response.data.expiry,
            number: card.number,
           cvc : card.cvc,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserAddress();
  }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();
     
      const  initialBalance  = balance;
      const card = cardId;
      const formDataToSend = {
        initialBalance,
        card,
        id_project,
      };
      console.log(formDataToSend);
     
//ADD Paiement
  try {
    const response = await fetch(`http://localhost:5000/projects/makeDonation`, {
    method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            withCredentials:"true",
          },
          body: JSON.stringify(formDataToSend),
        });
   
    alert("Informations enregistrées avec succès !");
    } catch (error) {
    console.log(error);
    // setErrors(error.response.data.msg);
    alert("Échec d'enregistrement");
  }}
  return (
    <div>
        <Header roundedHeaderButton={roundedHeaderButton} />
    <Content>
        <div key="Payment">
      <div className="App-payment">
       <h1 style={{color:'#000000', fontSize:'30px'}}>Payment</h1>
   
<br></br>
<FormContainer ref={formRef}>  
<TwoColumn>
    <PaymentContainer>
    <Reward>
    <RewardImage>
      <img src={logo} alt="reward" />
    </RewardImage>
    <RewardLabel title="Reward Value" name="reward_value" />
   <p style={{color:"#000000"}}>{amountValue}</p> 
  </Reward>
      <Payment> 
<Card
number={formData.number}
name={formData.name}
expiry={formData.expiry}
cvc={formData.cvc}
focused={focused}
// callback={handleCallback}
/>     
  <div className="form-group">
            <input
              type="tel"
              name="number"
             
              value={formData.number}
              className="form-control"
              placeholder="Card Number"
              pattern="[\d| ]{16,22}"
              required
            
              onChange={(e) => {
                handleInputChange(e);
                hundelchange(e);
              }}
              onFocus={handleInputFocus}
            />
            <small>E.g.: 49..., 51..., 36..., 37...</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              className="form-control"
              placeholder="Name"
              required
              onChange={(e) => {
                handleInputChange(e);
                hundelchange(e);
              }}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="tel"
                name="expiry"
                value={formData.expiry}
                className="form-control"
                placeholder="Valid Thru"
                required
                onChange={(e) => {
                  handleInputChange(e);
                  hundelchange(e);
                }}
                onFocus={handleInputFocus}
              />
              
            </div>
            <div className="col-6">
              <input
                type="tel"
                name="cvc"
                value={formData.cvc}
                className="form-control"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                onChange={(e) => {
                  handleInputChange(e);
                  hundelchange(e);
                }}
                onFocus={handleInputFocus}
              />
            </div>
            <ButtonContainer>

<SubmitButton  type="submit" className="text-center" onClick={handleSubmit} >Pay Now!</SubmitButton>
</ButtonContainer>
          </div>
          {/* <input type="hidden" name="issuer" value={issuer} /> */}
          </Payment>
 
    </PaymentContainer>
         
            </TwoColumn>

        </FormContainer>
 
      
      </div>
      
    </div>
    </Content>
<Footer/>    
  </div>
  )
}
