import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { requestLogin } from '../services/requests';
import MyContext from '../context/MyContext';
import toast from 'react-hot-toast';
import mostrar from '../assets/mostrar.png';
import ocultar from '../assets/ocultar.png';
import '../styles/pages/Login.css';
import Footer from '../components/Footer';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(MyContext);

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isFailAutenticated, setIsFailAutenticated] = useState(false);

  const login = async (event) => {
    event.preventDefault();
    try {
      const token = await requestLogin('/login', { usuario, senha });
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setIsFailAutenticated(false);
      toast.success('Usuário Logado com Sucesso!');
    } catch (error) {
      setIsAuthenticated(false);
      setIsFailAutenticated(true);
      toast.error('Por favor, tente novamente!');
    }
  };

  const handleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  if (isAuthenticated) return <Navigate to='/enviar' />;

  return (
    <div className='container-login'>
      <section className='user-login-area w-full h-12 flex justify-center items-center text-slate-100'>
        <form className='bg-black p-8 rounded-2xl flex-col auto-cols-max bg-opacity-90'>
          <h1 className='text-4xl mb-6 text-center font-bold'>
            Área do usuário
          </h1>
          <label htmlFor='usuario-input'>
            Usuário:{' '}
            <input
              id='usuario-input'
              className='login__login_input p-1 w-36 text-black rounded-md'
              type='text'
              onChange={({ target: { value } }) => setUsuario(value)}
              placeholder='Digite seu usuário...'
            />
          </label>
          <div className='senha-input-wrapper flex p-3'>
            <label htmlFor='senha-input'>
              Senha:{' '}
              <input
                className='login__login_input p-1 w-36 text-black rounded-md'
                id='senha-input'
                type={mostrarSenha ? 'text' : 'password'}
                onChange={({ target: { value } }) => setSenha(value)}
                placeholder='Digite sua senha...'
              />
            </label>
            <button
              type='button'
              className='mostrar-senha-button bg-white rounded-2xl w-6 h-6 ml-2 mt-1 bg-opacity-90'
              onClick={handleMostrarSenha}
            >
              {mostrarSenha ? (
                <img
                  className='mostrar-ocultar-senha w-6 h-6 p-1'
                  src={mostrar}
                  alt='Mostrar'
                ></img>
              ) : (
                <img
                  className='mostrar-ocultar-senha w-6 h-6 p-1'
                  src={ocultar}
                  alt='Ocultar'
                ></img>
              )}
            </button>
          </div>
          <div className='flex justify-center'>
            <button
              className='btn-entrar text-center mb-2 bg-blue-400 text-slate-100 p-2 w-20 flex justify-center rounded-xl font-bold'
              type='submit'
              onClick={(event) => login(event)}
            >
              Entrar
            </button>
          </div>
          {isFailAutenticated ? (
            <>
              <p className='text-red-600 text-center'>O nome de Usuário ou</p>
              <p className='text-red-600 text-center'>
                a senha não estão corretos.
              </p>
              <br />
              <p className='text-red-600 text-center'>
                Por favor, tente novamente.
              </p>
            </>
          ) : null}
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
