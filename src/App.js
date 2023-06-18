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
        <Route exact path='/login' element={<Login />} />
        <Route exact path='*' element={<ErroLogin />} />
        {/* MUDAR PARA "isFailAutenticated" */}
        {true ? (
          <>
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
        ) : (
          <>
            <Route exact path='*' element={<ErroLogin />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
