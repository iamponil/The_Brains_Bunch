import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import Header from "components/headers/light";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import {
  BsEye,
  BsEyeFill
} from 'react-icons/bs';
const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Description = tw(SectionDescription)`w-full text-center`;

const Column = tw.div`flex flex-col items-center`;
const HeaderContent = tw.div``;

const FAQSContainer = tw.dl`mt-12 max-w-4xl relative`;
const Div = tw.div`cursor-pointer select-none mt-2 px-8 sm:px-12 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = motion(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);
const Answer = motion(tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`);
const Heading = tw.h1`font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`font-bold text-2xl md:text-3xl lg:text-4xl xl:text-3xl text-gray-900 leading-tight`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;



export default (
  { roundedHeaderButton  }) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleQuestion = questionIndex => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

 
  const searchParams = new URLSearchParams(window.location.search);
  
  
  const usernameParam = searchParams.get('username');
  const user = JSON.parse(usernameParam);
console.log(usernameParam);
const dataParam = searchParams.get('data');
  const selectedValue = JSON.parse(dataParam);
  
  console.log(selectedValue)
  const titreParam = searchParams.get('titre');
  const titre = JSON.parse(titreParam);
  console.log(titre)
  const handlepreview = (e) => {
    e.preventDefault();
    window.location.href = `/previewProject?data=${JSON.stringify(selectedValue)}&username=${JSON.stringify(user)}&titre=${JSON.stringify(titre)}`;
   }
   const handlebacis = (e) => {
    e.preventDefault();
    window.location.href = `/basics?titre=${JSON.stringify(titre)}&username=${JSON.stringify(user)}`;
  }
  return (<>   <Header roundedHeaderButton={roundedHeaderButton }  />
    <Container>
      <ContentWithPaddingXl>
        <Column>
        <Heading >
           Recycling {selectedValue} Project 
            </Heading>
            <br></br>
            <Paragraph tw="font-bold text-primary-500">
            By {user.name} 
            </Paragraph>
            <br></br>
          <button  style={{ backgroundColor: 'transparent' , color:'gray' }}onClick={handlepreview} >  <BsEyeFill style={{ marginRight:'20px' }}/> Preview</button> 

          <FAQSContainer style={{width:'800px'}}>
            
              <Div
                onClick={handlebacis}
                className="group"
              >
                 <Paragraph tw="font-bold text-primary-500">
                 Basics
            </Paragraph>
               <p>
Name your project, upload an image or video, and establish your campaign details.</p>
               
              </Div>
              <Div
               
                className="group"
              >
                <Paragraph tw="font-bold text-primary-500">
                Rewards
            </Paragraph>
               <p>
               Set your rewards and shipping costs.</p>
               
              </Div>
              <Div
               
                className="group"
              >
                <Paragraph tw="font-bold text-primary-500">
                Story


            </Paragraph>
               <p>
               Add a detailed project description and convey your risks and challenges.
              </p>
               
              </Div>  
              <Div
                
                className="group"
              >
                 <Paragraph tw="font-bold text-primary-500">
                 Payment

            </Paragraph>
               <p>
               Verify details and link a bank account.</p>
               
              </Div>
          </FAQSContainer>
        </Column>
      </ContentWithPaddingXl>
      <DecoratorBlob1/>
      <DecoratorBlob2 />
    </Container>
    </>
  );
};
