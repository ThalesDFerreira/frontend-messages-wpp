import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../context/MyContext';
import '../styles/components/Header.css';
import Home from '../assets/home.png';
import Telefone from '../assets/add_contacts.png';
import Message from '../assets/message.png';
import Sair from '../assets/logout.png';

const Header = () => {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(MyContext);

  const onClickHome = () => {
    navigate('/enviar');
  };

  const onClickTelefone = () => {
    navigate('/cadastro-telefone');
  };

  const onClickMensagem = () => {
    navigate('/cadastro-mensagem');
  };

  const onClickSair = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <button type='button' onClick={onClickHome}>
        <img src={Home} alt='Home' />
        <p>Início</p>
      </button>
      <button type='button' onClick={onClickTelefone}>
        <img src={Telefone} alt='Cadastrar Telefone' />
        <p>Add Tel</p>
      </button>
      <button type='button' onClick={onClickMensagem}>
        <img src={Message} alt='Cadastrar Mensagem' />
        <p>Add Msn</p>
      </button>
      <button type='button' onClick={onClickSair}>
        <img src={Sair} alt='Sair' />
        <p>Sair</p>
      </button>
    </div>
  );
};

export default Header;
