import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { requestLogin } from '../services/requests';
import MyContext from '../context/MyContext';
import toast from 'react-hot-toast';
import mostrar from '../assets/mostrar.png';
import ocultar from '../assets/ocultar.png';
import '../styles/pages/Login.css';
import 'dotenv/config';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(MyContext);

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const login = async (event) => {
    event.preventDefault();
    try {
      const token = await requestLogin('/login', { usuario, senha });
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      toast.success('Usuário Logado com Sucesso!');
    } catch (error) {
      localStorage.setItem('isAuthenticated', 'false');
      setIsAuthenticated(false);
      toast.error('Por favor, tente novamente!');
    }
  };

  const handleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  if (isAuthenticated) return <Navigate to='/enviar' />;

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
              onChange={({ target: { value } }) => setUsuario(value)}
              placeholder='Usuário'
            />
          </label>
          <div className='senha-input-wrapper'>
            <label htmlFor='senha-input'>
              <input
                id='senha-input'
                type={mostrarSenha ? 'text' : 'password'}
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
          {isAuthenticated === false ? (
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
