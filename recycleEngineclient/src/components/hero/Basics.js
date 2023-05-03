import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import {ReactComponent as SvgDotPatternIcon} from "../../images/dot-pattern.svg"
import Header, { NavLinks } from "components/headers/light";
import { NavLink, useParams } from "react-router-dom";
import Axios from"axios";
const Container = tw.div``;
const Content = tw.div``;

const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute top-0 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-32`;
const SvgDotPattern2 = tw(
  SvgDotPatternIcon
)`absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-32`;
const SvgDotPattern3 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 left-0 transform -translate-x-20 rotate-45 -translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-32`;
const SvgDotPattern4 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-x-20 rotate-90 -translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-32`;

const FormContainer = styled.div`
   form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-4xl sm:text-5xl  text-gray-700 font-bold`}
  }
  h3 {
    ${tw` text-gray-500 font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-500 text-base font-medium tracking-wide border-b-2 py-2 text-gray-500 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input`  `;
const TextArea = tw.textarea`h-64 sm:h-full `;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl justify-center`;


export default function Basics ({ roundedHeaderButton  }) {
  const { titre } = useParams();
//   const searchParams = new URLSearchParams(window.location.search);

//   const usernameParam = searchParams.get('username');
//   const userName = JSON.parse(usernameParam);
// console.log(usernameParam);
  const [error, setErrors] = useState(null);
  const[msg,setMsg]=useState("");
  const [file, setFile] = useState({name:""});
  const [video, setVideo] = useState({name:""});
  const [project, setproject] = useState({
    title: " ",
    location: " ",
    fundGoal: 0,
    category:" ",
    subtitle:"",
    image:null,
    video:null,
    launchingDate:new Date().toISOString().slice(0, 10),
    duration: 0
  });
  const [dragging, setDragging] = useState(false);



  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDrop2 = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile2 = e.dataTransfer.files[0];
    setVideo(droppedFile2);
  };
//get project details by title
useEffect(() => {
  if (titre) {
    fetch(`http://localhost:5000/projects/getByTitle/${titre}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setproject(data);
        console.log(project.launchingDate)
      })
      .catch(err => {
        console.error(err);
        setErrors(err);
      });
  }
}, [titre]);
 
const hundelchange = (e) => {
  const target = e.target;
  const name = target.name;
  const value = target.type === 'file' ? target.files[0] : target.value;

  if (name === 'image') {
    setFile(value);
  } else if (name === 'video') {
    setVideo(value);
   
  } else {
    setproject({
      ...project,
      [name]: value,
    });
  }
};
  

     
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };
         
  //Envoyer les informations du formulaire
    const onsubmit = (e) => {
      e.preventDefault();
     // update the title parameter in the search params

  // searchParams.set("titre", '"' + project.title + '"');
  // const newUrl = window.location.pathname + "?" + searchParams.toString();
  // window.history.pushState({}, "", newUrl);
      const {
      title,
      location,
      fundGoal,
      category,
      subtitle,
      launchingDate,
      duration} = project;
      const formDataToSend = new FormData(); // create a new FormData object
      formDataToSend.append('title', title);
      formDataToSend.append('location', location);
      formDataToSend.append('fundGoal', fundGoal);
      formDataToSend.append('category', category);
      formDataToSend.append('subtitle', subtitle);
      formDataToSend.append('launchingDate', launchingDate);
      formDataToSend.append('duration', duration);
      formDataToSend.append('image', file);
      formDataToSend.append('video', video);
      console.log(formDataToSend)
      console.log(file);
      console.log(video);
      UpdateSend(formDataToSend);
      
    };
    //Update project
    const UpdateSend = async (formData) => {
  
      const res = await Axios.post(`http://localhost:5000/projects/updateProject/${titre}`,formData , { headers }).then(()=>{
        console.log(file, video);
        alert("Informations modifiées avec succés !")
        window.location.href = `/project/${project._id}`;
        
  }).catch((error)=>{
    setErrors(error);
   
    alert("Échec de modification");
  })
};
const handleInputChange = (e) => {
  const selectedFile = e.target.files[0];
  setFile(selectedFile);
};

