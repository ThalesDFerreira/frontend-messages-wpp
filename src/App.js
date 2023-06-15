import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CadastroTelefone from './pages/CadastroTelefone';
import CadastroMensagem from './pages/CadastroMensagem';
import Enviar from './pages/Enviar';
import Login from './pages/Login';
import ErroLogin from './pages/ErroLogin';
import MyContext from './context/MyContext';
import { Toaster } from 'react-hot-toast';
import './styles/App.css';

const App = () => {
  const { isAuthenticated } = useContext(MyContext);

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <Routes>
        <Route exact path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<ErroLogin />} />
        {isAuthenticated ? (
          <>
            <Route path='/cadastro-mensagem' element={<CadastroMensagem />} />
            <Route path='/cadastro-telefone' element={<CadastroTelefone />} />
            <Route path='/enviar' element={<Enviar />} />
          </>
        ) : (
          <Route path='*' element={<Navigate to='/not-found' />} />
        )}
      </Routes>
    </>
  );
};

export default App;
