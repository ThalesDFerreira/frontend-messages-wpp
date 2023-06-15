import React from 'react';
import '../styles/components/Footer.css';

const Footer = () => {
  const empresa = {
    nome: 'Minha Empresa',
    email: 'contato@minhaempresa.com',
    telefone: '(00) 1234-5678'
  };

  return (
    <footer>
      <div>
        <h3>{empresa.nome}</h3>
        <p>Email: {empresa.email}</p>
        <p>Telefone: {empresa.telefone}</p>
      </div>
    </footer>
  );
};

export default Footer;