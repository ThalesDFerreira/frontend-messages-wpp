import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import CadastroTelefone from './pages/CadastroTelefone';
import CadastroMensagem from './pages/CadastroMensagem';
import Enviar from './pages/Enviar';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import './styles/App.css';

function App() {
  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <Routes>
        <Route path='/cadastro-mensagem' element={<CadastroMensagem />} />
        <Route path='/cadastro-telefone' element={<CadastroTelefone />} />
        <Route path='/enviar' element={<Enviar />} />
        <Route path='/login' element={<Login />} />
        <Route exact path='/' element={<Navigate to='/login' />} />
      </Routes>
    </>
  );
}

export default App;
