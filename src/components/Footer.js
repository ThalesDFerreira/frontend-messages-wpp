import React from 'react';
import '../styles/components/Footer.css';

const Footer = () => {
  const empresa = {
    nome: 'Ferreira Empreendimentos',
    email: 'ufrepresentacoes.org@gmail.com',
    telefone: '(16) 992746725',
  };

  return (
    <footer className='bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-end py-3 p-4'>
      <div className='container mx-auto text-sm inset-y-0 right-0'>
        <h3>{empresa.nome}</h3>
        <p>{empresa.email}</p>
        <p>
          <a
          
            href='https://api.whatsapp.com/send?phone=5516992746725'
            target='_blank'
            rel='noopener noreferrer'
          >
            {empresa.telefone}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
