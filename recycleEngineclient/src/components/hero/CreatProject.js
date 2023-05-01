import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Form } from 'react-bootstrap';
//eslint-disable-next-line
import { css } from "styled-components/macro";
import Axios from"axios";
import Header from "components/headers/light";

import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-1.svg";
import DesignIllustration from "images/design-illustration-2.svg";
import preview from "images/img_402470.png";
import { Row } from "react-bootstrap";
import fleche from 'images/OIP-removebg-preview.png';
import SimpleContactUs from "pages/SimpleContactUs";
const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  select {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300 `}
  }
  
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

const CustomersLogoStrip = styled.div`
  ${tw`mt-12 lg:mt-20`}
  p {
    ${tw`uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500`}
  }
  img {
    ${tw`mt-4 w-full lg:pr-16 xl:pr-32 opacity-50`}
  }
`;
export default ({ roundedHeaderButton  }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitted2, setFormSubmitted2] = useState(true);
  const [Title, setTitle] = useState("");
  const [error, setErrors] = useState(null);
  const searchParams = new URLSearchParams(window.location.search);
  const dataParam = searchParams.get('data');
  console.log(dataParam);
  const user = JSON.parse(dataParam);
  console.log(user);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: ''
  });
 
  const {title, location , category}=formData;
  const hundelchange = (e) =>{
  setFormData({ ...formData, [e.target.name]: e.target.value });}


   const handlepp = (e) => {
    e.preventDefault();
    if (selectedValue !== undefined ) {
      setFormSubmitted(true);
      setFormSubmitted2(false);
      console.log(selectedValue)
   };
   }

   const onsubmit = (e) => {
    e.preventDefault();
    Send(formData);
  };

 //ADD project
 const Send = async (project) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const res = await Axios.post(`http://localhost:5000/projects/addProject`,{...project },{ headers });
    console.log(selectedValue,selectedCountry,Title)
    alert("Informations enregistrées avec succès !");
    window.location.href = `/oo?data=${JSON.stringify(selectedValue)}&username=${JSON.stringify(user)}&titre=${JSON.stringify(Title)} `;
  } catch (error) {
    console.log(error);
    setErrors(error.response.data.msg);
    alert("Échec d'enregistrement");
  }}

  const handleChange = (e) => {
    const newcategory=e.target.value;
     setSelectedValue(newcategory);
 
  };
  const handleChangecountry = (e) => {
  const newLocation=e.target.value;
  setSelectedCountry(newLocation);
 
  };
 
  const handleChangetitle = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };
 
  return (
    <>
      <Header roundedHeaderButton={roundedHeaderButton} />
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>
            Bring your creative project <span tw="text-primary-500">to life .</span>
            </Heading>
            <br></br>
            <Heading tw="font-bold text-gray-500">
            First, let’s get you set up.
            </Heading>
            
           
            <Form  onSubmit={(e) => onsubmit(e)}>
       {formSubmitted2 && (
               <div >
            <Paragraph>
            <span tw="text-primary-500 ">Select a  category for your new project : </span>
            </Paragraph>
             
            <select name="category"
                      value={category}
                      onChange={(e) => {
                        handleChange(e);
                        hundelchange(e);
                      }}
                    tw="sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500">
          
        	<option value="Paper & Cardboard"> Paper & Cardboard</option>
    		<option value="Plastic ">Plastic </option>
    		<option value="Metals">Metals</option>
    		<option value="Electronic waste">Electronic waste</option>
        <option value="organic waste">organic waste </option>
        <option value=" Textiles"> Textiles</option>
        <option value="Tires"> Tires </option>
   		</select>

       
       <p tw="uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500">
      You chose {selectedValue}
    </p>
    
  
    
           <div style={{ display: !selectedValue && 'none' }}>

              <br></br>
                      <span tw="text-primary-500 ">Write a clear, brief title  to help people quickly understand your project: </span>
                   <br></br>  
                    <br></br> 
                   <Actions>  
                    <input placeholder="Enter your project title" tw="sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500"  required value={title}  onChange={(e) => {
                        handleChangetitle(e);
                        hundelchange(e);
                      }} name="title"/>
                    <button disabled={!selectedValue} onClick={handlepp}>Next: Location  </button>  
                    </Actions> 
                  
              </div>
     </div> 
      )} 
      {formSubmitted && ( 
          <div style={{ display: !selectedValue && 'none' }}> 
             <Paragraph>
            <span tw="text-primary-500 ">Last one—set a location for your project </span>
            </Paragraph>
            <Actions>
           
            <select value={location}   onChange={(e) => {
                        handleChangecountry(e);
                        hundelchange(e);
                      }} name="location" >
              <option >Select your country</option>
              <option value="Algeria  ">Algeria </option>
              <option value="Angola">Angola</option>
              <option value=" Benin">Benin</option>
              <option value=" Cameroon">Cameroon</option>
              <option value=" Libya">Libya</option>
              <option value="Tunisia">Tunisia</option>

              <option value="Gambia   ">Gambia  </option>
              <option value="Ghana">Ghana</option>
              <option value=" Kenya">Kenya</option>
              <option value=" Morocco">Morocco</option>
              <option value=" Mozambique">Mozambique</option>
              <option value="Niger">Niger</option>
           
              <option value="Senegal  ">Senegal </option>
              <option value="South Africa">South Africa</option>
              <option value=" Sudan">Sudan</option>
              <option value=" Togo">Togo</option>
              <option value=" Uganda ">Uganda </option>
              <option value="Zambia ">Zambia </option>
            </select>
           <button type="submit" disabled={!selectedCountry}>Continue </button>  
            </Actions>
            <p tw="uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500">
     You chose {selectedCountry} 
    </p>
           </div> 
         )} 
          </Form> 
         
    
           </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img tw="min-w-0 w-full max-w-lg xl:max-w-3xl" src={DesignIllustration} alt="Design Illustration" />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
      {/* <div style={{ display: !SimpleCont && 'none' }}>
      <SimpleContactUs selectedValue={selectedValue}  selectedCountry={selectedCountry} title={title} ></SimpleContactUs> 
      </div> */}
    </>
  );
};

