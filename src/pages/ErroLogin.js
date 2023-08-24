import { useNavigate } from "react-router-dom";
import Alerta from "../assets/alert.png";
import Home from "../assets/home.png";
import "../styles/pages/ErroLogin.css";

const ErroLogin = () => {
  const navigate = useNavigate();

  const onClickChange = () => {
    navigate("/login");
  };

  return (
    <div className='container-error flex flex-col min-h-screen'>
      <main className='container-error-area w-full h-56 flex justify-center items-center text-slate-100 flex-grow'>
        <div className='bg-rgb-azul-claro bg-opacity-50 p-8 rounded-2xl flex-col auto-cols-max'>
          <div className='flex justify-center'>
            <img className='bg-yellow-300' src={Alerta} alt='Alerta' />
          </div>
          <div className='flex justify-center'>
            <h2 className='mt-2 text-center text-black'>
              Ops... Ocorreu algum problema!
            </h2>
          </div>
          <div className='flex justify-center'>
            <h2 className='mt-2 text-center text-black'>
              Clique no botão abaixo e tente realizar o Login!
            </h2>
          </div>
          <div className='flex justify-center'>
            <button type='button' onClick={onClickChange}>
              <img
                className='w-10 h-10 rounded-full flex justify-center bg-gray-200 hover:bg-gray-400 p-1 mt-2'
                src={Home}
                alt='Home'
              />
              <p className='mt-1 flex-col justify-center text-black'>Início</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErroLogin;
