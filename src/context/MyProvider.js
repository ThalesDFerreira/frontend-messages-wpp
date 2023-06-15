import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log(isAuthenticated);

  const verifyUserLogin = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    verifyUserLogin();
  }, [isAuthenticated]);

  const state = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
};

export default MyProvider;
