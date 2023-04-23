import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import {ReactComponent as SvgDotPatternIcon} from "images/dot-pattern.svg"
import { Form, Navbar } from 'react-bootstrap';
import preview from "images/img_402470.png";
import Header from "components/headers/light";
import {
  BsEye,
  BsEyeFill
} from 'react-icons/bs';
import { black } from "tailwindcss/colors";
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;
const Heading = tw.h1`font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`font-bold text-2xl md:text-3xl lg:text-4xl xl:text-3xl text-gray-900 leading-tight`;



const TwoColumn = tw.div`flex flex-col sm:flex-row`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div` `;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full justify-center sm:w-64 mt-6 py-3 bg-gray-500 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`
const SvgDotPattern2 = tw(SvgDotPatternIcon)`absolute top-0 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-40`
const SvgDotPattern3 = tw(SvgDotPatternIcon)`absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`
const SvgDotPattern4 = tw(SvgDotPatternIcon)`absolute bottom-0 left-0 transform -translate-x-20 rotate-45 -translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`

export default function SimpleContactUs({ roundedHeaderButton  }) {
  const searchParams = new URLSearchParams(window.location.search);
  const dataParam = searchParams.get('data');
  console.log(dataParam);
  const usernameParam = searchParams.get('username');
console.log(usernameParam);
  const selectedValue = JSON.parse(dataParam);
  console.log(selectedValue)

  const handlepreview = (e) => {
    e.preventDefault();
    window.location.href = `/previewProject?data=${JSON.stringify(selectedValue)}&username=${JSON.stringify(usernameParam)}`;
   }
  return (
    
    <>
    <Header roundedHeaderButton={roundedHeaderButton} />
    <Container>
      <Content>
     
        <FormContainer style={{marginLeft:64 }}>
        
          
              <TwoColumn>
                <Column>
                <InputContainer style={{marginLeft:64 }}>
                <Heading>
           Recycling {selectedValue} <span tw="text-gray-500">Project </span>
            </Heading>
            <br></br>
            <Paragraph tw="font-bold text-gray-500">
            By {usernameParam} 
            </Paragraph>
            <br></br>
          <div style={{ display: 'flex'  }} ><button  style={{ backgroundColor: '#7767ae' }}onClick={handlepreview} >  <BsEyeFill/> </button></div> 

            <br></br>
            <br></br>
             <SubmitButton  >Delete this project </SubmitButton> 
             </InputContainer>
                </Column>
                <Column>
                  <InputContainer style={{marginLeft:64 }} >

                    
          <Navbar bg="dark" variant="dark" tw="rounded-full ">
        <Container>
          <Navbar.Brand href="/basics"  tw="text-gray-100 font-bold  sm:my-2 rounded-full py-4 flex justify-center">
            
           Basics
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br></br>
      <Navbar bg="dark" variant="dark" tw="rounded-full">
        <Container>
          <Navbar.Brand href="#home"tw="text-gray-100 font-bold  sm:my-2 rounded-full py-4 flex justify-center">
            
          Rewards
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br></br>
      <Navbar bg="dark" variant="dark" tw="rounded-full">
        <Container>
          <Navbar.Brand href="#home"tw="text-gray-100 font-bold  sm:my-2 rounded-full py-4 flex justify-center">
           Funding
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br></br>
      <Navbar bg="dark" variant="dark" tw="rounded-full">
        <Container>
          <Navbar.Brand href="#home" tw="text-gray-100 font-bold  sm:my-2 rounded-full py-4 flex justify-center">
            Story
          </Navbar.Brand>
        </Container>
      </Navbar>
      
                   </InputContainer>
                </Column>
              </TwoColumn>
           
        
          <SvgDotPattern1 />
         
      <SvgDotPattern3 />
      <SvgDotPattern4 />
        </FormContainer>
      </Content>
    </Container>
    </>
  );
};
