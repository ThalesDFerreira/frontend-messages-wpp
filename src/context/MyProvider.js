import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirectBtnHome, setRedirectBtnHome] = useState(false);
  const [redirectBtnTelefone, setRedirectBtnTelefone] = useState(false);
  const [redirectBtnMensagem, setRedirectBtnMensagem] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [usuarioCtx, setUsuarioCtx] = useState('');


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
    redirectBtnHome,
    setRedirectBtnHome,
    redirectBtnTelefone,
    setRedirectBtnTelefone,
    redirectBtnMensagem,
    setRedirectBtnMensagem,
    setUsuarioCtx,
    usuarioCtx,
    setIsAdmin,
    isAdmin,
  };

  return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
};

export default MyProvider;
