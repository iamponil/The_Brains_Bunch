// import { Box, Input, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { Fade, Form, Modal } from 'react-bootstrap';

// import styled from "styled-components";
// import tw from "twin.macro";
// const PostForm = (props) => {
//   const SubmitButton = styled.button`
//   ${tw`mt-5 tracking-wide font-semibold bg-teal-500 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-inner focus:outline-none`}
//   .icon {
//     ${tw`w-6 h-6 -ml-2`}
//   }
//   .text {
//     ${tw`ml-3`}
//   }
// `;
// const styles={
//   container:{
//     width: '100vw',
//     height:'100vh',
//     display:'flex',
//     alignItems:'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },
//   green_btn:{
//     border:'none',
//     outline: 'none',
//     padding:'12px 0',
//     backgroundColor: "#3bb19b",
//     borderRadius:'20px',
//     width:'180px',
//     fontWeight: 'bold',
//     fontSize:'14px',
//     cursor: 'pointer',
//   }
// }
//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };
//   const[msg,setMsg]=useState("");
//   const [file, setFile] = useState({name:""});
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [posts, setPosts] = useState([]);
//   const handleClose = () => setOpen(false);
//   const [open, setOpen] = React.useState(false);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createPost({ title, content });
//     setTitle('');
//     setContent('');
//   };
//   const createPost = async (newPost) => {
//     try {
//       const response = await fetch('http://localhost:5000/blogs/createposts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//         },
//         body: JSON.stringify(newPost),
//       });
//       const data = await response.json();
//       setPosts([...posts, data]);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   useEffect(() => {
//     return () => {
//       createPost();
//     };
//   }, [])
//   return (
//     // <div>
//     //   <h2>Create a New Post</h2>
//     //   <form onSubmit={handleSubmit}>
//     //     <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
//     //     <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
//     //     <button type="submit">Submit</button>
//     //   </form>
//     // </div>
//     <>
   
//       <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16" >
//         <div className="px-6">
//            <Modal
//         open={props.open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Fade in={props.open}>
//         <Box sx={{...style, width: 600}}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Modifier vos informations
//           </Typography>
//           <Form onSubmit={handleSubmit} enctype="multipart/form-data">
//             Title: 
//                 <Input
//                     className="myinput"
//                     type="text"
                    
//                     name="title"
//                     value={title} 
//                     onChange={(e) => setTitle(e.target.value)}
//                     />
//                   Content :
//                    <textarea 
//                    className="myinput" 
//                    placeholder="Content" 
//                    value={content} 
//                    onChange={(e) => setContent(e.target.value)}>
//                    </textarea>
//                   Image:
//                   <Input type="file" name="image" accept="image/*"  onChange={e => setFile(e.target.files[0])}/>
//                   {msg &&<div className={styles.success_msg}>{msg}</div>}
//                 <SubmitButton type="submit">
//                   {/* <SubmitButtonIcon className="icon" /> */}
//                   <span className="text">Post</span>
//                 </SubmitButton>   
//               </Form>
//         </Box>
//         </Fade>
//       </Modal>
      
//         </div>
//       </div>
//     </>
//   );
// };

// export default PostForm;
