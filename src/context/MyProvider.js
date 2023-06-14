import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyUserLogin = () => {
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));
    console.log(token !== null);
    if (token !== null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    verifyUserLogin();
  }, []);

  const state = {
    isAuthenticated,
  };

  return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
};

export default MyProvider;
