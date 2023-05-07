import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-icon.svg";
import {Header} from "components/headers/profileHeader";
import  { NavLinks ,NavLink} from "components/headers/light";
import MainFeature from "components/features/TwoColWithButton.js";
import DesignIllustration from "../../images/imgoo.jpg";
import Exit from "../../images/exit.png";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import etoile from "../../images/etoilee.jpg";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import styled from 'styled-components';
export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
//  const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;
  const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Rating = styled.span`
  display: flex;
  align-items: center;
`;

const Star = styled.img`
  margin-left: 0.5rem;
`;

const Location = styled.p`
  margin: 1rem 0;
`;

const Description = styled.p`
  margin-bottom: 2rem;
`;

const Button = styled.button`
 
mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100
 

`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 rounded-lg hover:bg-teal-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
  const [project, setproject] = useState([]);
  const [showComments, setShowComments] = useState(false);

  
 
  const [newComment, setNewComment] = useState("");
  const [error, setErrors] = useState(null);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
const [rating, setRating] = useState(0);
const [hover, setHover] = useState(0);
const [show,setShow]=useState(false);
const headers = {
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
};
const handleRatingSubmit = () => {
 

  axios.post(`http://localhost:5000/projects/${project._id}/rating`, {
    rating
  })
    .then(response => {
      setproject(response.data);
      console.log(project.ratings)
    })
    .catch(error => {
      console.error(error);
    });

}

const handleSetShow = () => {
  setShow(!show);
};
const handleCommentChange = (e) => {
  setComment(e.target.value);
};

const handleCommentSubmit = async (e, projectId,content) => {
  e.preventDefault();

  try {
    const response = await axios.post(`http://localhost:5000/projects/${projectId}/comment`, {
      content,
    }, {
      headers: headers,
    });

   
      console.log(response.data.content)
      const newComment = await response.data;
      setComments([...comments, newComment]);
      setComment("");
      setSuccessMessage("Comment added successfully!");
    //  window.location.reload(true)
    
  } catch (error) {
    console.error(error);
    setErrorMessage(error.message);
  }}

  return (
    <><Header  />
  

      <MainFeature
       
        heading={
          <>
         {project.title}<br/>
         <span tw="text-primary-500" style={{ display: "flex" }} >{project.averageRating ? project.averageRating.toFixed(1) : 0}<img src={etoile} width="50px"height="50px"/></span>
            <NavLink onClick={handleSetShow} style={{ float: "left" }}>share your opinion</NavLink>
            <wbr /> 
           
      {show&&<><div style={{ display: "flex" }}>
  {[...Array(5)].map((star, i) => {
    const ratingValue = i + 1;
    return (
      <label key={i}>
        <FaStar
          name="rating"
          value={ratingValue}
          onClick={() => setRating(ratingValue)}
          className="star"
          color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
          size={30}
          onMouseEnter={() => setHover(ratingValue)}
          onMouseLeave={() => setHover(0)}
        />
      </label>
    );
  })}
</div>
{/* <Button >Submit</Button> */}
<SubmitButton type="submit" onClick={handleRatingSubmit}>
                     
                      <span className="text">Submit</span>
                    </SubmitButton>
</>}

</>
 }
 
        
        subheading={<Subheading>    Recycling {project.category} </Subheading>}
        description={
        //   <Description>
            
        //  <span tw="text-primary-500">  committed to a goal of :</span>
        //     <br />
        //      {project.fundGoal}$
        //     <br />
        //     <br />

        //     <span tw="text-primary-500">  Location : </span>
        //   <br />
        //   {project.location}
        //   <br />
        //     <br />
        //    <span tw="text-primary-500"> committed to achieving a goal in :</span>
        //     <br />
        //     {project.duration} days
        //     </Description>
        
       
          <p className="text-lg">
            <span className="text-primary-500 font-bold">Committed to a goal of:</span> {project.fundGoal}$
            <br />
            <br />
            <span className="text-primary-500 font-bold">Location:</span> {project.location}
            <br />
            <br />
            <span className="text-primary-500 font-bold">Committed to achieving a goal in:</span> {project.duration} days
           
          </p>
        
      
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
        <div tw="flex" style={{justifySelf: 'end', alignSelf: 'center', marginLeft: '700px', paddingTop:"2px"}}>
        <div tw="flex flex-col items-center justify-center mb-10">
        <a
          onClick={handleCommentToggle}
          tw="flex   w-full  text-primary-500 hover:text-primary-600 cursor-pointer" 
        >
          <h1 style={{ fontSize: '24px' }}>
            All comments{' '}
            {showComments ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
          </h1>
        </a>
        <div tw="flex-1">
        {showComments && (
          
          <div tw="w-full max-w-lg mt-4 space-y-4">
              <form onSubmit={(e) => handleCommentSubmit(e, project._id, comment)}>
                  <div style={{ display: "flex", marginTop: "10px" }}>
  <input 
    type="text"
    style={{ 
      flexGrow: 1,
      padding: "5px",
      borderRadius: "5px",
      marginRight: "5px"
    }}
    placeholder="Add a comment..."
    value={comment}
    onChange={(e) => handleCommentChange(e, project._id)} 
  />
  <button 
    type="submit" 
    style={{ 
      padding: "5px 10px",
      borderRadius: "5px",
      backgroundColor: "#a273ff",
      color: "white",
      border: "none",
      cursor: "pointer"
    }}
    
  >
    Add Comment
  </button>
 
</div>

</form>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  tw="bg-gray-100 rounded-md p-4 shadow-md"
                >
                  <p tw="text-gray-700 text-lg">{comment.content}</p>
                  <div tw="flex items-center justify-between mt-2">
                    <p tw="text-gray-500 text-sm">by {comment.user.name}</p>
                    <p tw="text-gray-500 text-sm">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p tw="text-center text-gray-500">No comments yet.</p>
            )}
          </div>
        )}
      </div>
      </div>
      </div>
{/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom:'20px'}}>
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
</div> */}


    </>
  );

 
  
}