const handleInputChangevd = (e) => {
  const selectedvd = e.target.files[0];
  setVideo(selectedvd);
};
  return (
    <><Header roundedHeaderButton={roundedHeaderButton} />
 
    <Container>
      <Content>
      <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Start with the basics </h2>
            <h3>Make it easy for people to learn about your project.</h3>
            <form onSubmit={(e) => onsubmit(e)} encType="multipart/form-data" >
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input" tw="text-primary-500">Title</Label>
                    <Input  type="text" name="title" value={project.title|| ''} onChange={(e) => hundelchange(e)} placeholder="E.g. John Doe" />
                  </InputContainer>
                  <InputContainer>
                  
                  <select name="location" value={project.location|| ''}  onChange={(e) => hundelchange(e)} tw="sm:pr-48 pl-8 text-primary-500 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500" >
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
                      </InputContainer>
                
                </Column>
                <Column>
                <InputContainer tw="flex-1">
                    <Label htmlFor="name-input" tw="text-primary-500">Subtitle</Label>
                    <TextArea type="text" name="subtitle" value={project.subtitle|| ''} onChange={(e) => hundelchange(e)} placeholder="Gently brings awareness to self-care activities, using encouraging push notifications, rather than guilt or shame." />
                  </InputContainer>
                 
                </Column>
              </TwoColumn>
              <br></br>
             <hr tw=" text-gray-900"></hr> 
             <br></br>
             <TwoColumn>
              
              <select  tw="sm:pr-48 pl-8 text-primary-500 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500" type="text" name="category" value={project.category|| ''} onChange={(e) => hundelchange(e)}>
              <option value="Paper & Cardboard"> Paper & Cardboard</option>
    		<option value="Plastic ">Plastic </option>
    		<option value="Metals">Metals</option>
    		<option value="Electronic waste">Electronic waste</option>
        <option value="organic waste">organic waste </option>
        <option value=" Textiles"> Textiles</option>
        <option value="Tires"> Tires </option>
   		</select>
              
              
            </TwoColumn>
             <br></br>
             <hr tw=" text-gray-900"></hr> 
             <br></br>
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input" tw="text-primary-500">Funding goal</Label>
                    <Input id="name-input" type="number" name="fundGoal" value={project.fundGoal|| ''} onChange={(e) => hundelchange(e)} placeholder="Goal amount $ " />
                  </InputContainer>
                 
                </Column>
                <Column>
                <InputContainer>
                    <Label htmlFor="name-input" tw="text-primary-500">Target launch date (optional)</Label>
                    <Input id="name-input" type="date"  name="launchingDate" value={project.launchingDate && !isNaN(new Date(project.launchingDate)) ? new Date(project.launchingDate).toISOString().slice(0,10) : ''} onChange={(e) => hundelchange(e)} placeholder="E.g. John Doe" />
                  </InputContainer>
                  <br></br>
                
                </Column>
                
              
              </TwoColumn>
              <br></br>
             <hr tw=" text-gray-900"></hr> 
             <br></br>
              <TwoColumn>
                <Column>
                
                  <InputContainer>
                    <p  tw="text-gray-700 font-bold sm:text-3xl">Campaign duration</p>
                    <br></br>
                    <h3>Set a time limit for your campaign. You won’t be able to change this after you launch.</h3>
           
                   </InputContainer>
                </Column>
                <Column>
               
                  <br></br>
                  <InputContainer>
                    <Label htmlFor="email-input" tw="text-primary-500">Fixed number of days (1-60)</Label>
                    <Input id="email-input" type="Number" maxLength={60}  name="duration" value={project.duration|| ''} onChange={(e) => hundelchange(e)} placeholder="Enter number of days" />
                  </InputContainer>
                </Column>
                
              
              </TwoColumn>
              <br></br>
             <hr tw=" text-gray-900"></hr> 
             <br></br>
             <TwoColumn>
                <Column>                    
                <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      tw="relative mt-4"
    >
    
    <>
        <label tw="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="file_input">
        Drop an image here (MAX. 800x400px)
        </label>
        <div tw="flex justify-center w-full px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <input   id="file_input" tw="sr-only" type="file"  name="image" onChange={handleInputChange} />
          <div tw="space-y-1 text-center">
      <svg tw="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M19.67,8H28.33a1.33,1.33,0,0,1,1.26,1.06l.88,4.39H17.53l.88-4.39A1.33,1.33,0,0,1,19.67,8Z"></path>
        <path d="M24,21.33A6.67,6.67,0,1,1,17.33,14,6.68,6.68,0,0,1,24,21.33Z"></path>
        <path d="M39.47,28.28a1.33,1.33,0,0,0-.94-.39H9.47a1.33,1.33,0,0,0,0,2.67H38.53A1.33,1.33,0,0,0,39.47,28.28Z"></path>
        <path d="M36.46,16H11.54a4.62,4.62,0,0,0-4.6,4.6V32.81a4.62,4.62,0,0,0,4.6,4.6H36.46a4.62,4.62,0,0,0,4.6-4.6V20.6A4.62,4.62,0,0,0,36.46,16ZM36,32.81a2.62,2.62,0,0,1-2.6,2.6H11.54a2.62,2.62,0,0,1-2.6-2.6V20.6a2.62,2.62,0,0,1,2.6-2.6H36a2.62,2.62,0,0,1,2.6,2.6Z"></path>
      </svg>
      <div tw="flex text-sm text-gray-600">
        <span tw="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-200 rounded-md">
        It must be a   SVG, PNG, JPG or GIF
        {file && (
        <div>
          <p>Selected file:</p>
          <p>{project.image}</p>
        </div>
      )}
        </span>
       
      
      </div>
    </div>
        </div>
        </>
      </div>
          </Column>
                <Column>
                <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop2}
      tw="relative mt-4">
        <>
        <label tw="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="file_input1">
        Drop a video here ( no larger than 5120 MB)
        </label>
        <div tw="flex justify-center w-full px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <input   id="file_input1" tw="sr-only"name="video"  type="file" onChange={handleInputChangevd} />
          <div tw="space-y-1 text-center">
      <svg tw="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M19.67,8H28.33a1.33,1.33,0,0,1,1.26,1.06l.88,4.39H17.53l.88-4.39A1.33,1.33,0,0,1,19.67,8Z"></path>
        <path d="M24,21.33A6.67,6.67,0,1,1,17.33,14,6.68,6.68,0,0,1,24,21.33Z"></path>
        <path d="M39.47,28.28a1.33,1.33,0,0,0-.94-.39H9.47a1.33,1.33,0,0,0,0,2.67H38.53A1.33,1.33,0,0,0,39.47,28.28Z"></path>
        <path d="M36.46,16H11.54a4.62,4.62,0,0,0-4.6,4.6V32.81a4.62,4.62,0,0,0,4.6,4.6H36.46a4.62,4.62,0,0,0,4.6-4.6V20.6A4.62,4.62,0,0,0,36.46,16ZM36,32.81a2.62,2.62,0,0,1-2.6,2.6H11.54a2.62,2.62,0,0,1-2.6-2.6V20.6a2.62,2.62,0,0,1,2.6-2.6H36a2.62,2.62,0,0,1,2.6,2.6Z"></path>
      </svg>
      <div tw="flex text-sm text-gray-600">
        <span tw="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-200 rounded-md">
        It must be a MOV, MPEG, AVI, MP4, 3GP, WMV, or FLV 
        {video && (
        <div>
          <p>Selected video:</p>
          <p>{project.video}</p>
        </div>
      )}  
        </span>
       
      
      </div>
    </div>
        </div>
        </>
      
      
    </div>
       </Column> 
              </TwoColumn>
              <br></br>
             <hr tw=" text-gray-900"></hr> 
             <br></br>
              <SubmitButton type="submit" value="Submit">Submit</SubmitButton>
              <br></br>
            </form>
          </div>
          <br></br>
          <SvgDotPattern1 />
                <SvgDotPattern2 />
                <SvgDotPattern3 />
              <SvgDotPattern4 />
          </FormContainer>
          
      </Content>
      
    </Container>
    </>
  );
};
