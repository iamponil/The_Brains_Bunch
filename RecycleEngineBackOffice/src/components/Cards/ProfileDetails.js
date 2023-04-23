import React from "react";
import  { useState, useEffect }  from "react";
import profil from "../../assets/img/profileIcon.png";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { useHistory } from "react-router-dom";
import Axios from"axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styles from '../../assets/styles/styles.module.css'
// components

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-teal-500 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-inner focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const Subheading = tw(SubheadingBase)`text-center `;
const Heading = tw(
  SectionHeading
)`mt-4 font-black  text-3xl sm:text-4xl lg:text-5xl text-center  leading-tight`;
const Description = tw.span`text-center  font-black tracking-wide`;
const Link = styled(PrimaryButtonBase)`
  ${tw`inline-block mt-4 text-sm font-semibold`}
`
const TextDesign = tw(SubheadingBase)`text-center text-teal-900 text-2xl `;
export default function Profile({ roundedHeaderButton ,
  submitButtonText = "Modifier Informations", }) {
    //recuperer user du local storage
  const result = JSON.parse(localStorage.getItem('idUser'));
  
   
    const [user, setUser] = useState({
      name: " ",
      email: " ",
      password: " ",
      phone_number: 0,
      image: null,
      role:" ",
    });
  //get user details by id
  useEffect(()=>
  {
    fetch('http://localhost:5000/users/getUserById/'+result.idUser)
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      console.log(data);
      setUser(data);
    }).catch(console.error())
  },[]);
  return (
    <>
   
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16" >
        <div className="px-6">
     
        {user&&
          <div >
          <div className="flex flex-wrap justify-center" >
         <div className="w-full px-4 flex justify-center">
              <div className="relative">
              
                  <img src={user.image || profil} onError={(e) => { e.target.onerror = null; e.target.src = profil }}
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                  alt="user profile picture"
                    loading="lazy"
                        />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className=" justify-center py-4 lg:pt-4 pt-8">
               
              {/* <Subheading>User Details</Subheading> */}
            <Heading> {user.name} </Heading>
            <br></br>
            <TextDesign>Role: {user.role}</TextDesign><br></br>
            <TextDesign>Status: {user.status}</TextDesign><br></br>
            <TextDesign>Email: {user.email}</TextDesign><br></br>
            <TextDesign>Phone Number: {user.phone_number}</TextDesign><br></br>
            {/* <Link  onClick={handleOpen}  >Edit</Link> */}
              </div>
            </div>
          </div>
  
      
          </div>}
         
        </div>
      </div>
    </>
  );
}
