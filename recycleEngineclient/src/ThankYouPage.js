import React, { useEffect, useState } from 'react';

export const ThankYouPage = () => {
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
          console.log(resObject);
          localStorage.setItem('accessToken', resObject.token);
          const user = resObject.user;
          window.location.href = `/?data=${JSON.stringify(user)} `;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  return <div>ThankYouPage</div>;
};
