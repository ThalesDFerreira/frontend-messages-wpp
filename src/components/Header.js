import React from 'react';
import { Navigate } from 'react-router-dom';
// import { requestData } from '../services/requests';
// import toast from 'react-hot-toast';
import '../styles/components/Header.css';
import Home from '../assets/home.png';
// import Telefone from '../assets/add_contacts.png';
// import Message from '../assets/message.png';

const Header = () => {
  const onClickChange = () => {
    <Navigate to='/enviar' />;
  };

  return (
    <div>
      <nav>
        <button type='button' onClick={onClickChange}>
          <img src={Home} alt='Home' />
          <p>Início</p>
        </button>
      </nav>
      {/* <nav>
        <button type='button' onClick={}>
          <img src={Telefone} alt='Cadastrar Telefone' />
          <p>Add Tel</p>
        </button>
      </nav>
      <nav>
        <button type='button' onClick={}>
          <img src={Message} alt='Cadastrar Mensagem' />
          <p>Add Msn</p>
        </button>
      </nav> */}
    </div>
  );
};

export default Header;
