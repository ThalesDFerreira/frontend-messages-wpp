import React from 'react';
import '../styles/components/Footer.css';
import Email from '../assets/gmail.png';
import WhatsApp from '../assets/whatsapp.png';

const Footer = () => {
  const empresa = {
    nome: 'Ferreira Empreendimentos',
    email: 'ufrepresentacoes.org@gmail.com',
    telefone: '(16) 992746725',
  };

  return (
    <footer className='bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-100'>
      <div className='container flex-col p-2 justify-center items-center'>
        <div className='flex justify-end items-center h-5'>
          <h3 className='text-xs text-center'>{empresa.nome}</h3>
        </div>
        <div className='flex justify-end items-center h-5'>
          <img className='w-5 h-5 mr-2' src={Email} alt='Email' />
          <p className='text-xs mt-2'>{empresa.email}</p>
        </div>
        <div className='flex justify-end items-center h-5'>
          <img className='w-5 h-5 mr-2' src={WhatsApp} alt='WhatsApp' />
          <a
            className='no-underline text-slate-100 text-xs'
            href='https://api.whatsapp.com/send?phone=5516992746725'
            target='_blank'
            rel='noopener noreferrer'
          >
            {empresa.telefone}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
