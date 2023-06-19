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
    <footer className='bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-100 py-3 p-4'>
      <div className='container mx-auto text-sm inset-y-0 right-0'>
        <h3 className='flex justify-end'>{empresa.nome}</h3>
        <div className='flex justify-end'>
          <img className='w-6 h-6 mr-1' src={Email} alt='Email' />
          <p>{empresa.email}</p>
        </div>
        <div className='flex justify-end'>
          <img className='w-6 h-6 mr-1' src={WhatsApp} alt='WhatsApp' />
          <a
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
