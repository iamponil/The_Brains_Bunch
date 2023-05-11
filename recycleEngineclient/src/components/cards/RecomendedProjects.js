import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Footer from 'components/footers/FiveColumnDark';
import tw from 'twin.macro';
import StarRating from 'components/cards/StarRating';
import styled from 'styled-components';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { Container, ContentWithPaddingXl } from 'components/misc/Layouts.js';
import { SectionHeading } from 'components/misc/Headings.js';
import { PrimaryButton as PrimaryButtonBase } from 'components/misc/Buttons.js';
import { ReactComponent as StarIcon } from 'images/star-icon.svg';
import { ReactComponent as SvgDecoratorBlob1 } from 'images/svg-decorator-blob-5.svg';
import { ReactComponent as SvgDecoratorBlob2 } from 'images/svg-decorator-blob-7.svg';
import axios, { Axios } from 'axios';
import { ReactComponent as LocationIcon } from 'feather-icons/dist/icons/map-pin.svg';
import { Link } from 'react-router-dom';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { Header } from 'components/headers/profileHeader';
import { ReactComponent as ChevronLeftIcon } from 'feather-icons/dist/icons/chevron-left.svg';
import { ReactComponent as ChevronRightIcon } from 'feather-icons/dist/icons/chevron-right.svg';
import { ReactComponent as PriceIcon } from 'feather-icons/dist/icons/dollar-sign.svg';
import { ReactComponent as PercentIcon } from 'feather-icons/dist/icons/percent.svg';
const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Headers = tw(SectionHeading)`text-primary-500 `;
const SecondaryInfoContainer = tw.div`flex justify-between flex-col sm:flex-row mt-2 sm:mt-4`;
const SecondaryInfoContainer2 = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;
const Actions = styled.div`
  ${tw`text-center `}
  input {
    ${tw`rounded-full border-2 w-full relative py-4 px-10 mt-6 font-medium focus:outline-none  hover:border-gray-500`}
  }
`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;

const TabContent = tw(
  motion.div
)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3  sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${(props) =>
    css`
      background-image: url('${props.imageSrc}');
    `}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;
