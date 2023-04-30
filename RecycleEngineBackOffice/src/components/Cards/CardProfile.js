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
export default function CardProfile({ roundedHeaderButton ,
  submitButtonText = "Modifier Informations", }) {
    //recuperer id user du local storage
  const result = JSON.parse(localStorage.getItem('idUserlocal'));
    console.log(result);
  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setErrors] = useState(null);
  const[msg,setMsg]=useState("");
  const [file, setFile] = useState({name:""});
  // const [data, setData] = useState([]);
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
    fetch('http://localhost:5000/users/getUserById/'+result.idUserlocal)
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      console.log(data);
      setUser(data);
    }).catch(console.error())
  },[]);

  const hundelchange = (e) =>{
    // setUser({ ...user, [e.target.name]: e.target.value 
      
        const target = e.target;
        const name = target.name;
        const value = target.type === 'file' ? target.files[0] : target.value;
        setUser({
          ...user,
          [name]: value,
        });}
      
    

  
  //get user details by id
  useEffect(()=>
  {
    fetch('http://localhost:5000/users/getUserById/'+result.idUserlocal)
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      console.log(data);
      setUser(data);
    }).catch(console.error())
  },[]);
  
//Envoyer les informations du formulaire
  const onsubmit = (e) => {
    e.preventDefault();
   
    const { name, email, password , phone_number ,role} = user;
    const formDataToSend = new FormData(); // create a new FormData object
    formDataToSend.append('name', name);
    formDataToSend.append('email', email);
    formDataToSend.append('password', password);
    formDataToSend.append('phone_number', phone_number);
    formDataToSend.append('role', role);
    formDataToSend.append('image', file);
    console.log(file);
    UpdateSend(user);
  };
  //Update user
  const UpdateSend = async (user) => {

    const res=await Axios.post(`http://localhost:5000/users/updateUser/${user._id}`, {...user }).then(()=>{
      alert("Informations modifiées avec succés !")
      history.push("/admin/userdetails");
    window.location.reload(true);
    setMsg(res.message)
}).catch((error)=>{
  setErrors(error.response.data.msg);
})
    
 
  

  };

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
               
              <Subheading>User Details</Subheading>
            <Heading> {user.name} </Heading>
            <br></br>
            <TextDesign>Role: {user.role}</TextDesign><br></br>
            <TextDesign>Status: {user.status}</TextDesign><br></br>
            <TextDesign>Email: {user.email}</TextDesign><br></br>
            <TextDesign>Phone Number: {user.phone_number}</TextDesign><br></br>
            <Link  onClick={handleOpen}  >Edit</Link>
              </div>
            </div>
          </div>
  
      
          </div>}
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
        <Box sx={{...style, width: 600}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modifier vos informations
          </Typography>
          <Form onSubmit={(e) => onsubmit(e)} enctype="multipart/form-data">
            Name: 
                <Input
                    className="myinput"
                    type="text"
                    
                    name="name"
                    value={user.name}
                    onChange={(e) => hundelchange(e)}
                    />
                  Email : 
                <Input
                    className="myinput"
                    type="email"
                   
                    name="email"
                    value={user.email}
                    onChange={(e) => hundelchange(e)}
                    pattern="^[A-Za-z0-9]+(\.?[A-Za-z0-9]+)@(esprit|gmail|outlook|hotmail|yahoo|microsoft|icloud|yandex|gmx|mail|aol|zoho|protonmail|googlemail)\.(tn|com|org|de|net|cn|uk|info|nl|eu|ru)$" />
                    Password:
                    <Input
                    className="myinput"
                    type="password"
                   
                    name="password"
                    value={user.password}
                    onChange={(e) => hundelchange(e)} minLength={6}
                    />
                       {error !== null ? (
                      <p tw="mt-6 text-xs text-red-600 text-center">
                        <span
                          tw="border-red-500"
                          style={{ fontSize: "15px", color: " red" }}
                        >
                          {error}
                        </span>
                      </p>
                    ) : null}
                 
                  Phone number :  
                  <Input
                    className="myinput"
                    type="number"
                   name="phone_number"
                    value={user.phone_number}
                    onChange={(e) => hundelchange(e)} 
                    maxLength={8} />
                  Role :<br></br>
               
                <select
                      tw="text-gray-500 w-full px-8 py-4 rounded-lg font-medium bg-purple-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0"
                      className="newRole"
                      name="role"
                      value={user.role}
                      onChange={(e) =>  hundelchange(e)}
                       defaultValue="Selectionner un role">
                      <option value="Selectionner un role" >Selectionner un role</option>
                      <option className="CLIENT" value="CLIENT">
                    CLIENT
                      </option>
                      {/* <option className="BACKER" value="BACKER">
                        BACKER
                      </option>
                      <option className="CREATOR" value="CREATOR">
                       CREATOR
                      </option> */}
                      <option className="SUPERADMIN" value="SUPERADMIN">
                      SUPERADMIN
                      </option>
                      <option className="ADMIN" value="ADMIN">
                      ADMIN
                      </option>
                 </select><br></br>
                  Image:
                  <Input type="file" name="image" accept="image/*"  onChange={e => setFile(e.target.files[0])}/>
                  {msg &&<div className={styles.success_msg}>{msg}</div>}
                <SubmitButton type="submit">
                  {/* <SubmitButtonIcon className="icon" /> */}
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>   
              </Form>
        </Box>
        </Fade>
      </Modal>
      
        </div>
      </div>
    </>
  );
}
