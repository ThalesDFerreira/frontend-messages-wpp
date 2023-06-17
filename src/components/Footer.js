import React from 'react';
import '../styles/components/Footer.css';

const Footer = () => {
  const empresa = {
    nome: 'Ferreira Empreendimentos',
    email: 'ufrepresentacoes.org@gmail.com',
    telefone: '(16) 992746725',
  };

  return (
    <footer className='bg-red-600 text-white text-center py-6'>
      <div className='container mx-auto flex justify-end'>
        <h3 className=''>{empresa.nome}</h3>
        <p className=''>Email: {empresa.email}</p>
        <p className='text-white'>
          WhatsApp:{' '}
          <a
            className=''
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
