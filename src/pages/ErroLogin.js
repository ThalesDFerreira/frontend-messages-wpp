import React from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../assets/alert.png';
import Home from '../assets/home.png';
import '../styles/pages/ErroLogin.css';

const ErroLogin = () => {
  const navigate = useNavigate();

  const onClickChange = () => {
    navigate('/login');
  };

  return (
    <div className='container-error'>
      <section className='container-error-area w-full h-56 flex justify-center items-center text-slate-100'>
        <div className='bg-black p-8 flex-col auto-cols-max bg-opacity-90'>
          <img
            className='bg-yellow-200 flex justify-center ml-36'
            src={Alert}
            alt='Alerta'
          />
          <h2 className='flex justify-center mt-2'>
            Ops... Ocorreu algum problema!
          </h2>
          <h2 className='flex justify-center mt-2'>
            Clique no botão abaixo e tente realizar o Login!
          </h2>
          <button className='' type='button' onClick={onClickChange}>
            <img
              className='w-10 h-10 rounded-full flex justify-center bg-gray-200 hover:bg-gray-400 p-1 mt-2 ml-36'
              src={Home}
              alt='Home'
            />
            <p className='mt-1 flex-col justify-center ml-36'>Início</p>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ErroLogin;
