import React, {useState} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-6.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import {Header} from "components/headers/profileHeader";
import Footer from 'components/footers/FiveColumnDark';
import { useParams } from "react-router-dom";
const HeaderContainer = tw.div`w-full flex flex-col items-center`;
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const PlanDurationSwitcher = tw.div`block w-full max-w-xs sm:inline-block sm:w-auto border-2 rounded-full px-1 py-1 mt-8`;
const SwitchButton = styled.button`
  ${tw`w-1/2 sm:w-32 px-4 sm:px-8 py-3 rounded-full focus:outline-none text-sm font-bold text-gray-700 transition duration-300`}
  ${props => props.active && tw`bg-primary-500 text-gray-100`}
`;

const PlansContainer = tw.div`flex justify-center flex-col md:flex-row items-center md:items-start relative`;
const Plan = styled.div`
  ${tw`w-full max-w-72 mt-16 md:mr-12 md:last:mr-0 text-center px-8 rounded-lg relative text-gray-900 bg-white flex flex-col shadow-raised`}

  ${props =>
    props.featured &&
    css`
      ${tw`border-2 border-gray-200 shadow-none`}
    `}
`;

const PlanHeader = styled.div`
  ${tw`flex flex-col leading-relaxed py-8 -mx-8 bg-gray-100 rounded-t-lg`}
  .name {
    ${tw`font-bold text-xl`}
  }
  .price {
    ${tw`font-bold text-4xl sm:text-5xl my-1`}
  }
  .slash {
    ${tw`text-xl text-gray-500`}
  }
  .duration {
    ${tw`lowercase text-gray-500 font-medium tracking-widest`}
  }
  .mainFeature {
    ${tw`text-gray-500 text-sm font-medium tracking-wide`}
  }
`;
const PlanFeatures = styled.div`
  ${tw`flex flex-col -mx-8 px-8 py-8 flex-1 text-sm`}
  .feature {
    ${tw`mt-5 first:mt-0 font-semibold text-gray-500`}
  }
`;

const PlanAction = tw.div`px-4 pb-8`;
const BuyNowButton = styled(PrimaryButtonBase)`
  ${tw`rounded-full tracking-wider py-4 w-full justify-center text-sm hover:shadow-xl transform hocus:translate-x-px hocus:-translate-y-px focus:shadow-outline`}
`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-25 transform -translate-x-2/3 -translate-y-1/2`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-25 transform translate-x-2/3 translate-y-1/2 fill-current text-teal-300`}
`;

export default ({
  subheading = "No Rewards are guaranted",
  heading = "Select your reward",
  description = "",
  plans = null,
  primaryButtonText = "Continue",
 
}) => {
 
  const [Amount, setAmount] = useState(0);
  const [Amount2, setAmount2] = useState(50);
  const [Amount3, setAmount3] = useState(100);
  const [Amount4, setAmount4] = useState(200);
  const { id } = useParams();
  const handleChangeAmount = (e) => {
    e.preventDefault();
   setAmount(e.target.value);
  
   }
const onsubmit1 = (e) => {
  
  window.location.href = `/PaymentProcess?data=${JSON.stringify(Amount)}&idproject=${JSON.stringify(id)}`;

 }
  
 const onsubmit2 = (e) => {
  
  window.location.href = `/PaymentProcess?data=${JSON.stringify(Amount2)}&idproject=${JSON.stringify(id)}`;

 }
 const onsubmit3 = (e) => {
  
  window.location.href = `/PaymentProcess?data=${JSON.stringify(Amount3)}&idproject=${JSON.stringify(id)}`;

 }
 const onsubmit4 = (e) => {
  
  window.location.href = `/PaymentProcess?data=${JSON.stringify(Amount4)}&idproject=${JSON.stringify(id)}`;

 }
  return (
    <><Header/> 
    <Container>
      <ContentWithPaddingXl>
        <HeaderContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          <Heading>{heading}</Heading>
          {description && <Description>{description}</Description>}
       
        </HeaderContainer>
        <PlansContainer>
       
            <Plan >
              
              <PlanHeader>
               
               <span className="name">Pledge without a reward</span>
               <span className="priceAndDuration">
                 <span className="price">$0 </span>
               
           
               </span>
             
             </PlanHeader>
              <PlanFeatures>
              <div style={{display:'flex'}}>  <input placeholder="Enter your desired amount" name="Amount" value={Amount} onChange={(e) => {handleChangeAmount(e); }} tw="w-full bg-transparent text-gray-500 text-base font-medium tracking-wide border-b-2 py-2 text-gray-500 hocus:border-pink-400 focus:outline-none transition duration-200" type="Number"/>
              <span style={{ fontSize:'40px', fontFamily:'Arial'}} >$</span></div>
              </PlanFeatures>
              <PlanAction>
                <BuyNowButton onClick={onsubmit1}>{primaryButtonText}</BuyNowButton>
              </PlanAction>
            </Plan>
            <Plan >
              <PlanHeader>
               
                <span className="name">Pledge with a reward</span>
                <span className="priceAndDuration">
                  <span className="price"> 10% </span>
                
            
                </span>
              
              </PlanHeader>

              <PlanFeatures>
                <span className="feature"  style={{ fontSize:'30px', fontFamily:'Arial'}}> Pledge 50$</span>
                 <br></br>
                
              </PlanFeatures>
              <PlanAction>
                <BuyNowButton onClick={onsubmit2}>{primaryButtonText}</BuyNowButton>
              </PlanAction>
            </Plan>
            <Plan >
              <PlanHeader>
               
                <span className="name">Pledge with a reward </span>
                <span className="priceAndDuration">
                  <span className="price" > 20% </span>
                
            
                </span>
              
              </PlanHeader>
              <PlanFeatures>
                <span className="feature" style={{ fontSize:'30px', fontFamily:'Arial'}}> Pledge 100$</span>
        
                <br></br>
              </PlanFeatures>
              <PlanAction>
                <BuyNowButton onClick={onsubmit3}>{primaryButtonText}</BuyNowButton>
              </PlanAction>
            </Plan>
            <Plan >
              <PlanHeader>
               
                <span className="name">Pledge with a reward</span>
                <span className="priceAndDuration">
                  <span className="price"> 30% </span>
                
            
                </span>
              
              </PlanHeader>
              <PlanFeatures>
                <span className="feature" style={{ fontSize:'30px', fontFamily:'Arial'}}> Pledge 200$</span>
                <br></br>
           
              </PlanFeatures>
              <PlanAction>
                <BuyNowButton onClick={onsubmit4} >{primaryButtonText}</BuyNowButton>
              </PlanAction>
            </Plan>
        </PlansContainer>
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
    <Footer />
    </>
  );
};
