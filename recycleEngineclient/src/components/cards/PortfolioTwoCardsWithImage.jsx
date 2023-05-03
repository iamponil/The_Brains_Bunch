import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading } from "components/misc/Headings.js";
import { PrimaryLink as PrimaryLinkBase } from "components/misc/Links.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as TimeIcon } from "feather-icons/dist/icons/clock.svg";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-icon.svg";
import Header from "components/headers/light";
import { Link } from "react-router-dom";
const Container = tw.div`relative`;
const Content = tw.div` mx-auto py-20 lg:py-24`;
const ThreeColumn = tw.div`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`;

const Column = tw.div`xl:mr-12 xl:last:mr-0`;
const HeadingColumn = styled(Column)(props => [
  tw`w-full xl:w-10/12`,
  props.textOnLeft ? tw`xl:order-first` : tw`xl:order-last xl:ml-12 xl:mr-0`
]);
const CardColumn = tw(Column)`w-full   mt-16 xl:mt-0 xl:last:ml-auto`;

const HeadingInfoContainer = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;
const HeadingTitle = tw(SectionHeading)`mt-4 xl:text-left leading-tight`;
const HeadingDescription = tw.p`text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-8`;
const PrimaryLink = styled(PrimaryLinkBase)`
  ${tw`inline-flex justify-center xl:justify-start items-center mt-8 text-lg`}
 const  svg {
    ${tw`ml-2 w-5 h-5`}
  }
`;
const Card = tw(motion.a)`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`;
//const Card = tw.div`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-80 bg-cover bg-center rounded`
]);
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardText = tw.div`mt-4`;

const CardHeader = tw.div`flex justify-between items-center`;
const CardCompany = tw.div`text-primary-500 font-bold text-lg`;
const CardType = tw.div`font-semibold text-sm text-gray-600`;
const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardTitle = tw.h5`text-xl mt-4 font-bold`;

const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-center justify-between  sm:items-center font-semibold tracking-wide text-gray-600 uppercase text-xs`}
`;

const CardMetaFeature = styled.div`
  ${tw`flex items-center mt-4 mr-4 last:mr-0`}
  svg {
    ${tw`w-5 h-5 mr-1`}
  }
`;
const CardAction = tw(PrimaryButtonBase)`w-full mt-6  justify-center` ;

export default ({
  subheading = "Our Portfolio",
  headingHtmlComponent = (
    <>
      We've done some <span tw="text-primary-500">amazing projects.</span>
    </>
  ),
  linkText = "View all Projects",
  cardLinkText = "Delete this project",
   roundedHeaderButton  
}) => {

  const [projects, setproject] = useState([]);
  const [error, setErrors] = useState(null);
  const searchParams = new URLSearchParams(window.location.search);
  const dataParam = searchParams.get('data');
  const user = JSON.parse(dataParam);
  console.log(user);


  useEffect(() => {
    if (user && user._id) {
      fetch(`http://localhost:5000/projects/GetProjectsByUser/${user._id}`) 
        .then(res => {
          return res.json()
        })
        .then(data => {
          console.log(data);
          setproject(data);
        })
        .catch(err => {
          console.error(err);
          setErrors(err);
        });
    }
  }, []);
     
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  const handleClickDeleteOne = (id)=>
  {
    fetch('http://localhost:5000/projects/deleteProject/'+id,{
      method : 'DELETE' ,   headers: headers
    })
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      console.log(data);
      window.location.reload(false);
    })
  } 
  return (
    <>  
    
    <Header roundedHeaderButton={roundedHeaderButton }  />
    <HeadingColumn >
    <HeadingInfoContainer>
     
      <HeadingTitle>{headingHtmlComponent}</HeadingTitle>
      
<div tw="text-primary-500 inline-flex justify-center xl:justify-start items-center mt-8 text-lg">
  <a  tw="text-primary-500 " href='/AllProjects'> {linkText} </a>
   <ArrowRightIcon tw="w-5 h-5 mr-1" />
   </div>

    </HeadingInfoContainer>
  </HeadingColumn>
    <Container >
       
      <Content>
        
       
          <ThreeColumn style={{marginRight:'50px' , marginLeft:'50px'}} >
          {projects.map((project, index) => (
          <CardColumn key={index}>
       <Card className="group"  initial="rest" whileHover="hover" animate="rest">
          <CardImageContainer imageSrc={`http://localhost:5000/uploads/${project.image}`}>
                   
                    <CardHoverOverlay
                      variants={{
                        hover: {
                          opacity: 1,
                          height: "auto"
                        },
                        rest: {
                          opacity: 0,
                          height: 0
                        }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                       <Link to={`/project/${project._id}`}>Preview</Link>
                    </CardHoverOverlay>
                  </CardImageContainer>
            <CardText>
              <CardHeader>
              <Link to={`/basics/${project.title}`}> <CardCompany> Update {project.title}</CardCompany> </Link> 
              </CardHeader>
              <CardTitle>{project.category}</CardTitle>
              <CardMeta style={{marginLeft:'10px' , marginRight:'50px' }}>
                <CardMetaFeature>
                  <TimeIcon /> {project.duration}
                </CardMetaFeature>
                <CardMetaFeature>
                  <LocationIcon /> {project.location}
                </CardMetaFeature>
              </CardMeta>
              <CardAction onClick={() =>{handleClickDeleteOne(project._id)}}>{cardLinkText}</CardAction>
            </CardText>
          </Card>
        </CardColumn>
          ))}
        </ThreeColumn> 
      </Content>
    </Container>
    </>
  );
};
