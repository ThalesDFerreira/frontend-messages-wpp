import React, { useState, useEffect } from 'react';
import {
  requestData,
  requestInsert,
  requestEdit,
  requestDelete,
} from '../services/requests';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Confirmar from '../assets/check.png';
import Cancelar from '../assets/close.png';
import Editar from '../assets/edit.png';
import Deletar from '../assets/delete.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../styles/pages/Admin.css';

const Admin = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState('user');
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [temUsuarios, setTemUsuarios] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [usuarioSelecionadoEditar, setUsuarioSelecionadoEditar] = useState('');
  const [usuarioAtualizado, setUsuarioAtualizado] = useState('');
  const [senhaAtualizada, setSenhaAtualizada] = useState('');
  const [roleAtualizada, setRoleAtualizada] = useState('');
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [usuarioSelecionadoDeletar, setUsuarioSelecionadoDeletar] =
    useState('');
  const [isLoggedWhatsapp, setIsLoggedWhatsapp] = useState(false);


  const requestDataUsers = async () => {
    const result = await requestData('/usuarios');
    if (result.length !== 0) {
      setListaUsuarios(result);
      setTemUsuarios(true);
    } else {
      setTemUsuarios(false);
    }
  };

  const btnRequestInsertUser = async () => {
    try {
      if (listaUsuarios.some((user) => user.usuario === usuario)) {
        return toast.error('Usuário já existente!');
      } else {
        const result = await requestInsert('/usuarios', {
          usuario,
          senha,
          role,
        });
        await requestDataUsers();
        setUsuario('');
        setSenha('');
        setRole('user');
        toast.success(result.mensagem);
      }
    } catch (error) {
      toast(
        '⚠️ Verifique se os campos estão preenchidos corretamente e tente novamente!',
        {
          duration: 3000,
        }
      );
      toast.error('Usuário não inserido!');
    }
  };

  const whatsappIsLogged = async () => {
    const result = await requestData('/logged');
    const { conectado } = result;
    setIsLoggedWhatsapp(conectado);
  };

  useEffect(() => {
    requestDataUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    whatsappIsLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModalEdit = (id, usuario, senha, role) => {
    setUsuarioSelecionadoEditar(id);
    setUsuarioAtualizado(usuario.toLowerCase());
    setSenhaAtualizada(senha);
    setRoleAtualizada(role);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleOpenModalDelete = (id) => {
    setUsuarioSelecionadoDeletar(id);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const btnRequestEditUsers = async () => {
    try {
      const filterUserId = listaUsuarios.filter(
        (user) => user.id === Number(usuarioSelecionadoEditar)
      );

      const filterRemoverIdList = listaUsuarios.filter(
        (user) => user.id !== Number(usuarioSelecionadoEditar)
      );

      const filterListaUsuario = filterRemoverIdList.some(
        (user) => user.usuario === usuarioAtualizado
      );

      if (
        filterUserId[0].usuario === usuarioAtualizado &&
        filterUserId[0].senha === senhaAtualizada &&
        filterUserId[0].role === roleAtualizada
      ) {
        toast.error('Usuário não alterado!');
      } else if (filterListaUsuario) {
        toast.error('Usuário já existe!');
      } else {
        const result = await requestEdit('/usuarios', {
          id: Number(usuarioSelecionadoEditar),
          usuario: usuarioAtualizado,
          senha: senhaAtualizada,
          role: roleAtualizada,
        });
        await requestDataUsers();
        setUsuarioAtualizado('');
        setSenhaAtualizada('');
        setRoleAtualizada('');
        toast.success(result.mensagem);
        handleCloseModalEdit();
      }
    } catch (error) {
      toast(
        '🛑 Desculpe! Estamos enfrentando problemas técnicos.\n\nTente realizar a operação novamente \n\n ou entre em contato com nosso suporte técnico.',
        {
          duration: 3000,
        }
      );
    }
  };

  const btnRequestDeleteUsers = async () => {
    try {
      const idUser = Number(usuarioSelecionadoDeletar);
      const result = await requestDelete(`/usuarios?id=${idUser}`);
      await requestDataUsers();
      toast.success(result.mensagem);
      handleCloseModalDelete();
    } catch (error) {
      toast(
        '🛑 Desculpe! Estamos enfrentando problemas técnicos.\n\nTente realizar a operação novamente \n\n ou entre em contato com nosso suporte técnico.',
        {
          duration: 3000,
        }
      );
    }
  };

  return (
    <div className='container-admin flex flex-col min-h-screen'>
      <Header />
      <main className='container-mensagem p-2 flex-grow bg-rgb-212-212-212'>
        <section className='bg-black rounded-2xl flex-col auto-cols-max bg-opacity-80 text-slate-100 mb-5 overflow-auto'>
          <h1 className='p-2 flex justify-center text-xl'>
            Adicionar usuário:
          </h1>
          <div className='flex flex-col text-slate-100'>
            <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                <div className='overflow-hidden'>
                  <table className='table-contats min-w-full text-center text-sm font-light md:text-lg'>
                    <thead className='border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900'>
                      <tr>
                        <th scope='col' className='px-2 py-2'>
                          Usuário
                        </th>
                        <th scope='col' className='px-2 py-2'>
                          Senha
                        </th>
                        <th scope='col' className='px-2 py-2'>
                          Permissão
                        </th>
                        <th scope='col' className='px-2 py-2'>
                          Cadastrar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='border-b dark:border-neutral-500'>
                        <td className='whitespace-nowrap px-2 py-2 font-medium'>
                          <input
                            className='p-1 text-black rounded-md w-28 md:w-full'
                            type='text'
                            onChange={({ target: { value } }) =>
                              setUsuario(value.toLowerCase())
                            }
                            value={usuario}
                            placeholder='Digite aqui ...'
                          />
                        </td>
                        <td className='whitespace-nowrap px-2 py-2'>
                          <input
                            className='p-1 text-black rounded-md w-28 md:w-full'
                            type='text'
                            onChange={({ target: { value } }) =>
                              setSenha(value)
                            }
                            value={senha}
                            placeholder='Digite aqui ...'
                          />
                        </td>
                        <td className='whitespace-nowrap px-2 py-2'>
                          <select
                            className='py-1 text-black rounded-md w-24 md:w-full'
                            onChange={({ target: { value } }) => setRole(value)}
                            value={role}
                          >
                            <option value='user'>user</option>
                            <option value='admin'>admin</option>
                          </select>
                        </td>
                        <td className='whitespace-nowrap px-2 py-2'>
                          <button
                            className='btn-entrar text-center mb-2 bg-blue-400 hover:bg-blue-600 text-slate-100 p-2 w-20 flex justify-center rounded-xl font-bold'
                            type='button'
                            onClick={btnRequestInsertUser}
                          >
                            Enviar
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='bg-black rounded-2xl flex-col auto-cols-max bg-opacity-80 text-slate-100 mb-5 overflow-auto h-96'>
          <h1 className='p-2 flex justify-center text-xl'>
            Lista de usuários:
          </h1>
          <div className='flex flex-col text-slate-100'>
            <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                <div className='overflow-hidden'>
                  <table className='table-contats min-w-full text-center text-sm font-light md:text-lg'>
                    <thead className='border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900'>
                      <tr>
                        <th scope='col' className='px-2 py-2'>
                          Usuário
                        </th>
                        <th scope='col' className='px-2 py-2'>
                          Senha
                        </th>
                        <th scope='col' className='px-2 py-2'>
                          Permissão
                        </th>
                        <th scope='col' className='px-2 py-2'>
                          Editar
                        </th>
                        <th scope='col' className='px-2 py-2'>
                          Deletar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {temUsuarios ? (
                        listaUsuarios.map((user) => (
                          <tr
                            className='border-b dark:border-neutral-500'
                            key={`user-${user.id}`}
                          >
                            <td className='whitespace-nowrap px-2 py-2 font-medium'>
                              {user.usuario}
                            </td>
                            <td className='whitespace-nowrap px-2 py-2'>
                              {user.senha}
                            </td>
                            <td className='whitespace-nowrap px-2 py-2'>
                              {user.role}
                            </td>
                            <td className='whitespace-nowrap px-2 py-2'>
                              <button
                                className='bg-gray-200 hover:bg-gray-400 p-1 rounded-xl'
                                type='button'
                                onClick={() =>
                                  handleOpenModalEdit(
                                    user.id,
                                    user.usuario,
                                    user.senha,
                                    user.role
                                  )
                                }
                              >
                                <img src={Editar} alt='Editar' />
                              </button>
                            </td>
                            <td className='whitespace-nowrap px-2 py-2'>
                              <button
                                className='bg-gray-200 hover:bg-gray-400 p-1 rounded-xl'
                                type='button'
                                onClick={() => handleOpenModalDelete(user.id)}
                              >
                                <img src={Deletar} alt='Deletar' />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr key={'no-message'}>
                          <td>---</td>
                          <td>Não há usuários</td>
                          <td>---</td>
                          <td>---</td>
                          <td>---</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div>
          <Modal show={openModalEdit} onHide={handleCloseModalEdit}>
            <Modal.Body className='flex justify-center'>
              <table>
                <thead>
                  <tr>
                    <th>Usuário</th>
                    <th>Senha</th>
                    <th>Permissão</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        className='p-1 text-black w-36 rounded-md bg-rgb-212-212-212 mr-1'
                        type='text'
                        onChange={({ target: { value } }) =>
                          setUsuarioAtualizado(value.toLowerCase())
                        }
                        value={usuarioAtualizado}
                        placeholder='Digite aqui ...'
                      />
                    </td>
                    <td>
                      <input
                        className='p-1 text-black w-36 rounded-md bg-rgb-212-212-212 mr-1'
                        type='text'
                        onChange={({ target: { value } }) =>
                          setSenhaAtualizada(value)
                        }
                        value={senhaAtualizada}
                        placeholder='Digite aqui ...'
                      />
                    </td>
                    <td>
                      <select
                        className='p-1 text-black rounded-md bg-rgb-212-212-212'
                        onChange={({ target: { value } }) =>
                          setRoleAtualizada(value)
                        }
                        value={roleAtualizada}
                      >
                        <option value='user'>user</option>
                        <option value='admin'>admin</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleCloseModalEdit}>
                <img className='w-7 h-7' src={Cancelar} alt='Cancelar' />
              </Button>
              <Button onClick={btnRequestEditUsers}>
                <img className='w-7 h-7' src={Confirmar} alt='Confirmar' />
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div>
          <Modal show={openModalDelete} onHide={handleCloseModalDelete}>
            <Modal.Body>
              Tem certeza que deseja excluir esse usuário?
            </Modal.Body>
            <Modal.Footer>
              <Button type='button' onClick={handleCloseModalDelete}>
                Não
              </Button>
              <Button type='button' onClick={btnRequestDeleteUsers}>
                Sim
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {isLoggedWhatsapp ? (
          <section>
            <h3>Aparelho do usuário conectado! 🚀🚀🚀</h3>
          </section>) : (
          <section>
            <div className='flex justify-center'>
              <h1>QR Code</h1>
            </div>
            <div className='flex justify-center'>
              <img
                className='w-52 h-52'
                src={`${process.env.REACT_APP_API_PORT}/images/qr-code.png`}
                alt='placeholder'
              />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
