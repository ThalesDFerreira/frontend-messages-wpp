import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { requestLogin, requestData } from '../services/requests';
import MyContext from '../context/MyContext';
import toast from 'react-hot-toast';
import mostrar from '../assets/mostrar.png';
import ocultar from '../assets/ocultar.png';
import '../styles/pages/Login.css';
import Footer from '../components/Footer';

const Login = () => {
  const { autenticado, setAutenticado } = useContext(MyContext);

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [falhaAutenticacao, setFalhaAutenticacao] = useState(false);

  const login = async (event) => {
    event.preventDefault();
    try {
      const token = await requestLogin('/login', { usuario, senha });
      localStorage.setItem('token', token);
      await verifyIsAdmin();
      setAutenticado(true);
      setFalhaAutenticacao(false);
      toast.success(token.mensagem);
    } catch (error) {
      setAutenticado(false);
      setFalhaAutenticacao(true);
      toast.error('Por favor, tente novamente!');
    }
  };

  const verifyIsAdmin = async () => {
    const users = await requestData('/usuarios');
    const findUserLogin = users.filter((user) => user.usuario === usuario);
    localStorage.setItem('role', findUserLogin[0].role);
  };

  const handleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  if (autenticado) return <Navigate to='/enviar' />;

  return (
    <div className='container-login flex flex-col min-h-screen'>
      <main className='user-login-area w-full h-12 flex justify-center items-center text-slate-800 flex-grow'>
        <form className='bg-rgb-azul-claro bg-opacity-50 p-8 rounded-2xl flex-col auto-cols-max'>
          <h1 className='text-4xl mb-6 text-center font-bold'>
            XXXXX
          </h1>
          <div>
            <div className='flex-col'>
              <label htmlFor='usuario-input'>Usuário:</label>
              <input
                id='usuario-input'
                className='login__login_input p-1 w-full text-black rounded-md'
                type='text'
                onChange={({ target: { value } }) => setUsuario(value)}
                placeholder='Digite seu usuário...'
              />
            </div>
            <div className='senha-input-wrapper flex-col mt-3'>
              <label htmlFor='senha-input'>Senha:</label>
              <div className='flex'>
                <input
                  className='login__login_input p-1 w-full text-black rounded-md'
                  id='senha-input'
                  type={mostrarSenha ? 'text' : 'password'}
                  onChange={({ target: { value } }) => setSenha(value)}
                  placeholder='Digite sua senha...'
                />
                <div>
                  <button
                    type='button'
                    className='mostrar-senha-button w-6 h-6 ml-2 mt-1 bg-opacity-90'
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
              </div>
            </div>
            <div className='flex justify-center mt-3'>
              <button
                className='btn-entrar text-center mb-2 bg-blue-500 hover:bg-blue-600 text-slate-800 p-2 w-20 flex justify-center rounded-xl font-bold'
                type='submit'
                onClick={(event) => login(event)}
              >
                Entrar
              </button>
            </div>
          </div>
          {falhaAutenticacao ? (
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
      </main>
      <Footer />
    </div>
  );
};

export default Login;
