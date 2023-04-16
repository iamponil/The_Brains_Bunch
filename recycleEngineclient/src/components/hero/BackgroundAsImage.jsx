import React, { useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { css } from 'styled-components/macro'; //eslint-disable-line
import Header, {
  NavLink,
  NavLinks,
  PrimaryLink,
  LogoLink,
  NavToggle,
  DesktopNavLinks,
} from '../headers/light.jsx';

import ResponsiveVideoEmbed from '../../helpers/ResponsiveVideoEmbed.jsx';
import axios from 'axios';

import { DropdownMenu } from './../DropdownMenu/ReactDropDownMenu';
import CreatProject from './CreatProject.js';

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover`}
  background-image: url("https://images.unsplash.com/photo-1522071901873-411886a10004?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-primary-500 opacity-25`;

const HeroContainer = tw.div`z-20 relative px-4 sm:px-8 max-w-screen-xl mx-auto`;
const TwoColumn = tw.div`pt-24 pb-32 px-4 flex justify-between items-center flex-col lg:flex-row`;
const LeftColumn = tw.div`flex flex-col items-center lg:block`;
const RightColumn = tw.div`w-full sm:w-5/6 lg:w-1/2 mt-16 lg:mt-0 lg:pl-8`;

const Heading = styled.h1`
  ${tw`text-3xl text-center lg:text-left sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-none`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const SlantedBackground = styled.span`
  ${tw`relative text-primary-500 px-4 -mx-4 py-2`}
  &::before {
    content: '';
    ${tw`absolute inset-0 bg-gray-100 transform -skew-x-12 -z-10`}
  }
`;

const Notification = tw.span`inline-block my-4 pl-3 py-1 text-gray-100 border-l-4 border-blue-500 font-medium text-sm`;

const PrimaryAction = tw.button`px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 text-primary-500 font-bold rounded shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:shadow-outline`;

const StyledResponsiveVideoEmbed = styled(ResponsiveVideoEmbed)`
  padding-bottom: 56.25% !important;
  padding-top: 0px !important;
  ${tw`rounded`}
  iframe {
    ${tw`rounded bg-black shadow-xl`}
  }
`;
const style = { borderRadius: '50%' };

export const Hero = ({ user }) => {
  function NavItem(props) {
    const [open, setOpen] = useState(false);
   
    return (
      <li className="nav-item">
        <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
        </a>

        {open && props.children}
      </li>
    );
  }
  console.log(user);

  const navLinks = [
    <NavLinks key={1}>
       {user ? (<NavLink href={`/ProjectCreat?data=${JSON.stringify(user)}`}>Create Project</NavLink> ) : (
        <NavLink href="/login">Create Project</NavLink> 
           
      )}
        {/* <div style={{ display: 'none' }}>
      <CreatProject user={user}></CreatProject> 
      </div> */}
      <NavLink href="#">Blogs</NavLink>
      <NavLink href="#"> Contributions</NavLink>
      <NavLink>Contact</NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      {user ? (
        <NavItem
          icon={
            <img
              style={style}
              src={
                user.image.startsWith('https')
                  ? user.image
                  : 'http://localhost:5000/uploads/' + user.image
              }
            />
          }
        >
          <DropdownMenu user={user}></DropdownMenu>;
        </NavItem>
      ) : (
        <PrimaryLink href="/login">Login</PrimaryLink>
      )}
    </NavLinks>,
  ];

  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <StyledHeader links={navLinks} />
        <TwoColumn>
          <LeftColumn>
            <Notification>
              We have now launched operations in Africa.
            </Notification>
            <Heading>
              <span>Launch your project</span>
              <br />
              <SlantedBackground>We Got Your Back.</SlantedBackground>
            </Heading>
            <PrimaryAction>Check our community projects</PrimaryAction>
          </LeftColumn>
        </TwoColumn>
      </HeroContainer>
    </Container>
  );
};
