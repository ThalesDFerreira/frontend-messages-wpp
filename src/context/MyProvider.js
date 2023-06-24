import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  const [autenticado, setAutenticado] = useState(false);
  const [redirecionaBtnHome, setRedirecionaBtnHome] = useState(false);
  const [redirecionaBtnTelefone, setRedirecionaBtnTelefone] = useState(false);
  const [redirecionaBtnMensagem, setRedirecionaBtnMensagem] = useState(false);
  const [admin, setAdmin] = useState(false);


  const verifyUserLogin = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      setAutenticado(true);
    } else {
      setAutenticado(false);
    }
  };

  const verifyUserRole = () => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  };

  useEffect(() => {
    verifyUserLogin();
  }, []);

  useEffect(() => {
    verifyUserRole();
  }, [setAutenticado]);

  const state = {
    autenticado,
    setAutenticado,
    redirecionaBtnHome,
    setRedirecionaBtnHome,
    redirecionaBtnTelefone,
    setRedirecionaBtnTelefone,
    redirecionaBtnMensagem,
    setRedirecionaBtnMensagem,
    setAdmin,
    admin,
  };

  return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
};

export default MyProvider;
