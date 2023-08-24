import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../context/MyContext";
import "../styles/components/Header.css";
import Home from "../assets/home.png";
import Telefone from "../assets/add_contacts.png";
import Mensagem from "../assets/message.png";
import Sair from "../assets/logout.png";
import AdminImg from "../assets/admin.png";

const Header = () => {
  const navigate = useNavigate();

  const { setAutenticado, setAdmin, admin } = useContext(MyContext);

  const onClickHome = () => {
    navigate("/enviar");
  };

  const onClickTelefone = () => {
    navigate("/cadastro-telefone");
  };

  const onClickMensagem = () => {
    navigate("/cadastro-mensagem");
  };

  const onClickSair = () => {
    setAutenticado(false);
    localStorage.clear();
    navigate("/login");
    setAdmin(false);
  };

  const onClickAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className='flex justify-between bg-gradient-to-l from-sky-500 to-indigo-300 text-slate-100 py-3 p-4 text-xs h-24'>
      <nav className='mt-2'>
        <div className='img-header'>
          <button type='button' onClick={onClickHome}>
            <img
              className='w-10 h-10 flex justify-center p-1'
              src={Home}
              alt='Home'
            />
            <p className='flex justify-center text-black'>Início</p>
          </button>
        </div>
      </nav>
      <div className='mt-2'>
        <h1 className='w-42 h-14 flex items-center ml-52 text-slate-100 text-base font-bold md:text-xl'>
          WhatsApp Send
        </h1>
      </div>
      <nav className='flex justify-between gap-4 mt-2'>
        {admin && (
          <div className='img-header'>
            <button type='button' onClick={onClickAdmin}>
              <img
                className=' w-10 h-10 rounded-full flex justify-center p-1'
                src={AdminImg}
                alt='Painel Admin'
              />
              <p className='flex justify-center text-black'>Admin</p>
            </button>
          </div>
        )}
        <div className='img-header'>
          <button type='button' onClick={onClickTelefone}>
            <img
              className=' w-10 h-10 flex justify-center p-1'
              src={Telefone}
              alt='Cadastrar Telefone'
            />
            <p className='flex justify-center text-black'>Add Tel</p>
          </button>
        </div>
        <div className='mr-10 img-header'>
          <button type='button' onClick={onClickMensagem}>
            <img
              className=' w-10 h-10 flex justify-center p-1'
              src={Mensagem}
              alt='Cadastrar Mensagem'
            />
            <p className='flex justify-center text-black'>Add Msn</p>
          </button>
        </div>
        <div className='img-header-sair'>
          <button name='sair' type='button' onClick={onClickSair}>
            <div>
              <img
                className='w-10 h-10 flex justify-center p-1'
                src={Sair}
                alt='Sair'
              />
            </div>
            <p className='flex justify-center text-black'>Sair</p>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
