import React from 'react';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import { MdOutlinePayments } from 'react-icons/md';
import { FaRegAddressCard } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

export const Side = () => {
  const style = {
    height: '100vh',
    inset: '0px',
    backgroundColor: '#fff',
  };

  const linkStyle = tw`no-underline text-gray-700 hover:text-black inline-flex`;
  linkStyle.gap = '10px';
  const menuItemStyle = tw`flex items-center`;
  return (
    <div>
      <Sidebar style={style}>
        <Menu>
          <MenuItem style={menuItemStyle}>
            <Link to="/editProfile" style={linkStyle}>
              <MdOutlinePayments />
              <span tw="ml-2">Account</span>
            </Link>
          </MenuItem>
          <MenuItem style={menuItemStyle}>
            <Link to="/editProfile/editInformation" style={linkStyle}>
              <BiEditAlt />
              <span tw="ml-2">Edit Profile</span>
            </Link>
          </MenuItem>
          <MenuItem style={menuItemStyle}>
            <Link to="/editProfile/editAddress" style={linkStyle}>
              <FaRegAddressCard />
              <span tw="ml-2">Shipping Address</span>
            </Link>
          </MenuItem>
          <MenuItem style={menuItemStyle}>
            <Link to="/editProfile/payment" style={linkStyle}>
              <MdOutlinePayments />
              <span tw="ml-2">Payment Method</span>
            </Link>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};