const CardAction = tw(
  PrimaryButtonBase
)`w-full mt-6  justify-center text-white`;
const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;
export default ({
  heading = 'Recomended for you ',
  cardLinkText = ' I Support this project',
}) => {
  ///
  const [selectedCategory, setSelectedCategory] = useState('');
  // const [searchInput, setSearchInput] = useState('');
  const [likeStatus, setLikeStatus] = useState(null);
  const [error, setErrors] = useState(null);
  // const [filteredResults, setFilteredResults] = useState([]);
  const [projects, setproject] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedOption, setSelectedOption] = useState('All');
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  const handleLike = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/projects/${projectId}/like`,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ userId: 'user_id_here' }),
        }
      );
      const data = await response.json();
      setproject((prevProjects) => {
        const index = prevProjects.findIndex(
          (project) => project._id === projectId
        );
        if (index === -1) {
          return prevProjects;
        }
        const updatedProject = { ...prevProjects[index], ...data };
        const updatedProjects = [...prevProjects];
        updatedProjects[index] = updatedProject;
        return updatedProjects;
      });
      setLikeStatus('like');
      setSelectedProjectId(projectId);
    } catch (error) {
      console.error(error);
      setErrors(error.message);
    }
  };

  const handleDislike = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/projects/${projectId}/dislike`,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ userId: 'user_id_here' }),
        }
      );
      const data = await response.json();
      setproject((prevProjects) => {
        const index = prevProjects.findIndex(
          (project) => project._id === projectId
        );
        if (index === -1) {
          return prevProjects;
        }
        const updatedProject = { ...prevProjects[index], ...data };
        const updatedProjects = [...prevProjects];
        updatedProjects[index] = updatedProject;
        return updatedProjects;
      });
      setLikeStatus('dislike');
      setSelectedProjectId(projectId);
    } catch (error) {
      console.error(error);
      setErrors(error.message);
    }
  };
  useEffect(() => {
    fetch(`http://localhost:5000/projects/recommended-projects`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setproject(data);
      })
      .catch((err) => {
        console.error(err);
        setErrors(err);
      });

    // Clear success message after 4 seconds
    if (successMessage) {
      const timeoutId = setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [successMessage]);

  const handlePreviousClick = () => {
    if (startIndex >= 3) {
      setStartIndex(startIndex - 3);
    }
  };

  const handleNextClick = () => {
    if (startIndex + 3 < projects.length) {
      setStartIndex(startIndex + 3);
    }
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

      const newComment = response.data;

      setproject((prevProjects) => {
        const index = prevProjects.findIndex(
          (project) => project._id === projectId
        );
        if (index === -1) {
          return prevProjects;
        }
        const updatedProject = {
          ...prevProjects[index],
          comment: [...prevProjects[index].comment, newComment],
        };
        const updatedProjects = [...prevProjects];
        updatedProjects[index] = updatedProject;
        return updatedProjects;
      });
      setSuccessMessage('Comment added successfully!');
    } catch (error) {
      console.error(error);
      setErrors(error.message);
    }
  };
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const filterProjects = () => {
    console.log(selectedOption);
    console.log(projects);
    if (selectedOption === 'All') {
      return projects;
    } else if (selectedOption === 'Funded') {
      return projects.filter((project) => project.status == true);
    } else if (selectedOption === 'Not_Funded') {
      return projects.filter((project) => project.status == false);
    }
    console.log(projects);
  };

  ///////Filter list by search value//////////////
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState([]);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = projects.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
      console.log(filteredData);
    } else {
      setFilteredResults(projects);
    }
  };

  return (
    <>
      <Container>
        <ContentWithPaddingXl>
          <HeaderRow>
            <Headers>{heading}</Headers>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              {/* <button onClick={handlePreviousClick} disabled={startIndex < 3}><ChevronLeftIcon/></button>
            <button onClick={handleNextClick} disabled={startIndex + 3 >= projects.length}><ChevronRightIcon/></button> */}
              <Controls>
                <PrevButton
                  onClick={handlePreviousClick}
                  disabled={startIndex < 3}
                >
                  <ChevronLeftIcon />
                </PrevButton>
                <NextButton
                  onClick={handleNextClick}
                  disabled={startIndex + 3 >= projects.length}
                >
                  <ChevronRightIcon />
                </NextButton>
              </Controls>
            </div>
            <Actions>
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => searchItems(e.target.value)}
              />
            </Actions>
            <Actions>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                style={{
                  fontSize: '1.2rem',
                  padding: '0.5rem',
                  borderRadius: '5px',
                  border: 'none',
                  borderColor: 'transparent',
                  backgroundColor: '#f5f5f5',
                  color: '#a273ff',
                }}
              >
                <option value="All">All</option>
                <option value="Funded">Funded</option>
                <option value="Not_Funded">Not Funded</option>
              </select>
            </Actions>
          </HeaderRow>

          <TabContent
            variants={{
              current: {
                opacity: 1,
                scale: 1,
                display: 'flex',
              },
              hidden: {
                opacity: 0,
                scale: 0.8,
                display: 'none',
              },
            }}
            transition={{ duration: 0.4 }}
          >
            {searchInput.length > 1
              ? filteredResults.map((item) => (
                  <CardContainer key={item._id}>
                    <Card
                      className="group"
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                    >
                      <CardImageContainer
                        imageSrc={`http://localhost:5000/uploads/${item.image}`}
                      >
                        <CardRatingContainer>
                          <LocationIcon />{' '}
                          <CardReview>({item.location})</CardReview>
                        </CardRatingContainer>

                        <CardHoverOverlay
                          variants={{
                            hover: {
                              opacity: 1,
                              height: 'auto',
                            },
                            rest: {
                              opacity: 0,
                              height: 0,
                            },
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link to={`/project/${item._id}`}>Preview</Link>
                        </CardHoverOverlay>
                      </CardImageContainer>
                      <CardText>
                        <SecondaryInfoContainer>
                          <div tw="flex flex-col sm:flex-row mt-1 sm:mt-4">
                            <a
                              onClick={() => handleLike(item._id)}
                              style={{ cursor: 'pointer' }}
                            >
                              <AiFillLike
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  color:
                                    selectedProjectId === item._id &&
                                    likeStatus === 'like'
                                      ? 'blue'
                                      : 'gray',
                                  marginRight: '15px',
                                }}
                              />
                            </a>
                            <p
                              style={{ marginTop: '20px', marginRight: '20px' }}
                            >
                              {item.likes}Likes{' '}
                            </p>{' '}
                          </div>
                          <div tw="flex flex-col sm:flex-row mt-2 sm:mt-4">
                            <a
                              onClick={() => handleDislike(item._id)}
                              style={{ cursor: 'pointer' }}
                            >
                              <AiFillDislike
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  color:
                                    selectedProjectId === item._id &&
                                    likeStatus === 'dislike'
                                      ? 'red'
                                      : 'gray',
                                  marginRight: '15px',
                                }}
                              />
                            </a>{' '}
                            <p style={{ marginTop: '20px' }}>
                              {item.dislikes} Dislikes
                            </p>{' '}
                          </div>{' '}
                        </SecondaryInfoContainer>

                        {/* <StarRating rating={project.ratings} onRatingChange={(newRating) => handleRatingClick(newRating, project._id)}/> */}

                        <br></br>
                        <SecondaryInfoContainer2>
                          <IconWithText>
                            <IconContainer>
                              <LocationIcon />
                            </IconContainer>
                            <Text>{item.location}</Text>
                          </IconWithText>
                          <Text>{item.fundGoal}</Text>

                          <IconWithText>
                            <IconContainer>
                              <PriceIcon />
                            </IconContainer>
                          </IconWithText>
                        </SecondaryInfoContainer2>
                        <br></br>

                        {(item.fundGoalProgress / item.fundGoal) * 100 > 100 ? (
                          <Text style={{ color: 'green' }}>
                            {(
                              (item.fundGoalProgress / item.fundGoal) *
                              100
                            ).toFixed(2)}
                            % funded
                          </Text>
                        ) : (
                          <Text>
                            {(
                              (item.fundGoalProgress / item.fundGoal) *
                              100
                            ).toFixed(2)}
                            % funded
                          </Text>
                        )}
                        <br></br>
                        <CardTitle> {item.title}</CardTitle>
                        <CardContent>Category:{item.category}</CardContent>
                      </CardText>
                      <CardAction>
                        <Link to={`/rewards/${item._id}`}>
                          <p style={{ color: '#ffffff' }}>
                            I support this project
                          </p>
                        </Link>
                      </CardAction>
                    </Card>
                  </CardContainer>
                ))
              : filterProjects()
                  .slice(startIndex, startIndex + 3)
                  .map((project, index) => (
                    <CardContainer key={index}>
                      <Card
                        className="group"
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                      >
                        <CardImageContainer
                          imageSrc={`http://localhost:5000/uploads/${project.image}`}
                        >
                          <CardRatingContainer>
                            <LocationIcon />{' '}
                            <CardReview>({project.location})</CardReview>
                          </CardRatingContainer>

                          <CardHoverOverlay
                            variants={{
                              hover: {
                                opacity: 1,
                                height: 'auto',
                              },
                              rest: {
                                opacity: 0,
                                height: 0,
                              },
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <Link to={`/project/${project._id}`}>Preview</Link>
                          </CardHoverOverlay>
                        </CardImageContainer>
                        <CardText>
                          <SecondaryInfoContainer>
                            <div tw="flex flex-col sm:flex-row mt-1 sm:mt-4">
                              <a
                                onClick={() => handleLike(project._id)}
                                style={{ cursor: 'pointer' }}
                              >
                                <AiFillLike
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                    color:
                                      selectedProjectId === project._id &&
                                      likeStatus === 'like'
                                        ? 'blue'
                                        : 'gray',
                                    marginRight: '15px',
                                  }}
                                />
                              </a>
                              <p
                                style={{
                                  marginTop: '20px',
                                  marginRight: '20px',
                                }}
                              >
                                {project.likes}Likes{' '}
                              </p>{' '}
                            </div>
                            <div tw="flex flex-col sm:flex-row mt-2 sm:mt-4">
                              <a
                                onClick={() => handleDislike(project._id)}
                                style={{ cursor: 'pointer' }}
                              >
                                <AiFillDislike
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                    color:
                                      selectedProjectId === project._id &&
                                      likeStatus === 'dislike'
                                        ? 'red'
                                        : 'gray',
                                    marginRight: '15px',
                                  }}
                                />
                              </a>{' '}
                              <p style={{ marginTop: '20px' }}>
                                {project.dislikes} Dislikes
                              </p>{' '}
                            </div>{' '}
                          </SecondaryInfoContainer>

                          {/* <StarRating rating={project.ratings} onRatingChange={(newRating) => handleRatingClick(newRating, project._id)}/> */}

                          <br></br>

                          <SecondaryInfoContainer2>
                            <IconWithText>
                              <IconContainer>
                                <LocationIcon />
                              </IconContainer>
                              <Text>{project.location}</Text>
                            </IconWithText>

                            <IconWithText>
                              <IconContainer>
                                <PriceIcon />
                              </IconContainer>
                              <Text>{project.fundGoal} </Text>
                            </IconWithText>
                          </SecondaryInfoContainer2>
                          <br></br>

                          {(project.fundGoalProgress / project.fundGoal) * 100 >
                          100 ? (
                            <Text style={{ color: 'green' }}>
                              {(
                                (project.fundGoalProgress / project.fundGoal) *
                                100
                              ).toFixed(2)}
                              % funded
                            </Text>
                          ) : (
                            <Text>
                              {(
                                (project.fundGoalProgress / project.fundGoal) *
                                100
                              ).toFixed(2)}
                              % funded
                            </Text>
                          )}
                          <br></br>
                          <CardTitle> {project.title}</CardTitle>
                          <CardContent>Category:{project.category}</CardContent>
                        </CardText>
                        <CardAction>
                          <Link to={`/rewards/${project._id}`}>
                            <p style={{ color: '#ffffff' }}>
                              I support this project
                            </p>
                          </Link>
                        </CardAction>
                      </Card>
                    </CardContainer>
                  ))}
          </TabContent>
          <br></br>
        </ContentWithPaddingXl>
        <DecoratorBlob1 />
        <DecoratorBlob2 />
      </Container>
    </>
  );
};
