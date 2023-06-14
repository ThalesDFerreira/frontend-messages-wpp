import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {
  requestLogin,
  setToken,
  verifyApiKeyAuthorization,
} from '../services/requests';
import toast from 'react-hot-toast';
import mostrar from '../assets/mostrar.png';
import ocultar from '../assets/ocultar.png';
import '../styles/pages/Login.css';
import 'dotenv/config';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const login = async (event) => {
    event.preventDefault();

    try {
      verifyApiKeyAuthorization();
      const token = await requestLogin('/login', { usuario, senha });
      setToken(token);
      localStorage.setItem('token', token);
      setIsLogged(true);
      toast.success('Usuário Logado com Sucesso!');
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
      toast.error('Por favor, tente novamente!');
    }
  };

  const handleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  useEffect(() => {
    setFailedTryLogin(false);
  }, [usuario, senha]);

  if (isLogged) return <Navigate to='/enviar' />;

  return (
    <>
      <section className='user-login-area'>
        <form>
          <h1>Área do usuário</h1>
          <label htmlFor='usuario-input'>
            <input
              id='usuario-input'
              className='login__login_input'
              type='text'
              value={usuario}
              onChange={({ target: { value } }) => setUsuario(value)}
              placeholder='Usuário'
            />
          </label>
          <div className='senha-input-wrapper'>
            <label htmlFor='senha-input'>
              <input
                id='senha-input'
                type={mostrarSenha ? 'text' : 'password'}
                value={senha}
                onChange={({ target: { value } }) => setSenha(value)}
                placeholder='Senha'
              />
            </label>
            <button
              type='button'
              className='mostrar-senha-button'
              onClick={handleMostrarSenha}
            >
              {mostrarSenha ? (
                <img
                  className='mostrar-ocultar-senha'
                  src={mostrar}
                  alt='Mostrar'
                ></img>
              ) : (
                <img
                  className='mostrar-ocultar-senha'
                  src={ocultar}
                  alt='Ocultar'
                ></img>
              )}
            </button>
          </div>
          <button
            className='btn-entrar'
            type='submit'
            onClick={(event) => login(event)}
          >
            Entrar
          </button>
          {failedTryLogin ? (
            <>
              <p>O nome de Usuário ou a senha não estão corretos.</p>
              <p>Por favor, tente novamente.</p>
            </>
          ) : null}
        </form>
      </section>
    </>
  );
};

export default Login;
