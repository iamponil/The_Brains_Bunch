import React ,{useEffect, useState} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import {ReactComponent as SvgDotPatternIcon} from "../../images/dot-pattern.svg"
import Header, { NavLinks ,NavLink} from "components/headers/light";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
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
const Form = tw.form`mx-auto max-w-xs`;
const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input`  `;
const TextArea = tw.textarea`h-64 sm:h-full `;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500  rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;
const Button = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-gray-100 text-primary-500 w-full py-4 rounded-lg   rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-inner focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

export default ({ roundedHeaderButton  }) => {
  const RecycleEngineFee = 0.05;
const ProcessingFee = 0.05;
  const [open, setOpen] = React.useState(false);
  const [goalAmount, setGoalAmount] = useState(" ");
  const [taxes, setTaxes] = useState(" ");
  const [subtotaltaxes,setSubtotaltaxes]=useState(" ");
  const [suggestedGoal, setSuggestedGoal] = useState(" ");
  const [total,setTotal]=useState(" ");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleGoalAmountChange = (event) => {
    setGoalAmount(event.target.value);
  };

  const handleTaxesChange = (event) => {
    setTaxes(event.target.value);
  };
  const handleTotalChange = (event) => {
    setTotal(event.target.value);
  };

  const calculateSuggestedGoal = () => {
   
    const subtotal = parseFloat(goalAmount) + (parseFloat(goalAmount) * parseFloat(taxes||0) / 100);
    setSubtotaltaxes(subtotal);
    const total = subtotal + (subtotal * RecycleEngineFee) + (subtotal * ProcessingFee);
    setSuggestedGoal(total.toFixed(2));

  };
  const selectAmount=()=>{
    if(suggestedGoal)
    setTotal(suggestedGoal);
    handleClose();
   setGoalAmount("");
   setTaxes("");
    
  }
  useEffect(() => {
    calculateSuggestedGoal();
  }, [goalAmount, taxes]);
  return (
    <><Header roundedHeaderButton={roundedHeaderButton} />
 
    <Container>
      <Content>
      <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Start with the basics</h2>
            <h3>Make it easy for people to learn about your project.</h3>
            <form action="#">
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input" tw="text-primary-500">Title</Label>
                    <Input id="name-input" type="text" name="name" placeholder="E.g. John Doe" />
                  </InputContainer>
                  <InputContainer>
                  <Label htmlFor="email-input" tw="text-primary-500">Project location</Label>
                    <Input id="email-input" type="email" name="email" placeholder="Start typing your location...
" /> </InputContainer>
                </Column>
                <Column>
                <InputContainer tw="flex-1">
                    <Label htmlFor="name-input" tw="text-primary-500">Subtitle</Label>
                    <TextArea id="name-input" type="text" name="name" placeholder="Gently brings awareness to self-care activities, using encouraging push notifications, rather than guilt or shame." />
                  </InputContainer>
                 
                </Column>
              </TwoColumn>
              <br></br>
             <hr tw=" text-gray-900"></hr> 
             <br></br>
             <TwoColumn>
              
              <select  tw="sm:pr-48 pl-8 text-primary-500 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500">
              <option value="">Choice Category</option>
        <option value="Papier  &  Carton"> Papier  &  Carton</option>
      <option value="Plastique ">Plastique </option>
      <option value="Métaux">Métaux</option>
      <option value="Déchets électroniques">Déchets électroniques</option>
      <option value="Déchets organiques">Déchets organiques</option>
      <option value=" Textiles"> Textiles</option>
      <option value="Pneus"> Pneus </option>
     </select>
              
              
            </TwoColumn>
             <br></br>
             <hr tw=" text-gray-900"></hr> 
             <br></br>
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input" tw="text-primary-500">Funding goal</Label>
                    <Input id="name-input" type="Number" name="name" placeholder="Goal amount $ " value={total} onChange={handleTotalChange}/>
                   
                  </InputContainer>
                  <NavLink onClick={handleOpen}   >Use our calculator to estimate total costs </NavLink>
               
                </Column>
                <Column>
                <InputContainer>
                    <Label htmlFor="name-input" tw="text-primary-500">Target launch date (optional)</Label>
                    <Input id="name-input" type="date" name="name" placeholder="E.g. John Doe" />
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
                    <Input id="email-input" type="Number" maxLength={60} name="email" placeholder="Enter number of days" />
                  </InputContainer>
                </Column>
                
              
              </TwoColumn>
              <br></br>
             <hr tw=" text-gray-900"></hr> 
             <br></br>
             <TwoColumn>
                <Column>
                
                  
                   
<label tw="text-primary-500">Drop an image here, or select a file</label>
<Input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
<h3 class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</h3>

                
                </Column>
                <Column>
               
               
                  <label tw="text-primary-500"  >Drop a video here, or select a file.</label>
<Input  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
<h3 class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">It must be a MOV, MPEG, AVI, MP4, 3GP, WMV, or FLV, no larger than 5120 MB.</h3>

      
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
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
        <Box sx={{...style, width: 600}}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Modifier vos informations
          </Typography> */}
           <Container>
      <Content>
      <FormContainer name="form">
          {/* <h2>Funding goal</h2> */}
          <p  tw="text-gray-700 font-bold sm:text-3xl">Funding calculator</p>
          <h3>Enter the total amount you think you'll need to make this project and fulfill your rewards.Build out a budget that includes shipping , materials, research,vendors, and labor costs </h3>
      <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input" tw="text-primary-500">Funding goal</Label>
                    <Input id="name-input" type="Number" name="name" placeholder="Goal amount $ " value={goalAmount}  onChange={handleGoalAmountChange}/>
                   
                  </InputContainer>
              
               
                </Column>
           
              
               
              
                  <Column>
                  <InputContainer>
                    <Label htmlFor="name-input" tw="text-primary-500">Pourcentage du Taxes %</Label>
                    <Input id="name-input" type="Number" name="name" placeholder="Taxes %" value={taxes}
              onChange={handleTaxesChange} />
                   
                  </InputContainer>

             
            
                </Column>
                
              
              </TwoColumn>
              <br></br>
              <TwoColumn>
               <Column> <p tw="text-primary-500 font-bold ">Taxes</p></Column>
                <Column>
                <Input id="taxe" type="number" name="taxe" placeholder="$" value={goalAmount*taxes/100} readOnly />
              
            </Column>
              </TwoColumn>
              <br></br>
      
              {/* <TwoColumn>
                <Column> <p tw="text-primary-500 font-bold ">Recycle Engine fees: 5%</p></Column>
                <Column> <p tw="text-gray-500 font-bold ">${subtotaltaxes*RecycleEngineFee}</p></Column>
              </TwoColumn> */}
                <TwoColumn>
               <Column> <p tw="text-primary-500 font-bold ">Recycle Engine fees: 5%</p></Column>
                <Column>
                <Input id="RecycleEnginefees" type="number" name="Suggestedgoal" placeholder="$" value={RecycleEngineFee*goalAmount} readOnly />
              
            </Column>
              </TwoColumn>
              <br></br>
       
              <TwoColumn>
                  <Column> <p tw="text-primary-500 font-bold ">Processing fees 5%</p></Column>
                <Column>
                <Input id="email-input" type="number" name="email" placeholder="%" value={ProcessingFee*goalAmount} readOnly />
              
            </Column>
              </TwoColumn>
              <br></br> <hr tw=" text-gray-900"></hr> 
             <br></br>
             
              <TwoColumn>
               <Column> <p tw="text-primary-500 font-bold ">Suggested goal:</p></Column>
                <Column>
                <Input id="Suggestedgoal-input" type="number" name="Suggestedgoal" placeholder="$" value={suggestedGoal} readOnly />
              
            </Column>
              </TwoColumn>
                <Button type="submit" onClick={selectAmount}>
     
                  <span className="text">Select</span>
                </Button>   
              </FormContainer></Content></Container>
        </Box>
        </Fade>
      </Modal>
      
    </>
  );
};
