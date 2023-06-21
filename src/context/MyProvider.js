import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirectBtnHome, setRedirectBtnHome] = useState(false);
  const [redirectBtnTelefone, setRedirectBtnTelefone] = useState(false);
  const [redirectBtnMensagem, setRedirectBtnMensagem] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  const verifyUserLogin = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const verifyUserRole = () => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    verifyUserLogin();
  }, []);

  useEffect(() => {
    verifyUserRole();
  }, [isAuthenticated]);

  const state = {
    isAuthenticated,
    setIsAuthenticated,
    redirectBtnHome,
    setRedirectBtnHome,
    redirectBtnTelefone,
    setRedirectBtnTelefone,
    redirectBtnMensagem,
    setRedirectBtnMensagem,
    setIsAdmin,
    isAdmin,
  };

  return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
};

export default MyProvider;
