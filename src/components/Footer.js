import React from 'react';
import '../styles/components/Footer.css';

const Footer = () => {
  const empresa = {
    nome: 'Minha Empresa',
    email: 'contato@minhaempresa.com',
    telefone: '(00) 1234-5678',
  };

  return (
    <footer className=''>
      <div className=''>
        <h3 className=''>{empresa.nome}</h3>
        <p className=''>Email: {empresa.email}</p>
        <p className=''>Telefone: {empresa.telefone}</p>
      </div>
    </footer>
  );
};

export default Footer;
