import React from "react";
import PropTypes from "prop-types";
import  { useState, useEffect }  from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import Axios from"axios";
import profil from "../../assets/img/profileIcon.png";
import pobelle from "../../assets/img/pobelle.png";
import eye from "../../assets/img/eye3.png";
import block from "../../assets/img/block.jpg";

import {  Subheading as SubheadingBase } from "components/misc/Headings.js";
import { useHistory } from "react-router-dom";

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

const Link = styled(PrimaryButtonBase)`
  ${tw`inline-block mt-4 text-sm font-semibold`}
`
const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`mx-auto flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2 `}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;
const Actions = styled.div`
  ${tw`text-center `}
  input {
    ${tw`rounded-full border-2 w-full font-medium focus:outline-none  focus:border-sky-400 hover:border-gray-500`}
  }
`;
const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;

const TextDesign = tw(SubheadingBase)`text-center text-teal-900 text-3xl `;
export default function CardTable({ color }) {

  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[msg,setMsg]=useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [error, setErrors] = useState(null);
    ///////////list of User/////////////
    useEffect(() => {
      const fetchData = async () =>{
        try {
          const {data: response} = await  Axios.get(`http://localhost:5000/users/`)
          setData(response);
          console.log(data);
        } catch (error) {
          console.error(error.message);
          
        }
      }
      fetchData();
    }, []);
    ///////////////////////////////////////
    ////////Delete User///////////////////
    const handleClickDeleteOne = (id)=>
  {
    fetch('http://localhost:5000/users/deleteOne/'+id,{
      method : 'DELETE'
    })
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      console.log(data);
      window.location.reload(false);
    })
  } 
  ///////////////////////////////////////
    ////////Bolck User///////////////////
    const handleClickBlockOne = (id)=>
  {
    fetch('http://localhost:5000/users/Bloque/'+id,{
      method : 'PUT'
    })
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      console.log(data);
      window.location.reload(false);
    })
  } 
  ///////////////////////////////////////
  //////////User Detail/////////////////
  const handleClickDetail = (id)=>
  {
    console.log(id);
    var idUserlocal = localStorage.setItem('idUserlocal', JSON.stringify({idUserlocal:id}));;
    const result = JSON.parse(localStorage.getItem('idUserlocal'));
    console.log(result);
  }
  ///////////////////////////////////////
     ///////Filter list by search value//////////////
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = data.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
        console.log(filteredData)
    }
    else{
        setFilteredResults(data)
    }
}
/////////Add User ///////////////////
const [userr, setUserr] = useState({
  name: " ",
  email: " ",
  password: "",
  phone_number: " ",
  image:" ",
  role:" ",
  status:"ACTIVE"
});

const {
  name,
  email,
  password,
  phone_number,
  image,
  role,
  status,
  
} = userr;
const hundelchange = (e) =>
  setUserr({ ...userr, [e.target.name]: e.target.value });

const handlefileimage=(e)=>{
  setUserr({
      ...userr,[e.target.name]: e.target.files[0].name
  })
}

//Envoyer les informations du formulaire
const onsubmit = (e) => {
  e.preventDefault();
  Send(userr);
};
//ADD user
const Send = async (user) => {

  const res=await Axios.post(`http://localhost:5000/users/addUser`, {...user }).then(()=>{
    alert("Informations enregistrées avec succés !")
    history.push("/admin/users");
  window.location.reload(true);
  // setMsg(res.message)
}).catch((error)=>{
console.log(error);
setErrors(error.response.data.msg);
alert("echec d'enregistrement")
})
  



};
/////////////////////////////////////////////////
///////////////Pagination///////////////////////
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
const currentItemsSearch = filteredResults.slice(indexOfFirstItem, indexOfLastItem);
const pageNumbers = [];

for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
  pageNumbers.push(i);
}

const handleClick = (event) => {
  setCurrentPage(Number(event.target.id));
}


