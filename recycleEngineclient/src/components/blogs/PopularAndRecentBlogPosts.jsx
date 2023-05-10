import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import textile from '../../images/textile1.jpg'
import green from '../../images/Green Building and Construction.jpg'
import eco from '../../images/Eco-friendly Energy Solutions.jpg';
import def from '../../images/crowdfunding-def.jpg';
import initiative from '../../images/Community Recycling Initiatives.jpg';
import energie from '../../images/Eco-friendly Energy Solutions.jpg'
import agriculture from '../../images/Sustainable Agriculture and Food Waste.jpg'
import { motion } from 'framer-motion';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { SectionHeading } from 'components/misc/Headings.js';
import { Container, ContentWithPaddingXl } from 'components/misc/Layouts.js';
import welcome from '../../images/welcomeRecycle.jpg';
const Row = tw.div`flex flex-col lg:flex-row -mb-10`;
const Heading = tw(SectionHeading)`text-left lg:text-4xl xl:text-5xl`;

const PopularPostsContainer = tw.div`lg:w-2/3`;
const PostsContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
const Post = tw(
  motion.a
)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Image = styled(motion.div)((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-64 bg-cover bg-center rounded`,
]);
const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
const Description = tw.p`mt-2 font-medium text-secondary-100 leading-loose text-sm`;
const AuthorInfo = tw.div`mt-6 flex items-center`;
const AuthorImage = tw.img`w-12 h-12 rounded-full`;
const AuthorNameAndProfession = tw.div`ml-4`;
const AuthorName = tw.h6`font-semibold text-lg`;
const AuthorProfile = tw.p`text-secondary-100 text-sm`;

const RecentPostsContainer = styled.div`
  ${tw`mt-24 lg:mt-0 lg:w-1/3`}
  ${PostsContainer} {
    ${tw`flex flex-wrap lg:flex-col`}
  }
  ${Post} {
    ${tw`flex justify-between mb-10 max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
  }
  ${Title} {
    ${tw`text-base xl:text-lg mt-0 mr-4 lg:max-w-xs`}
  }
  ${AuthorName} {
    ${tw`mt-3 text-sm text-secondary-100 font-normal leading-none`}
  }
  ${Image} {
    ${tw`h-20 w-20 flex-shrink-0`}
  }
`;
const PostTextContainer = tw.div``;

export default function TrendingBlogs() {
  // This setting is for animating the post background image on hover
  const postBackgroundSizeAnimation = {
    rest: {
      backgroundSize: '100%',
    },
    hover: {
      backgroundSize: '110%',
    },
  };

  //Recommended: Only 2 Items
  const popularPosts = [
    {
      postImageSrc:
      `${welcome}` ,
      authorImageSrc:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80',
      title: 'Welcome to Recycle Engine',
      description:
        '👋 Welcome to our crowdfunding project, where dreams take flight and passions find support. We believe that together, we can make a difference and bring impactful ideas to life. With your help, we aim to create a community dedicated to innovation, empowerment, and positive change.',
      authorName: 'Elbich yosra',
      authorProfile: 'Web developer',
      url: 'https://timerse.com',
    },
    {
      postImageSrc:
      `${textile}`,
      authorImageSrc:
        'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80',
      title: 'Sustainable Fashion and Textiles',
      description:
        'Crowdfunding campaigns can support sustainable fashion brands and initiatives that promote recycling and upcycling in the textile industry. This can include projects focused on recycling textiles, creating sustainable fashion lines, and raising awareness about the environmental impact of fast fashion.',
      authorName: 'Memmi Marwa',
      authorProfile: 'Web developer',
      url: 'https://reddit.com',
    },
  ];

  const recentPosts = [
    {
      postImageSrc:
      `${green}`,
      title: 'Green Building and Construction',
      authorName: 'Aaron Patterson',
      url: 'https://reddit.com',
    },
    {
      postImageSrc:
`${eco}`,
      title: 'Eco-friendly Energy Solutions',
      authorName: 'Sam Phipphen',
      url: 'https://reddit.com',
    },
    {
      postImageSrc:
      `${agriculture}`,
      title: 'Sustainable Agriculture and Food Waste',
      authorName: 'Tony Hawk',
      url: 'https://timerse.com',
    },
    {
      postImageSrc:
`${initiative}`,
      title: 'Community Recycling Initiatives',
      authorName: 'Himali Turn',
      url: 'https://timerse.com',
    },
    {
      postImageSrc:
`${def}`,
      title: 'Crowfunding Definition',
      authorName: 'Naomi Watts',
      url: 'https://timerse.com',
    },
  ];

  return (
    <Container>
      <ContentWithPaddingXl>
        <Row>
          <PopularPostsContainer>
            <Heading>Trending Project Blog</Heading>
            <PostsContainer>
              {popularPosts.map((post, index) => (
                <Post
                  key={index}
                  href={post.url}
                  className="group"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <Image
                    transition={{ duration: 0.3 }}
                    variants={postBackgroundSizeAnimation}
                    imageSrc={post.postImageSrc}
                  />
                  <Title>{post.title}</Title>
                  <Description>{post.description}</Description>
                  <AuthorInfo>
                    <AuthorImage src={post.authorImageSrc} />
                    <AuthorNameAndProfession>
                      <AuthorName>{post.authorName}</AuthorName>
                      <AuthorProfile>{post.authorProfile}</AuthorProfile>
                    </AuthorNameAndProfession>
                  </AuthorInfo>
                </Post>
              ))}
            </PostsContainer>
          </PopularPostsContainer>
          <RecentPostsContainer>
            <Heading>Recent blogs</Heading>
            <PostsContainer>
              {recentPosts.map((post, index) => (
                <Post key={index} href={post.url} className="group">
                  <PostTextContainer>
                    <Title>{post.title}</Title>
                    <AuthorName>{post.authorName}</AuthorName>
                  </PostTextContainer>
                  <Image imageSrc={post.postImageSrc} />
                </Post>
              ))}
            </PostsContainer>
          </RecentPostsContainer>
        </Row>
      </ContentWithPaddingXl>
    </Container>
  );
};
