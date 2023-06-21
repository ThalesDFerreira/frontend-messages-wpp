import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CadastroTelefone from './pages/CadastroTelefone';
import CadastroMensagem from './pages/CadastroMensagem';
import Enviar from './pages/Enviar';
import Login from './pages/Login';
import ErroLogin from './pages/ErroLogin';
import Admin from './pages/Admin';
import MyContext from './context/MyContext';
import { Toaster } from 'react-hot-toast';
import './App.css';

const App = () => {
  const { isAuthenticated, isAdmin  } = useContext(MyContext);
  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <Routes>
        <Route exact path='/' element={<Navigate to='/login' />} />
        <Route exact path='/login' element={<Login />} />
        {isAuthenticated && (
          <>
            {isAdmin && <Route exact path='/admin' element={<Admin />} />}
            <Route
              exact
              path='/cadastro-mensagem'
              element={<CadastroMensagem />}
            />
            <Route
              exact
              path='/cadastro-telefone'
              element={<CadastroTelefone />}
            />
            <Route exact path='/enviar' element={<Enviar />} />
          </>
        )}
        <Route exact path='*' element={<ErroLogin />} />
      </Routes>
    </>
  );
};

export default App;
