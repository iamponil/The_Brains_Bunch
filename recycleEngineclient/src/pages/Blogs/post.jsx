import { Header } from 'components/headers/profileHeader';
import React from 'react'
import { Helmet } from 'react-helmet';
import postimage from "./blogcrowfunding.jpg";
export default function IndexBlog() {
	return (
		<div>
			<Helmet>
				<meta name="keywords" content="keywords,here" />
				<link
					rel="stylesheet"
					href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
				/>
				<link
					href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css"
					rel="stylesheet"
				/>
				<style>
					{`
            .smooth {transition: box-shadow 0.3s ease-in-out;}
            ::selection{background-color: aliceblue}
          `}
				</style>
			</Helmet>
			<body className="bg-white font-sans leading-normal tracking-normal">


			<Header/>

				<div id="header" className="bg-white fixed w-full z-10 top-0 hidden animated" style={{ opacity: ".95" }}>
					<div className="bg-white">
						<div className="flex flex-wrap items-center content-center">
							<div className="flex w-1/2 justify-start text-white font-extrabold">
								<a className="flex text-gray-900 no-underline hover:text-gray-900 hover:no-underline pl-2" href="#">
									👻 <span className="hidden w-0 md:w-auto md:block pl-1">Ghostwind CSS</span>
								</a>
							</div>
							<div className="flex w-1/2 justify-end content-center">
								<p className="hidden sm:block mr-3 text-center h-14 p-4 text-xs"><span className="pr-2">Share this</span> 👉</p>
								<a className="inline-block text-white no-underline hover:text-white hover:text-underline text-center h-10 w-10 p-2 md:h-auto md:w-16 md:p-4" href="https://twitter.com/intent/tweet?url=#" style={{ backgroundColor: "#33b1ff" }}>
									<svg className="fill-current text-white h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z"></path></svg>
								</a>
								<a className="inline-block text-white no-underline hover:text-white hover:text-underline text-center h-10 w-10 p-2 md:h-auto md:w-16 md:p-4" href="https://www.facebook.com/sharer/sharer.php?u=#" style={{ backgroundColor: "#005e99" }}>
									<svg className="fill-current text-white h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z"></path></svg>
								</a>
							</div>
						</div>

					</div>

					<div id="progress" className="h-1 bg-white shadow" style={{ background: "linear-gradient(to right, #4dc0b5 var(--scroll), transparent 0)" }}></div>
				</div>


				<div className="text-center pt-16 md:pt-32">
					<p className="text-sm md:text-base text-purple-500 font-bold">08 APRIL 2024 <span className="text-gray-900">/</span> GETTING STARTED</p>
					<h1 className="font-bold break-normal text-3xl md:text-5xl">Welcome to Recycle Engine</h1>
				</div>


				<div className="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded" style={{ backgroundImage: `url(${postimage})`, height: "75vh" }}></div>

				<div className="container max-w-5xl mx-auto -mt-32">

					<div className="mx-0 sm:mx-6">

						<div className="bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal" style={{ fontFamily: "Georgia,serif" }}>

							<p className="text-2xl md:text-3xl mb-5">
								👋 Welcome to our crowdfunding project, where dreams take flight and passions find support. We believe that together, we can make a difference and bring impactful ideas to life. With your help, we aim to create a community dedicated to innovation, empowerment, and positive change.		</p>

							<p className="py-6">The idea of creating a crowdfunding platform dedicated to supporting recycling projects in
Africa and utilizing ai technology is a great initiative towards promoting sustainability and environmental protection. However, there are a few areas where the project could be improved.</p>

							<p className="py-6">
Firstly, it would be beneficial to conduct a comprehensive sustainability assessment of the project to identify potential environmental impacts that may arise from the platform's operations. This will enable the project team to implement measures to minimize these impacts and ensure that the platform's overall impact on the environment is positive.</p>

							<ol>
								<li className="py-3">Secondly, the project team will consider engaging with local communities and stakeholders in Africa to ensure that the platform's operations align with their needs and aspirations. This will help build trust and ensure that the platform is culturally appropriate and socially responsible.</li>
								<li className="py-3">Lastly, the team will also develop a robust governance framework that ensures transparency and accountability in the use of funds raised on the platform. This will help build trust and confidence in the platform among donors and project creators alike.</li>
								<li className="py-3">By addressing these areas of improvement, the crowdfunding platform for recycling projects in Africa will be better positioned to achieve its objectives and make a positive impact on the environment and local communities in Africa.</li>
							</ol>

							
						</div>
						


					</div>


				</div>




				


				
			</body>

		</div>
	)
}

