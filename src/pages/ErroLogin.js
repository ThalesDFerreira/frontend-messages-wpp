import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Alert from '../assets/alert.png';
import Home from '../assets/home.png';
import '../styles/pages/ErroLogin.css';

const ErroLogin = () => {
  const [isRedirect, setIsRedirect] = useState(false);

  const onClickChange = () => {
    setIsRedirect(true);
  };

  if (isRedirect) return <Navigate to='/login' />;

  return (
    <>
      <div>
        <img src={Alert} alt='Alerta' />
        <h2>Ops... Ocorreu algum problema!</h2>
        <h2>Clique no botão abaixo e tente realizar o Login!</h2>
      </div>
      <div>
        <button type='button' onClick={onClickChange}>
          <img src={Home} alt='Home' />
        </button>
      </div>
    </>
  );
};

export default ErroLogin;
