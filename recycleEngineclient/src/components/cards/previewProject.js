import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import {Header} from "components/headers/profileHeader";
import MainFeature from "components/features/TwoColWithButton.js";
import DesignIllustration from "../../images/imgoo.jpg";
import Exit from "../../images/exit.png";
export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
 const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;
  const [project, setproject] = useState({
    title: " ",
    location: " ",
    fundGoal: 0,
    category:" ",
    subtitle:"",
    image:null,
    video:null,
    launchingDate:"",
    duration: 0
  });
  const [error, setErrors] = useState(null);
  const searchParams = new URLSearchParams(window.location.search);
  const dataParam = searchParams.get('data');
  console.log(dataParam);
  const usernameParam = searchParams.get('username');
console.log(usernameParam);
  const selectedValue = JSON.parse(dataParam);
  const user = JSON.parse(usernameParam);
  console.log(selectedValue)
  console.log(user)
  const titreParam = searchParams.get('titre');
  const titre = JSON.parse(titreParam);
  console.log(titre)
  const handlepreview = (e) => {
    e.preventDefault();
    window.location.href = `/projectMenu?data=${JSON.stringify(selectedValue)}&username=${JSON.stringify(user)}&titre=${JSON.stringify(titre)}`;
  
   }
   //get project details by id
useEffect(()=>
{
  fetch(`http://localhost:5000/projects/getByTitle/${titre}`)
  .then(res=>{
    return res.json()
  })
  .then(data=>{
    console.log(data);
    setproject(data);
  })
  .catch(err => {
    console.error(err);
    setErrors(err);
  });
},[]);
  return (
    <><Header  />
   
    <button  style={{marginLeft:'111 px' , backgroundColor: 'transparent' , color:'gray' }}onClick={handlepreview} >   Exit preview  <img src={Exit} style={{width:'20px', height:'20px' ,marginRight:'20px'}}></img></button> 

       
      <MainFeature
        subheading={<Subheading></Subheading>}
        heading={
          <>
           Recycling {project.category}
            <wbr /> <HighlightedText>By {user.name}</HighlightedText>
          </>
        }
        description={
          <Description>
          committed to a goal of :
            <br />
             {project.fundGoal}$
            <br />
            <br />

          Location : 
          <br />
          {project.location}
          <br />
            <br />
            committed to achieving a goal in :
            <br />
            {project.duration} days
            </Description>
        }
        
        buttonRounded={false}
        textOnLeft={false}
        primaryButtonText="I support this project"
        imageSrc=
          {`http://localhost:5000/uploads/${project.image}`}
         
        imageCss={imageCss}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
      />
      {/* <video  src={`http://localhost:5000/${project.video}`} controls /> */}
    </>  
  );
}
