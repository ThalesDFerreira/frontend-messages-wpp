/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Navigate } from 'react-router-dom';
// import { requestData } from '../services/requests';
// import toast from 'react-hot-toast';
import '../styles/components/Header.css';
import Home from '../assets/home.png';
import Telefone from '../assets/add_contacts.png';
// import Message from '../assets/message.png';

const Header = () => {
  const onClickChangeHome = ({ target }) => {
    if (target.value === 'btn-home') {
      return <Navigate to='/enviar' />;
    }
  };

  const onClickChangeTelefone = ({ target }) => {
    if (target.value === 'btn-telefone') {
      return <Navigate to='/cadastro-telefone' />;
    }
  };

  // if (redirectEnviar) {}
  // if (redirectTelefone) return <Navigate to='/cadastro-telefone' />;
  // if (redirectMensagem) return <Navigate to='/cadastro-mensagem' />;

  return (
    <div>
      <nav>
        <button type='button' value='btn-home' onClick={onClickChangeHome}>
          <img src={Home} alt='Home' />
          <p>Início</p>
        </button>
      </nav>
      <nav>
        <button
          type='button'
          value='btn-telefone'
          onClick={onClickChangeTelefone}
        >
          <img src={Telefone} alt='Cadastrar Telefone' />
          <p>Add Tel</p>
        </button>
      </nav>
      {/* <nav>
        <button type='button' onClick={onClickChangeMensagem}>
          <img src={Message} alt='Cadastrar Mensagem' />
          <p>Add Msn</p>
        </button>
      </nav> */}
    </div>
  );
};

export default Header;
