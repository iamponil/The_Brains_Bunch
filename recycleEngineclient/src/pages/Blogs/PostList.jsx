import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cover from './cover.jpg';
import logo from '../../images/logo.png';
import { Helmet } from 'react-helmet';
import PostForm from './PostForm';
import Footer from 'components/footers/FiveColumnDark';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import styled from "styled-components";
import tw from "twin.macro";
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-200 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const PostList = () => {

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);


	const fetchPosts = async () => {
		try {
			const response = await fetch('http://localhost:5000/blogs/posts', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
			});

			if (!response.ok) {
				throw new Error('Request failed with status ' + response.status);
			}

			const jsonData = await response.json();
			setPosts(jsonData);
		} catch (error) {
			console.error(error);
		}
	};
	const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-purple-500 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-inner focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
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
	const [image, setImage] = useState('');
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [posts, setPosts] = useState([]);

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	createPost({ title, content,image });
	// 	setTitle('');
	// 	setContent('');
	// 	setImage('');
	// };
	// const createPost = async (newPost) => {
	// 	try {
	// 		const response = await fetch('http://localhost:5000/blogs/createposts', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	// 			},
	// 			body: JSON.stringify(newPost),
	// 		});
	// 		const data = await response.json();
	// 		setPosts([...posts, data]);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('title', title);
		formData.append('content', content);
		formData.append('image', image);
	  console.log(image)
		createPost(formData);
		setTitle('');
		setContent('');
		setImage('');
	  };
	  
	  const createPost = async (newPost) => {
		try {
		  const response = await fetch('http://localhost:5000/blogs/createposts', {
			method: 'POST',
			headers: {
			  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
			body: newPost,
		  });
		  const data = await response.json();
		  setPosts([...posts, data]);
		} catch (error) {
		  console.error(error);
		}
	  };
	  
	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div>
			<link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" />
			<link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" rel="stylesheet" />
			<Helmet>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta http-equiv="X-UA-Compatible" content="ie=edge" />
				<link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" />
				<meta name="author" content="name" />
				<meta name="description" content="description here" />
				<meta name="keywords" content="keywords,here" />
				<link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" rel="stylesheet" />

			</Helmet>
			<body className="bg-gray-200 font-sans leading-normal tracking-normal">
				<div className="w-full m-0 p-0 bg-cover bg-bottom" style={{ backgroundImage: `url(${cover})`, height: "60vh", maxHeight: "460px" }}>

					<div className="container max-w-4xl mx-auto pt-16 md:pt-32 text-center break-normal">

						<p className="text-blue center font-extrabold text-3xl md:text-5xl ">
							👻 BLOGS
						</p>

						<p className="text-xl md:text-3xl text-gray-500 "><br /><br /><br />Welcome to The Recycle Engine Blogs</p>
					</div>
				</div>

				<div className="container px-4 md:px-0 max-w-6xl mx-auto -mt-32">

					<div className="mx-0 sm:mx-6">
						<nav className="mt-0 w-full">
							<div className="container mx-auto flex items-center">

								<div className="flex w-1/2 pl-4 text-sm">
									<ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
										<li className="mr-2">
											<a className="inline-block py-2 px-2 text-gray-600 no-underline hover:underline" href="./index">See more About this Blog</a>
										</li>
										<li className="mr-2">
											<button className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:underline py-2 px-2" onClick={handleOpen}  >Add Post</button>

										</li>
									</ul>
								</div>


								<div className="flex w-1/2 justify-end content-center">
									<a className="inline-block text-gray-500 no-underline hover:text-white hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 avatar" data-tippy-content="@twitter_handle" href="https://twitter.com">
										<svg className="fill-current h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z"></path></svg>
									</a>
									<a className="inline-block text-gray-500 no-underline hover:text-white hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 avatar" data-tippy-content="#facebook_id" href="https://www.facebook.com">
										<svg className="fill-current h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z"></path></svg>
									</a>
								</div>

							</div>
						</nav>

						<div className="bg-gray-200 w-full text-xl md:text-2xl text-gray-800 leading-normal rounded-t">

							<div className="flex h-full bg-white rounded overflow-hidden shadow-lg">
								<a href="./index" className="flex flex-wrap no-underline hover:no-underline">
									<div className="w-full md:w-2/3 rounded-t">
										<img src={require("../../images/blogcrowfunding.jpg")} alt="" class="h-full w-full shadow" />
									</div>

									<div className="w-full md:w-1/3 flex flex-col flex-grow flex-shrink">
										<div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
											<p className="w-full text-gray-600 text-xs md:text-sm pt-6 px-6">GETTING STARTED</p>
											<div className="w-full font-bold text-xl text-gray-900 px-6"><br />👋 Welcome to our crowdfunding project</div>
											<p className="text-gray-800 font-serif text-base px-6 mb-5"><br /><br />
												where dreams take flight and passions find support. We believe that together, we can make a difference and bring impactful ideas to life. With your help, we aim to create a community dedicated to innovation, empowerment, and positive change.
											</p>
										</div>

										<div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
											<div className="flex items-center justify-between">
												<img className="w-12 h-12 rounded-full mr-4 avatar" data-tippy-content="Author Name" src={logo} alt="Avatar of Author" />
												<p className="text-gray-600 text-xs md:text-sm">1 MIN READ</p>
											</div>
										</div>
									</div>

								</a>
							</div>
							<div className="flex flex-wrap justify-between pt-12 -mx-6">

								{posts.map((post) => (

									<div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink" key={post._id} >
										<div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
											<a href="#" className="flex flex-wrap no-underline hover:no-underline">
												<img src={`http://localhost:5000/uploads/${post.image}`} alt="" class="h-64 w-full rounded-t pb-6" />
												<p className="w-full text-gray-600 text-xs md:text-sm px-6">GETTING STARTED</p>
												<div className="w-full font-bold text-xl text-gray-900 px-6">{post.title}</div>
												<p className="text-gray-800 font-serif text-base px-6 mb-5">{post.content}
												</p>
											</a>
										</div>

										<div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
											<div className="flex items-center justify-between">
												<img className="w-8 h-8 rounded-full mr-4 avatar" data-tippy-content="Author Name" src="http://i.pravatar.cc/300" alt="Avatar of Author" />{post.author.username}
												<p className="text-gray-600 text-xs md:text-sm">1 MIN READ {console.log(post.author)}</p>
											</div>
										</div>

									</div>

								))}


								<div className="w-full md:w-2/3 p-6 flex flex-col flex-grow flex-shrink">
									<div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
										<a href="#" className="flex flex-wrap no-underline hover:no-underline">
											<img src={require("../../images/energy.jpg")} alt="" className="h-full w-full rounded-t pb-6" />
											<p className="w-full text-gray-600 text-xs md:text-sm px-6">GETTING STARTED</p>
											<div className="w-full font-bold text-xl text-gray-900 px-6">Eco-friendly Energy Solutions</div>
											<p className="text-gray-800 font-serif text-base px-6 mb-5">
											Crowdfunding campaigns can fund renewable energy projects and initiatives that promote clean energy alternatives.
										    This can include projects related to solar energy, wind energy, and other sustainable energy sources that contribute to reducing carbon emissions and promoting a greener future..
											</p>
										</a>
									</div>
									<div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
										<div className="flex items-center justify-between">
											<img className="w-8 h-8 rounded-full mr-4 avatar" data-tippy-content="Author Name" src="http://i.pravatar.cc/300" alt="Avatar of Author" />
											<p className="text-gray-600 text-xs md:text-sm">1 MIN READ</p>
										</div>
									</div>
								</div>
								<div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
									<div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
										<a href="#" className="flex flex-wrap no-underline hover:no-underline">
											<img src={require("../../images/building.jpg")} alt=""className="h-full w-full rounded-t pb-6" />
											<p className="w-full text-gray-600 text-xs md:text-sm px-6">GETTING STARTED</p>
											<div className="w-full font-bold text-xl text-gray-900 px-6">Green Building and Construction</div>
											<p className="text-gray-800 font-serif text-base px-6 mb-5">
											 Crowdfunding can be utilized to support sustainable building and construction projects that prioritize recycling and eco-friendly materials. This can include initiatives focused on sustainable architecture, green building practices, and promoting energy-efficient homes and buildings.
											</p>
										</a>
									</div>
									<div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
										<div className="flex items-center justify-between">
											<img className="w-8 h-8 rounded-full mr-4 avatar" data-tippy-content="Author Name" src="http://i.pravatar.cc/300" alt="Avatar of Author" />
											<p className="text-gray-600 text-xs md:text-sm">1 MIN READ</p>
										</div>
									</div>
								</div>

							</div>
						</div>


					</div>


				</div>

				<script src="https://unpkg.com/popper.js@1/dist/umd/popper.min.js"></script>
				<script src="https://unpkg.com/tippy.js@4"></script>
				<script>
					tippy('.avatar')
				</script>

			</body>
			<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16" >
				<div className="px-6">
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Fade in={open}>
							<Box sx={{ ...style, width: 600 }}>
								<Typography id="modal-modal-title" variant="h6" component="h2">
									Add A New Post          
									</Typography>
								<Form onSubmit={handleSubmit} enctype="multipart/form-data">
									Title:
									<Input
										className="myinput"
										type="text"

										name="title"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
									Content :
									<textarea tw='bg-gray-200'
									style={{width:'320px',height:'100px'}}
										className="myinput"
										value={content}
										onChange={(e) => setContent(e.target.value)}>
									</textarea>
									Image:
									<Input type="file" 
									name="image" 
									accept="image/*" 
									onChange={e => setImage(e.target.files[0])} />
									<SubmitButton type="submit">
										<span className="text">Post</span>
									</SubmitButton>
								</Form>
							</Box>
						</Fade>
					</Modal>

				</div>
			</div>
			<Footer />
		</div>


	);
}

export default PostList;
