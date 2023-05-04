import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-icon.svg";
import {Header} from "components/headers/profileHeader";
import MainFeature from "components/features/TwoColWithButton.js";
import DesignIllustration from "../../images/imgoo.jpg";
import Exit from "../../images/exit.png";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
 const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;
  const [project, setproject] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [error, setErrors] = useState(null);
  const [comments, setComments] = useState([]);
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

 useEffect(() => {
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/projects/${id}/comments`);
      const comments = await response.json();
      const commentsWithUsers = await Promise.all(
        comments.map(async (comment) => {
          const userResponse = await fetch(`http://localhost:5000/users/getUserById/${comment.user}`);
          const user = await userResponse.json();
          return { ...comment, user };
        })
      );
      setComments(commentsWithUsers);
    } catch (error) {
      console.error(error);
    }
  };
  fetchComments();
}, []);

const handleCommentToggle = () => {
  setShowComments(!showComments);
};
  return (
    <><Header  />
  

      <MainFeature
       
        heading={
          <>
         {project.title}
            <wbr /> 
          </>
          
        }
        subheading={<Subheading>    Recycling {project.category} </Subheading>}
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
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom:'20px'}}>
  <a onClick={handleCommentToggle} style={{ textDecoration: 'underline', cursor: 'pointer'}}>
    <h1 tw="text-center text-primary-500 "> All comments {showComments ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />} </h1>
  </a>
  <br></br>
  {showComments && (
    <div tw="mt-8">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} tw="bg-gray-100 rounded-md p-4 my-4">
            <p tw="text-gray-700 text-lg">{comment.content}</p>
            <div tw="flex items-center justify-between mt-2">
              <p tw="text-gray-500 text-sm">by {comment.user.name}</p>
              <p tw="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))
      ) : (
        <p tw="text-center text-gray-500">No comments yet.</p>
      )}
    </div>
  )}
</div>

     

    </>  
  );
}