const handlePrevClick = () => {
  setCurrentPage((prevPage) => prevPage - 1);
};


  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              {/* <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                User Table
              </h3> */}
              <HeadingWithControl>
                <HeaderRow>
          <TextDesign
               
              >
              Users Table  &nbsp; &nbsp;
              <Link  onClick={handleOpen}>Add</Link>
              </TextDesign></HeaderRow>
             
           
            <Actions>
              <input type="text" placeholder="Search" 
              onChange={(e) => searchItems(e.target.value)}/>
            </Actions>
        </HeadingWithControl>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse ">
            <thead>
              <tr>
              
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  UserName 
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                Role
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
              Actions
                </th>
                
              </tr>
            </thead>
            <tbody >
        {searchInput.length > 1 ? (
                    filteredResults.map((item) => (
                  <tr key={item._id}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                <img src={item.image || profil} onError={(e) => { e.target.onerror = null; e.target.src = profil }}
                  className="h-12 w-12 bg-white rounded-full border"
                  alt="user profile picture"
                    loading="lazy"
                        />{" "}
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    {item.name}
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {item.role}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {item.status}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                &nbsp;
          <button type="button" className="btn btn-outline-success" onClick={() =>{handleClickDeleteOne(item._id)}}
          > <img src={pobelle} width="20" height="20" alt=""  />
   </button>  &nbsp;
   <a href="/admin/userdetails" type="button" className="btn btn-outline-danger"
                  > <img src={eye} width="20" height="20" alt=""  onClick={() =>{handleClickDetail(item._id)}}  />
          </a> &nbsp;
          <button type="button" className="btn "
                  > <img src={block} width="20" height="20" alt="" onClick={() =>{handleClickBlockOne(item._id)}} />
          </button>
                </td>
                
              </tr> ))
            ) : (currentItems.map((user) =>  (
            
            <tr key={user._id}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                 <img src={user.image || profil} onError={(e) => { e.target.onerror = null; e.target.src = profil }}
                  className="h-12 w-12 bg-white rounded-full border"
                  alt="user profile picture"
                    loading="lazy"
                        />{" "}

                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    {user.name}
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {user.role}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {user.status}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                &nbsp;
                <button type="button" className="btn btn-outline-success" onClick={() =>{handleClickDeleteOne(user._id)}}
          > <img src={pobelle} width="20" height="20" alt=""  />
   </button>  &nbsp;
          <a href="/admin/userdetails" type="button" className="btn btn-outline-danger"
                  > <img src={eye} width="20" height="20" alt=""  onClick={() =>{handleClickDetail(user._id)}}  />
          </a> &nbsp;
          <button type="button" className="btn "
                  > <img src={block} width="20" height="20" alt="" onClick={() =>{handleClickBlockOne(user._id)}} />
          </button>
                </td>
                </tr>
            ))
              )
              
              }
            </tbody>
        
          </table>
      </div>
      {searchInput.length < 1 ? (
      <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing {indexOfFirstItem + 1} to {indexOfLastItem} of  { data.length } entries
              </span>
              <div className="flex justify-center my-6">
  
  <Controls>
            <PrevButton    onClick={handlePrevClick}disabled={currentPage === 1} ><ChevronLeftIcon/></PrevButton>
            <NextButton  disabled={currentPage === pageNumbers.length} onClick={() => setCurrentPage(currentPage + 1)}><ChevronRightIcon/></NextButton>
          </Controls>
</div>

             
      </div>
     
     ):(<div></div>) }
      </div>
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
          <Form onSubmit={(e) => onsubmit(e)}>
            Name: 
                <Input
                    className="myinput"
                    type="text"
                    
                    name="name"
                    value={name}
                    onChange={(e) => hundelchange(e)}
                    required={true} />
                  Email : 
                <Input
                    className="myinput"
                    type="email"
                   
                    name="email"
                    value={email}
                    onChange={(e) => hundelchange(e)} pattern="^[A-Za-z0-9]+(\.?[A-Za-z0-9]+)@(esprit|gmail|outlook|hotmail|yahoo|microsoft|icloud|yandex|gmx|mail|aol|zoho|protonmail|googlemail)\.(tn|com|org|de|net|cn|uk|info|nl|eu|ru)$"
                    required={true}/>
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
                    Password:
                    <Input
                    className="myinput"
                    type="password"
                   
                    name="password"
                    value={password}
                    onChange={(e) => hundelchange(e)} minLength={6}
                    required={true}/>
                 
                  Phone number :  
                  <Input
                    className="myinput"
                    type="number"
                   name="phone_number"
                    value={phone_number}
                    onChange={(e) => hundelchange(e)} 
                    maxLength={8} required={true}/>
                  Role :<br></br>
               
                <select
                      tw="text-gray-500 w-full px-8 py-4 rounded-lg font-medium bg-purple-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0"
                      className="newRole"
                      name="role"
                      value={role}
                      onChange={(e) =>  hundelchange(e)}
                      defaultValue="Selectionner un role" required={true} >
                      <option value="Selectionner un role" >Selectionner un role</option>
                      <option className="CLIENT" value="CLIENT">
                    CLIENT
                      </option>
                      {/* <option className="BACKER" value="BACKER">
                        BACKER
                      </option> */}
                      {/* <option className="CREATOR" value="CREATOR">
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
                  <Input type="file" name="image" accept="image/*" onChange={(e)=>handlefileimage(e)}/>
                  {msg &&<div className={styles.success_msg}>{msg}</div>}
                <SubmitButton type="submit">
                  {/* <SubmitButtonIcon className="icon" /> */}
                  <span className="text">Add</span>
                </SubmitButton>   
              </Form>
        </Box>
        </Fade>
      </Modal>
       
  </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
