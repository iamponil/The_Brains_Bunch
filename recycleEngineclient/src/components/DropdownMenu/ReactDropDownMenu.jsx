import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { CSSTransition } from 'react-transition-group';
import { TbLogout  } from 'react-icons/tb';
import './dropdown.css';

import {
  BsChevronRight,
  BsChevronLeft,
  BsFillKeyboardFill,
  BsFillCursorFill,
  BsFillShieldLockFill,
} from 'react-icons/bs';
import {
  MdDarkMode,
  MdPrivacyTip,
  MdOutlinePrivateConnectivity,
  MdOutlineLanguage,
} from 'react-icons/md';
import { FaCompactDisc } from 'react-icons/fa';

import { BiCog } from 'react-icons/bi';

import DropdownItem from 'react-bootstrap/esm/DropdownItem.js';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
export const DropdownMenu = ({ user }) => {
  console.log(user);
  const style = { borderRadius: '50%' };

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const handleLogout = async (e) => {
    // e.preventDefault();
    axios.defaults.withCredentials = true;
    console.log(localStorage.getItem('accessToken'));
    try {
      const res = await axios.delete('http://localhost:5000/auth/logout', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (res.data.statusCode === 201) {
        localStorage.removeItem('accessToken');
      }
      window.location = '/login';
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };
  const handleproject= async (e) => {
     e.preventDefault();
     window.location.href = `/Projectbyuser?username=${JSON.stringify(user)}`;
   
  };
  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            leftIcon={
              <img
                style={style}
                src={
                  user.image.startsWith('https')
                    ? user.image
                    : 'http://localhost:5000/uploads/' + user.image
                }
                alt="ouki"
              />
            }
          >
            My Profile
          </DropdownItem>
          <DropdownItem
            leftIcon={<BiCog />}
            rightIcon={<BsChevronRight />}
            goToMenu="settings"
          >
            Settings & Privacy
          </DropdownItem>
          <DropdownItem
            leftIcon={<MdDarkMode />}
            rightIcon={<BsChevronRight />}
            goToMenu="Display"
          >
            Display and accesibility
          </DropdownItem>
          <DropdownItem
            goToMenu={handleproject}
            leftIcon={<BsFillCursorFill />}
            
          >
            My Projects
          </DropdownItem>
          <DropdownItem
            goToMenu={handleLogout}
            leftIcon={<TbLogout />}
            rightIcon={<TbLogout />}
          >
            Log Out
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<BsChevronLeft />}>
            <h2>Settings & Privacy</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<MdPrivacyTip />}>Settings</DropdownItem>
          <DropdownItem leftIcon={<BsFillShieldLockFill />}>
            Privacy Checkup
          </DropdownItem>
          <DropdownItem leftIcon={<MdOutlinePrivateConnectivity />}>
            Privacy center
          </DropdownItem>
          <DropdownItem  leftIcon={<MdOutlineLanguage />}>Language</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'Display'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Display</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<MdDarkMode />}>dark Mode</DropdownItem>
          <DropdownItem leftIcon={<FaCompactDisc />}>Compact Mode</DropdownItem>
          <DropdownItem leftIcon={<BsFillCursorFill />}>
            Show perviews of links
          </DropdownItem>
          <DropdownItem leftIcon={<BsFillKeyboardFill />}>
            keyboard
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};
