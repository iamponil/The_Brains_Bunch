import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-icon.svg";
import Header from "components/headers/light";
import MainFeature from "components/features/TwoColWithButton.js";
import DesignIllustration from "../../images/imgoo.jpg";
import Exit from "../../images/exit.png";
import { useParams } from "react-router-dom";
export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
 const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;
  const [project, setproject] = useState([]);
  const [error, setErrors] = useState(null);
  const { id } = useParams();
 //get user details by id
 useEffect(()=>
 {
   fetch('http://localhost:5000/projects/getProjectById/'+id)
   .then(res=>{
     return res.json()
   })
   .then(data=>{
     console.log(data);
     console.log(id);
     
     setproject(data);
    
     
   }).catch(console.error())
 },[]);
  return (
    <><Header  />
  

      <MainFeature
        subheading={<Subheading> {project.title} </Subheading>}
        heading={
          <>
           Recycling {project.category}
            <wbr /> 
          </>
        }
        description={
          <Description>
         <span tw="text-primary-500">  committed to a goal of :</span>
            <br />
             {project.fundGoal}$
            <br />
            <br />

            <span tw="text-primary-500">  Location : </span>
          <br />
          {project.location}
          <br />
            <br />
           <span tw="text-primary-500"> committed to achieving a goal in :</span>
            <br />
            {project.duration} days
            </Description>
        }
        
        buttonRounded={false}
        textOnLeft={false}
        primaryButtonText="View all Projects "
        primaryButtonUrl = "/AllProjects"
        imageSrc=
          {`http://localhost:5000/uploads/${project.image}`}
         
        imageCss={imageCss}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
      />
    
    </>  
  );
}
