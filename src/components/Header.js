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
    <div className='flex justify-between bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-100 py-3 p-4 text-xs h-24'>
      <nav className='mt-2'>
        <div>
          <button type='button' onClick={onClickHome}>
            <img
              className='w-10 h-10 rounded-full flex justify-center bg-gray-200 hover:bg-gray-400 p-1'
              src={Home}
              alt='Home'
            />
            <p className='mt-1 flex justify-center'>Início</p>
          </button>
        </div>
      </nav>
      <div className='mt-2'>
        <h1 className='w-42 h-14 flex items-center text-slate-100 text-base font-bold md:text-xl'>
          WhatsApp Send
        </h1>
      </div>
      <nav className='flex justify-between gap-4 mt-2'>
        {/* {ADICIONAR LOGICA PARA APARECER O BOTAO "PAINEL ADMIN"} */}
        <div>
          <button type='button' onClick={onClickTelefone}>
            <img
              className='w-10 h-10 rounded-full flex justify-center bg-green-500 hover:bg-green-900 p-1'
              src={Telefone}
              alt='Cadastrar Telefone'
            />
            <p className='mt-1 flex justify-center'>Add Tel</p>
          </button>
        </div>
        <div>
          <button type='button' onClick={onClickMensagem}>
            <img
              className='w-10 h-10 rounded-full flex justify-center bg-sky-500 hover:bg-sky-900 p-1'
              src={Message}
              alt='Cadastrar Mensagem'
            />
            <p className='mt-1 flex justify-center'>Add Msn</p>
          </button>
        </div>
        <div>
          <button name='sair' type='button' onClick={onClickSair}>
            <img
              className='w-10 h-10 rounded-full flex justify-center bg-red-500 hover:bg-red-900 p-1'
              src={Sair}
              alt='Sair'
            />
            <p className='mt-1 flex justify-center'>Sair</p>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
