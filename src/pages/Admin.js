import { useState, useEffect } from "react";
import {
  requestData,
  requestInsert,
  requestEdit,
  requestDelete,
} from "../services/requests";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Confirmar from "../assets/check.png";
import Cancelar from "../assets/close.png";
import Editar from "../assets/edit.png";
import Deletar from "../assets/delete.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../styles/pages/Admin.css";
import ListUserPng from "../assets/users.png";
import ListUserPngClick from "../assets/users_click.png";
import ListTelPng from "../assets/list_contacts.png";
import ListTelPngClick from "../assets/list_contacts_click.png";
import WppPng from "../assets/whatsapp.png";
import WppPngClick from "../assets/instanciar_whatsapp_click.png";

const Admin = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("user");
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [temUsuarios, setTemUsuarios] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [usuarioSelecionadoEditar, setUsuarioSelecionadoEditar] = useState("");
  const [usuarioAtualizado, setUsuarioAtualizado] = useState("");
  const [senhaAtualizada, setSenhaAtualizada] = useState("");
  const [roleAtualizada, setRoleAtualizada] = useState("");
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [usuarioSelecionadoDeletar, setUsuarioSelecionadoDeletar] =
    useState("");
  const [listaUsuariosClone, setListaUsuariosClone] = useState([]);
  const [optionsFindUser, setOptionsFindUser] = useState("usuario");
  const [numeroInstancia, setNumeroInstancia] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [listaTelefonesCadastrados, setListaTelefonesCadastrados] = useState(
    []
  );
  const [listaTelefonesCadastradosClone, setListaTelefonesCadastradosClone] =
    useState([]);
  const [existeTelefoneCadastrado, setExisteTelefoneCadastrado] =
    useState(false);
  const [
    openModalDeleteTelefoneCadastrado,
    setOpenModalDeleteTelefoneCadastrado,
  ] = useState(false);
  const [
    telefoneCadastradoSelecionadoDeletar,
    setTelefoneCadastradoSelecionadoDeletar,
  ] = useState("");
  const [optionsFindTelCadastrado, setOptionsFindTelCadastrado] =
    useState("telefone");
  const [mostrarListUsuarios, setMostrarListUsuarios] = useState(false);
  const [mostrarListTelefones, setMostrarListTelefones] = useState(false);
  const [mostrarInstanciarWpp, setMostrarInstanciarWpp] = useState(false);

  const requestDataUsers = async () => {
    const result = await requestData("/usuarios");
    if (result.length !== 0) {
      setListaUsuarios(result);
      setTemUsuarios(true);
      setListaUsuariosClone(result);
    } else {
      setTemUsuarios(false);
    }
  };

  const requestDataTelCadastrado = async () => {
    const result = await requestData("/logged");
    if (result.length !== 0) {
      setListaTelefonesCadastrados(result);
      setListaTelefonesCadastradosClone(result);
      setExisteTelefoneCadastrado(true);
    } else {
      setExisteTelefoneCadastrado(false);
    }
  };

  const btnRequestInsertUser = async () => {
    try {
      if (listaUsuarios.some((user) => user.usuario === usuario)) {
        return toast.error("Usuário já existente!");
      } else {
        const result = await requestInsert("/usuarios", {
          usuario,
          senha,
          role,
        });
        await requestDataUsers();
        setUsuario("");
        setSenha("");
        setRole("user");
        toast.success(result.mensagem);
      }
    } catch (error) {
      toast(
        "⚠️ Verifique se os campos estão preenchidos corretamente e tente novamente!",
        {
          duration: 3000,
        }
      );
      toast.error("Usuário não inserido!");
    }
  };

  useEffect(() => {
    requestDataUsers();
    requestDataTelCadastrado();
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

  const handleOpenModalDeleteTelCadastrado = (id) => {
    setTelefoneCadastradoSelecionadoDeletar(id);
    setOpenModalDeleteTelefoneCadastrado(true);
  };

  const handleCloseModalDeleteTelCadastrado = () => {
    setOpenModalDeleteTelefoneCadastrado(false);
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
        toast.error("Usuário não alterado!");
      } else if (filterListaUsuario) {
        toast.error("Usuário já existe!");
      } else {
        const result = await requestEdit("/usuarios", {
          id: Number(usuarioSelecionadoEditar),
          usuario: usuarioAtualizado,
          senha: senhaAtualizada,
          role: roleAtualizada,
        });
        await requestDataUsers();
        setUsuarioAtualizado("");
        setSenhaAtualizada("");
        setRoleAtualizada("");
        toast.success(result.mensagem);
        handleCloseModalEdit();
      }
    } catch (error) {
      toast(
        "🛑 Desculpe! Estamos enfrentando problemas técnicos.\n\nTente realizar a operação novamente \n\n ou entre em contato com nosso suporte técnico.",
        {
          duration: 3000,
        }
      );
    }
  };

  const btnRequestDeleteUsers = async () => {
    try {
      const idUser = usuarioSelecionadoDeletar;
      const result = await requestDelete(`/usuarios?id=${idUser}`);
      await requestDataUsers();
      toast.success(result.mensagem);
      handleCloseModalDelete();
    } catch (error) {
      toast(
        "🛑 Desculpe! Estamos enfrentando problemas técnicos.\n\nTente realizar a operação novamente \n\n ou entre em contato com nosso suporte técnico.",
        {
          duration: 3000,
        }
      );
    }
  };

  const btnRequestDeleteTelCadastrado = async () => {
    try {
      const idTel = telefoneCadastradoSelecionadoDeletar;
      const result = await requestDelete(`/logged?id=${idTel}`);
      await requestDataTelCadastrado();
      toast.success(result.mensagem);
      handleCloseModalDeleteTelCadastrado();
    } catch (error) {
      toast(
        "🛑 Desculpe! Estamos enfrentando problemas técnicos.\n\nTente realizar a operação novamente \n\n ou entre em contato com nosso suporte técnico.",
        {
          duration: 3000,
        }
      );
    }
  };

  const inputPesquisaTelCadastrados = async ({ target }) => {
    const valueInput = target.value;
    let newArray = [];
    const arraySearch = [...listaTelefonesCadastradosClone];

    if (optionsFindUser === "telefone" && valueInput !== "") {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (element.numero_telefone.includes(valueInput)) {
          newArray.push(element);
        }
      }
      setListaTelefonesCadastrados(newArray);
    }

    if (optionsFindUser === "conectado" && valueInput !== "") {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (element.conectado.includes(valueInput)) {
          newArray.push(element);
        }
      }
      setListaTelefonesCadastrados(newArray);
    }

    if (valueInput === "") {
      setListaTelefonesCadastrados(listaTelefonesCadastradosClone);
    }
  };

  const inputPesquisaUsuarios = async ({ target }) => {
    const valueInput = target.value;
    let newArray = [];
    const arraySearch = [...listaUsuariosClone];

    if (optionsFindUser === "usuario" && valueInput !== "") {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (element.usuario.includes(valueInput)) {
          newArray.push(element);
        }
      }
      setListaUsuarios(newArray);
    }

    if (optionsFindUser === "permissão" && valueInput !== "") {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (element.role.includes(valueInput)) {
          newArray.push(element);
        }
      }
      setListaUsuarios(newArray);
    }

    if (valueInput === "") {
      setListaUsuarios(listaUsuariosClone);
    }
  };

  const enableButton = () => {
    if (numeroInstancia.length === 11) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    enableButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numeroInstancia]);

  const btnRequestInstanciartUser = async () => {
    try {
      fetchImages();
      const result = await requestInsert("/cadastrar-whatsapp", {
        numero: numeroInstancia,
      });
      await requestDataTelCadastrado();
      toast.success(result.mensagem);
    } catch (error) {
      toast.error(`⚠️${error}`);
    }
  };

  const fetchImages = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_PORT}/qr-code`
    );
    const imageQrCode = document.getElementById("conatiner-qrcode");
    imageQrCode.innerHTML = "";
    const image = document.createElement("img");
    image.style.marginTop = "60px";
    image.style.width = "400px";
    image.style.height = "400px";
    image.style.border = "20px solid white";
    image.src = response.url;
    imageQrCode.appendChild(image);

    const interval = 15000; // 15 segundos
    setTimeout(fetchImages, interval);
  };

  const onClickListUsuarios = () => {
    if (!mostrarListUsuarios) {
      setMostrarListUsuarios(true);
    } else {
      setMostrarListUsuarios(false);
    }
  };

  const onClickListTelefones = () => {
    if (!mostrarListTelefones) {
      setMostrarListTelefones(true);
    } else {
      setMostrarListTelefones(false);
    }
  };

  const onClickMostrarInstanciarWpp = () => {
    if (!mostrarInstanciarWpp) {
      setMostrarInstanciarWpp(true);
    } else {
      setMostrarInstanciarWpp(false);
    }
  };

  return (
    <div className='container-admin flex flex-col min-h-screen'>
      <Header />
      <main className='container-admin p-2 flex-grow bg-rgb-azul-claro'>
        <section className='flex justify-center items-center mb-2'>
          <nav className='mr-7'>
            <div className='img-admin'>
              <button type='button' onClick={onClickListUsuarios}>
                <img
                  className='w-16 h-16 flex justify-center p-1 hover:w-14 hover:h-14 hover:mr-2'
                  src={mostrarListUsuarios ? ListUserPngClick : ListUserPng}
                  alt='Usuarios'
                />
                <p className='mt-1 flex justify-center text-sm'>Usuários</p>
              </button>
            </div>
          </nav>
          <nav>
            <div className='img-admin'>
              <button
                className='flex-col justify-center items-center text-center'
                type='button'
                onClick={onClickListTelefones}
              >
                <img
                  className='w-16 h-16 flex justify-center p-1 hover:w-14 hover:h-14 hover:mr-1 hover:ml-1'
                  src={mostrarListTelefones ? ListTelPngClick : ListTelPng}
                  alt='Telefones'
                />
                <p className='mt-1 flex justify-center text-sm'>Telefones</p>
              </button>
            </div>
          </nav>
          <nav className='ml-6'>
            <div className='img-admin'>
              <button type='button' onClick={onClickMostrarInstanciarWpp}>
                <img
                  className='w-16 h-16 flex justify-center p-1 hover:w-14 hover:h-14 hover:ml-2'
                  src={mostrarInstanciarWpp ? WppPngClick : WppPng}
                  alt='Instanciar'
                />
                <p className='mt-1 flex justify-center text-sm text-slate-100'>
                  Instanciar
                </p>
              </button>
            </div>
          </nav>
        </section>
        <section className='bg-rgb-preto bg-opacity-20 rounded-2xl flex-col auto-cols-max text-slate-100 mb-5'>
          <h1 className='py-2 flex justify-center text-xl'>
            Adicionar usuário:
          </h1>
          <div className='flex flex-col text-slate-100'>
            <div className='overflow-x-auto'>
              <div className='inline-block min-w-full py-2'>
                <div className='overflow-hidden'>
                  <table className='table-contats min-w-full text-center text-sm font-light md:text-lg'>
                    <thead className='bg-neutral-800 bg-opacity-40 font-medium text-slate-100'>
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
                      <tr>
                        <td className='whitespace-nowrap px-2 py-2 font-medium'>
                          <input
                            className='p-1 text-black rounded-md w-full'
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
                            className='p-1 text-black rounded-md w-full'
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
                        <td className='whitespace-nowrap px-2 py-2 flex justify-center'>
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
        {mostrarListUsuarios && (
          <section className='bg-rgb-preto bg-opacity-20 rounded-2xl flex-col auto-cols-max text-slate-100 mb-5'>
            <h1 className='py-2 flex justify-center text-xl'>
              Lista de usuários:
            </h1>
            <div className='flex justify-end mr-5'>
              <div className='flex justify-center items-center'>
                <div className='flex mr-3'>
                  <div className='mr-1'>
                    <label htmlFor='select-filter-user'>Filtrar por:</label>
                  </div>
                  <div>
                    <select
                      id='select-filter-user'
                      className='py-1 text-black rounded-md w-24 md:w-full'
                      onChange={({ target: { value } }) =>
                        setOptionsFindUser(value)
                      }
                      value={optionsFindUser}
                    >
                      <option value='usuario'>Usuário</option>
                      <option value='permissão'>Permissão</option>
                    </select>
                  </div>
                </div>
                <div>
                  <input
                    className='py-1 text-black rounded-md w-24 md:w-full'
                    name='input-pesquisa-msn'
                    type='text'
                    placeholder='Pesquise aqui ...'
                    onChange={inputPesquisaUsuarios}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col text-slate-100'>
              <div className='overflow-x-auto'>
                <div className='inline-block min-w-full py-2'>
                  <div className='overflow-hidden'>
                    <table className='table-users min-w-full text-center text-sm font-light md:text-lg'>
                      <thead className='bg-neutral-800 bg-opacity-40 font-medium text-slate-100'>
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
                              className='border-b border-solid border-rgb-cinza'
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
                          <tr key={"no-message"}>
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
        )}
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
              <Button
                className='text-black'
                type='button'
                onClick={handleCloseModalDelete}
              >
                Não
              </Button>
              <Button
                className='text-black'
                type='button'
                onClick={btnRequestDeleteUsers}
              >
                Sim
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {mostrarListTelefones && (
          <section className='bg-rgb-preto bg-opacity-20 rounded-2xl flex-col auto-cols-max text-slate-100 mb-5'>
            <h1 className='py-2 flex justify-center text-xl'>
              Lista de telefones cadastrados:
            </h1>
            <div className='flex justify-end mr-5'>
              <div className='flex justify-center items-center'>
                <div className='flex mr-3'>
                  <div className='mr-1'>
                    <label htmlFor='select-filter-tels'>Filtrar por:</label>
                  </div>
                  <div>
                    <select
                      id='select-filter-tels'
                      className='py-1 text-black rounded-md w-24 md:w-full'
                      onChange={({ target: { value } }) =>
                        setOptionsFindTelCadastrado(value)
                      }
                      value={optionsFindTelCadastrado}
                    >
                      <option value='telefone'>Telefone</option>
                      <option value='conectado'>Conectado</option>
                    </select>
                  </div>
                </div>
                <div>
                  <input
                    className='py-1 text-black rounded-md w-24 md:w-full'
                    name='input-pesquisa-msn'
                    type='text'
                    placeholder='Pesquise aqui ...'
                    onChange={inputPesquisaTelCadastrados}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col text-slate-100'>
              <div className='overflow-x-auto'>
                <div className='inline-block min-w-full py-2'>
                  <div className='overflow-hidden'>
                    <table className='table-tel min-w-full text-center text-sm font-light md:text-lg'>
                      <thead className='bg-neutral-800 bg-opacity-40 font-medium text-slate-100'>
                        <tr>
                          <th scope='col' className='px-2 py-2'>
                            Id
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Numero Telefone
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Conectado
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Deletar
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {existeTelefoneCadastrado ? (
                          listaTelefonesCadastrados.map((tel) => (
                            <tr
                              className='border-b border-solid border-rgb-cinza'
                              key={`user-${tel.id}`}
                            >
                              <td className='whitespace-nowrap px-2 py-2 font-medium'>
                                {tel.id}
                              </td>
                              <td className='whitespace-nowrap px-2 py-2'>
                                {tel.numero_telefone}
                              </td>
                              <td className='text-slate-100 whitespace-nowrap px-2 py-2'>
                                {tel.conectado ? "Sim" : "Não"}
                              </td>
                              <td className='whitespace-nowrap px-2 py-2'>
                                <button
                                  className='bg-gray-200 hover:bg-gray-400 p-1 rounded-xl'
                                  type='button'
                                  onClick={() =>
                                    handleOpenModalDeleteTelCadastrado(tel.id)
                                  }
                                >
                                  <img src={Deletar} alt='Deletar' />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr key={"no-tel-cadastrado"}>
                            <td>---</td>
                            <td>Não há telefones cadastrados</td>
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
        )}
        <div>
          <Modal
            show={openModalDeleteTelefoneCadastrado}
            onHide={handleCloseModalDeleteTelCadastrado}
          >
            <Modal.Body>
              Tem certeza que deseja excluir essa instância?
            </Modal.Body>
            <Modal.Footer>
              <Button
                className='text-black'
                type='button'
                onClick={handleCloseModalDeleteTelCadastrado}
              >
                Não
              </Button>
              <Button
                className='text-black'
                type='button'
                onClick={btnRequestDeleteTelCadastrado}
              >
                Sim
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {mostrarInstanciarWpp && (
          <section className='flex justify-center'>
            <div className='flex-col rounded-2xl p-10 bg-rgb-preto bg-opacity-20'>
              <h1 className='flex justify-center text-xl text-slate-100 mb-4'>
                Instanciar WhatsApp
              </h1>
              <div className='flex justify-center mb-4'>
                <input
                  className='p-1 text-black rounded-md bg-rgb-212-212-212 mr-1'
                  type='number'
                  onChange={({ target: { value } }) =>
                    setNumeroInstancia(value)
                  }
                  value={numeroInstancia}
                  placeholder='Número da instância ...'
                />
              </div>
              <div className='flex justify-center'>
                <button
                  className={
                    isDisabled
                      ? "bg-red-400 text-center mb-2 text-slate-100 p-3 w-28 flex justify-center rounded-xl font-bold"
                      : "btn-entrar text-center mb-2 bg-blue-400 hover:bg-blue-600 text-slate-100 p-3 w-28 flex justify-center rounded-xl font-bold"
                  }
                  type='button'
                  disabled={isDisabled}
                  onClick={btnRequestInstanciartUser}
                >
                  Instanciar
                </button>
              </div>
              <div className='mt-2'>
                <p className='flex justify-center text-slate-100 h-2'>
                  Obs: O número da instancia
                </p>
                <p className='flex justify-center text-slate-100 h-2 mt-2'>
                  tem que possuir 11 dígitos
                </p>
              </div>
              <div id='conatiner-qrcode' className='flex justify-center'></div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
