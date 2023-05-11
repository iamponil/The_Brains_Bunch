import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import Footer from 'components/footers/FiveColumnDark';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { ReactComponent as ArrowRightIcon } from 'images/arrow-right-icon.svg';
import { Header } from 'components/headers/profileHeader';
import { NavLinks, NavLink } from 'components/headers/light';
import MainFeature from 'components/features/TwoColWithButton.js';
import DesignIllustration from '../../images/imgoo.jpg';
import Exit from '../../images/exit.png';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import etoile from '../../images/etoilee.jpg';
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';
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
  const [showDescription, setshowDescription] = useState(false);

  const [duration, setDuration] = useState('');
  const [newComment, setNewComment] = useState('');
  const [error, setErrors] = useState(null);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, commentsResponse] = await Promise.all([
          fetch(`http://localhost:5000/projects/getProjectById/${id}`),
          fetch(`http://localhost:5000/projects/${id}/comments`),
        ]);

        const projectData = await projectResponse.json();

        const commentsData = await commentsResponse.json();

        const commentsWithUsers = await Promise.all(
          commentsData.map(async (comment) => {
            const userResponse = await fetch(
              `http://localhost:5000/users/getUserById/${comment.user}`
            );
            const user = await userResponse.json();
            return { ...comment, user };
          })
        );

        setproject(projectData);
        setComments(commentsWithUsers);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(() => {
      if (project.duration !== undefined) {
        setDuration(formatDuration(project.duration));
      }
    }, 1000);

    fetchData();

    return () => clearInterval(intervalId);
  }, [id]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (project.duration !== undefined) {
        setDuration(formatDuration(project.duration));
        if (project.duration <= 0) {
          clearInterval(intervalId);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [project.duration]);

  function formatDuration(duration) {
    const days = Math.floor(duration / 86400);
    const hours = Math.floor((duration % 86400) / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    let result = '';
    if (days > 0) {
      result += `${days}d `;
    }
    if (hours > 0) {
      result += `${hours}h `;
    }
    if (minutes > 0) {
      result += `${minutes}m `;
    }
    result += `${seconds}s`;

    return result.trim();
  }

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };
  const handledescriptionToggle = () => {
    setshowDescription(!showDescription);
  };

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [show, setShow] = useState(false);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  const handleRatingSubmit = () => {
    axios
      .post(`http://localhost:5000/projects/${project._id}/rating`, {
        rating,
      })
      .then((response) => {
        setproject(response.data);
        console.log(project.ratings);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSetShow = () => {
    setShow(!show);
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e, projectId, content) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/projects/${projectId}/comment`,
        {
          content,
        },
        {
          headers: headers,
        }
      );

      const newComment = await response.data;
      const userResponse = await fetch(
        `http://localhost:5000/users/getUserById/${newComment.user}`
      );
      const user = await userResponse.json();
      newComment.user = user;
      setComments([...comments, newComment]);
      setComment('');
      setSuccessMessage('Comment added successfully!');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Header />
      {successMessage && (
        <div
          style={{
            backgroundColor: '#d4edda',
            borderColor: '#c3e6cb',
            color: '#155724',
            padding: '1rem',
            borderRadius: '0.25rem',
            marginBottom: '1rem',
          }}
        >
          {successMessage}
        </div>
      )}

      <MainFeature
        heading={
          <>
            <p style={{ fontFamily: 'initial', color: '#6415FF' }}>
              {' '}
              {project.title}
            </p>

            <span
              tw="text-gray-500"
              style={{ display: 'flex', fontSize: '30px' }}
            >
              {project.averageRating ? project.averageRating.toFixed(1) : 0}
              <AiFillStar style={{ color: 'yellow', fontSize: '40px' }} />
            </span>
            <NavLink onClick={handleSetShow} style={{ float: 'left' }}>
              share your opinion
            </NavLink>
            <wbr />

            {show && (
              <>
                <div style={{ display: 'flex' }}>
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                      <label key={i}>
                        <FaStar
                          name="rating"
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                          className="star"
                          color={
                            ratingValue <= (hover || rating)
                              ? '#ffc107'
                              : '#e4e5e9'
                          }
                          size={20}
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
              </>
            )}
          </>
        }
        subheading={<Subheading> Recycling {project.category} </Subheading>}
        description={
          <p className="text-lg">
            <span className="text-primary-500 font-bold">
              Committed to a goal of:
            </span>
            {project.fundGoalProgress}\ {project.fundGoal}$
            {project.fundGoal <= project.fundGoalProgress ? (
              <p style={{ color: 'green' }}>
                this project will get funded by the deadline
              </p>
            ) : null}
            <br />
            <br />
            <span className="text-primary-500 font-bold">Location:</span>{' '}
            {project.location}
            <br />
            <br />
            <span className="text-primary-500 font-bold">
              Committed to achieving a goal in:
            </span>{' '}
            {formatDuration(project.duration)}
          </p>
        }
        buttonRounded={false}
        textOnLeft={false}
        primaryButtonText="View all Projects "
        primaryButtonUrl="/projectss"
        imageSrc={`http://localhost:5000/uploads/${project.image}`}
        imageCss={imageCss}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
      />

      <div style={{ display: 'flex', marginLeft: '150px' }}>
        <div style={{ flex: '1' }}>
          <div tw="max-w-lg w-full">
            <div tw="max-w-lg w-full">
              <div tw="bg-white rounded-lg shadow-md p-8">
                <a
                  onClick={handleCommentToggle}
                  tw="flex items-center justify-between mb-4 text-primary-500 hover:text-primary-600 cursor-pointer"
                >
                  <h1 tw="text-lg font-bold">
                    All comments{' '}
                    {showComments ? (
                      <FaAngleUp size={20} />
                    ) : (
                      <FaAngleDown size={20} />
                    )}
                  </h1>
                </a>
                {showComments && (
                  <div tw="space-y-4">
                    <form
                      onSubmit={(e) =>
                        handleCommentSubmit(e, project._id, comment)
                      }
                    >
                      <div tw="flex items-center">
                        <input
                          type="text"
                          tw="flex-grow px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary-500"
                          placeholder="Add a comment..."
                          value={comment}
                          onChange={(e) => handleCommentChange(e, project._id)}
                        />
                        <button
                          type="submit"
                          tw="ml-2 px-4 py-2 rounded-md bg-primary-500 text-white font-semibold hover:bg-primary-600 focus:outline-none focus:bg-primary-600"
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
                            <p tw="text-gray-500 text-sm">
                              by {comment.user.name}
                            </p>
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
        </div>
        <div style={{ flex: '1' }}>
          <div tw="max-w-lg w-full">
            <div tw="max-w-lg w-full">
              <div tw="bg-white rounded-lg shadow-md p-8">
                <a
                  onClick={handledescriptionToggle}
                  tw="flex items-center justify-between mb-4 text-primary-500 hover:text-primary-600 cursor-pointer"
                >
                  <h1 tw="text-lg font-bold">
                    Show Description{' '}
                    {showDescription ? (
                      <FaAngleUp size={20} />
                    ) : (
                      <FaAngleDown size={20} />
                    )}
                  </h1>
                </a>
                {showDescription && (
                  <div tw="space-y-4">
                    <div tw="bg-gray-100 rounded-md p-4 shadow-md">
                      <p tw="text-gray-700 text-lg">{project.subtitle}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <Footer />
    </>
  );
};
