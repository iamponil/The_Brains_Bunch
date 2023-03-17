import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

export const ThankYouPage = () => {
  const style = {
    marginTop: '20%',
    marginLeft: '50%',
    height: '100px',
    width: '100px',
    color: '#A090CF',
  };
  useEffect(() => {
    const getUser = () => {
      fetch('http://localhost:5000/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) return response.json();
          throw new Error('authentication has been failed!');
        })
        .then((resObject) => {
          console.log(resObject.user);
          localStorage.setItem('accessToken', resObject.token);
          const data = resObject.user;
          window.location.href = `/?data=${JSON.stringify(data)} `;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  return <ReactLoading style={style} type={'spinningBubbles'} />;
};
