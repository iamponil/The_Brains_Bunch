import React, { useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { css } from 'styled-components/macro'; //eslint-disable-line
import Headers, {
  NavLink,
  NavLinks,
  PrimaryLink,
  LogoLink,
  NavToggle,
  DesktopNavLinks,
} from '../headers/light.jsx';

import { DropdownMenu } from './../DropdownMenu/ReactDropDownMenu';

const StyledHeader = styled(Headers)`
  ${tw`pt-8 max-w-none`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-500 hover:border-gray-400  hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
const Container = styled.div`
  ${tw`relative  -mt-8 bg-center bg-cover`}
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0  opacity-50`;

const HeroContainer = tw.div`z-20 relative px-4 sm:px-8  mx-auto`;

const style = { borderRadius: '50%' };

export const Header = () => {
  const [User, setUser] = useState(null);
  useEffect(() => {
    // start initial tasks here
    const getUser = () => {
      fetch('http://localhost:5000/users/getOneByPayloadId/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) return response.json();
          throw new Error('authentication has been failed!');
        })
        .then((resObject) => {
          const user = resObject.user;
          setUser((prevState) => ({ ...prevState, user }));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
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

  const navLinks = [
    
    <NavLinks  key={1}>
        
        <NavLink href="/" >Home </NavLink>
        <NavLink href="/Projectbyuser" >My Projects </NavLink>
        <NavLink href="/projectss">All Projects </NavLink>
        <NavLink href="/ContactUs">Contact us  </NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      {User && (
        
        <NavItem
          icon={
            <img
              style={style}
              src={
                User.user.image.startsWith('https')
                  ? User.user.image
                  : 'http://localhost:5000/uploads/' + User.user.image
              }
            />
          }
        >
          <DropdownMenu></DropdownMenu>
        </NavItem>

       
      )}
     

    </NavLinks>,
    
  ];

  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <StyledHeader links={navLinks} />
      </HeroContainer>
    </Container>
  );
};