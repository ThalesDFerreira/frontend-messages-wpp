/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
  requestData,
  requestPost,
  requestUplaodFile,
} from '../services/requests';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import '../styles/pages/Enviar.css';
import Footer from '../components/Footer';
import ListTelPng from '../assets/list_contacts.png';
import ListMsnPng from '../assets/list_msn.png';
import anexoPng from '../assets/anexo.png';

const Enviar = () => {
  const [modificarTextoBtnSelecTodos, setModificarTextoBtnSelecTodos] =
    useState('Selecionar Todos');
  const [ocultarMensagensBtn, setOcultarMensagensBtn] =
    useState('Ocultar Mensagens');
  const [listaTelefones, setListaTelefones] = useState([]);
  const [listaTelefonesClone, setListaTelefonesClone] = useState([]);
  const [listaTelefonesSelecionados, setListaTelefonesSelecionados] = useState(
    []
  );
  const [carregandoLista, setCarregandoLista] = useState(false);
  const [isCheckedTelefones, setIsCheckedTelefones] = useState(false);
  const [mensagem, setMensagem] = useState([]);
  const [mensagemClone, setMensagemClone] = useState([]);
  const [existeMensagem, setExisteMensagem] = useState(false);
  const [mensagemSelecionada, setMensagemSelecionada] = useState('');
  const [isCheckedTextArea, setIsCheckedTextArea] = useState(false);
  const [optionsFindTel, setOptionsFindTel] = useState('nome');
  const [optionsFindMsn, setOptionsFindMsn] = useState('nome');
  const [btnOcultarMostrarMsn, setBtnOcultarMostrarMsn] = useState(true);
  const [
    numeroTelefoneUsuarioSelecionado,
    setNumeroTelefoneUsuarioSelecionado,
  ] = useState('');
  const [listaNumerosTelefonesUsuarios, setListaNumerosTelefonesUsuarios] =
    useState([]);
  const [existeNumeroTelefoneCadastrado, setExisteNumeroTelefoneCadastrado] =
    useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [mostrarListTelefones, setMostrarListTelefones] = useState(false);
  const [mostrarListMensagens, setMostrarListMensagens] = useState(false);
  const [mostrarAnexo, setMostrarAnexo] = useState(false);

  const contacts = async () => {
    try {
      const arrayList = await requestData('/telefones');
      if (arrayList.length !== 0) {
        setCarregandoLista(true);
        setListaTelefones(arrayList);
        setListaTelefonesClone(arrayList);
      } else {
        setCarregandoLista(false);
      }
    } catch (error) {
      toast(
        '🛑 Desculpe! Estamos enfrentando problemas técnicos.\n\nTente realizar a operação novamente \n\n ou entre em contato com nosso suporte técnico.',
        {
          duration: 4000,
        }
      );
    }
  };

  const messages = async () => {
    try {
      const stringMessage = await requestData('/mensagens');
      if (stringMessage.length !== 0) {
        setExisteMensagem(true);
        setMensagem(stringMessage);
        setMensagemClone(stringMessage);
      } else {
        setExisteMensagem(false);
      }
    } catch (error) {
      toast(
        '🛑 Desculpe! Estamos enfrentando problemas técnicos.\n\nTente realizar a operação novamente \n\n ou entre em contato com nosso suporte técnico.',
        {
          duration: 4000,
        }
      );
    }
  };

  useEffect(() => {
    contacts();
    messages();
    requestDataTelCadastrado();
  }, []);

  const handleSelectAll = () => {
    if (!isCheckedTelefones) {
      setListaTelefonesSelecionados(listaTelefones);
      setIsCheckedTelefones(true);
      setModificarTextoBtnSelecTodos(
        isCheckedTelefones ? 'Selecionar Todos' : 'Desmarcar Todos'
      );
    } else {
      setListaTelefonesSelecionados([]);
      setIsCheckedTelefones(false);
      setModificarTextoBtnSelecTodos(
        isCheckedTelefones ? 'Selecionar Todos' : 'Desmarcar Todos'
      );
    }
  };

  const handleChangeInput = (idTelefone) => {
    const addTel = listaTelefones.find((el) => el.id === idTelefone);
    if (listaTelefonesSelecionados.includes(addTel)) {
      setListaTelefonesSelecionados(
        listaTelefonesSelecionados.filter((el) => el.id !== idTelefone)
      );
    } else {
      setListaTelefonesSelecionados([...listaTelefonesSelecionados, addTel]);
    }
  };

  const handleChangeCheckbox = (idTelefone) => {
    const tel = listaTelefones.find((el) => el.id === idTelefone);
    return listaTelefonesSelecionados.includes(tel);
  };

  const handleChangeRadio = ({ target }) => {
    if (target.value.length !== 0 || target.value !== 'on') {
      setMensagemSelecionada(target.value);
    }
    if (
      target.attributes.id &&
      target.attributes.id.value.startsWith('radio')
    ) {
      const textArea = document.querySelector('TEXTAREA');
      textArea.value = '';
    }
    if (target.value.length > 0 && target.tagName === 'TEXTAREA') {
      setIsCheckedTextArea(true);
      setMensagemSelecionada(target.value);
    } else {
      setIsCheckedTextArea(false);
      const textArea = document.querySelector('TEXTAREA');
      textArea.value = '';
    }
  };

  const handleEnviarClick = async () => {
    const telefonesExists = listaTelefonesSelecionados.length !== 0;
    const mensagensExists = mensagemSelecionada.length !== 0;
    if (telefonesExists && mensagensExists) {
      const listaBody = listaTelefonesSelecionados.map((tel) => tel.telefone);
      const body = {
        instancia: numeroTelefoneUsuarioSelecionado,
        mensagem: mensagemSelecionada,
        numeros: listaBody,
      };
      try {
        if (selectedFile !== null) {
          const formData = new FormData();
          formData.append('file', selectedFile);
          await requestUplaodFile('/upload', formData);
          setSelectedFile(null);
        }
        const result = await requestPost('/envio-mensagem', body);
        setListaTelefonesSelecionados([]);
        setIsCheckedTelefones(false);
        setMensagemSelecionada('');
        setIsCheckedTextArea(false);
        limparInputsRadio();
        limparInputUpload();
        limparTextArea();
        toast.success(result.mensagem);
      } catch (error) {
        setListaTelefonesSelecionados([]);
        setIsCheckedTelefones(false);
        setMensagemSelecionada('');
        setIsCheckedTextArea(false);
        limparInputsRadio();
        limparInputUpload();
        limparTextArea();
        toast(
          `🛑 Desculpe! Estamos enfrentando problemas técnicos.
          Tente realizar a operação novamente
          ou entre em contato com nosso suporte técnico.`,
          { duration: 4000 }
        );
      }
    } else {
      toast.error('Por favor, insira um telefone e uma mensagem para enviar!');
    }
  };

  const limparInputsRadio = () => {
    const radioInputs = document.querySelectorAll(
      'input[type="radio"][id^="radio"]'
    );

    // Percorra a lista de inputs de rádio e desmarque-os
    radioInputs.forEach((input) => {
      input.checked = false;
    });
  };

  const limparInputUpload = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.value = null;
  };

  const limparTextArea = () => {
    const textArea = document.querySelector('TEXTAREA');
    textArea.value = '';
  };

  const inputPesquisaTelefones = async ({ target }) => {
    const valueInput = target.value;
    let newArray = [];
    const arraySearch = [...listaTelefonesClone];
    if (optionsFindTel === 'nome' && valueInput !== '') {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (
          element.nome &&
          element.nome.toLowerCase().includes(valueInput.toLowerCase())
        ) {
          newArray.push(element);
        }
      }
      setListaTelefones(newArray);
    }

    if (optionsFindTel === 'telefone' && valueInput !== '') {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (element.telefone.toString().includes(valueInput)) {
          newArray.push(element);
        }
      }
      setListaTelefones(newArray);
    }

    if (valueInput === '') {
      setListaTelefones(listaTelefonesClone);
    }
  };

  const inputPesquisaMensagens = async ({ target }) => {
    const valueInput = target.value;
    let newArray = [];
    const arraySearch = [...mensagemClone];
    if (optionsFindMsn === 'nome' && valueInput !== '') {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (
          element.nome &&
          element.nome.toLowerCase().includes(valueInput.toLowerCase())
        ) {
          newArray.push(element);
        }
      }
      setMensagem(newArray);
    }

    if (optionsFindMsn === 'mensagem' && valueInput !== '') {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (element.mensagem.includes(valueInput)) {
          newArray.push(element);
        }
      }
      setMensagem(newArray);
    }

    if (valueInput === '') {
      setMensagem(mensagemClone);
    }
  };

  const ocultarMensagens = () => {
    if (btnOcultarMostrarMsn) {
      setOcultarMensagensBtn('Mostrar Mensagens');
      setMensagem([]);
      setBtnOcultarMostrarMsn(false);
    } else {
      setOcultarMensagensBtn('Ocultar Mensagens');
      setMensagem(mensagemClone);
      setBtnOcultarMostrarMsn(true);
    }
  };

  const requestDataTelCadastrado = async () => {
    const result = await requestData('/logged');
    if (result.length === 0) {
      setExisteNumeroTelefoneCadastrado(false);
    } else {
      setNumeroTelefoneUsuarioSelecionado(result[0].numero_telefone); // setando número padrão
      setListaNumerosTelefonesUsuarios(result);
      setExisteNumeroTelefoneCadastrado(true);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onClickListTelefones = () => {
    if (!mostrarListTelefones) {
      setMostrarListTelefones(true);
    } else {
      setMostrarListTelefones(false);
    }
  };

  const onClickListMensagens = () => {
    if (!mostrarListMensagens) {
      setMostrarListMensagens(true);
    } else {
      setMostrarListMensagens(false);
    }
  };

  const onClickMostrarAnexo = () => {
    if (!mostrarAnexo) {
      setMostrarAnexo(true);
    } else {
      setMostrarAnexo(false);
    }
  };

  return (
    <div className='container-enviar flex flex-col min-h-screen'>
      <Header />
      <main className='container-form p-2 flex-grow bg-rgb-212-212-212'>
        <h1 className='flex justify-center text-2xl mb-3'>
          Formulário de Envio
        </h1>
        <div className='flex-col justify-center items-center'>
          <div className='flex justify-center mb-2'>
            {!existeNumeroTelefoneCadastrado ? (
              <p>Não existe instâncias cadastradas!</p>
            ) : (
              <select
                className='py-1 text-black rounded-md w-32'
                onChange={({ target: { value } }) =>
                  setNumeroTelefoneUsuarioSelecionado(value)
                }
                value={numeroTelefoneUsuarioSelecionado}
              >
                {listaNumerosTelefonesUsuarios.map((tel) => (
                  <option
                    value={tel.numero_telefone}
                    key={`${tel.numero_telefone}`}
                  >
                    {tel.numero_telefone}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className='flex justify-center p-1 mb-6'>
            <button
              className='md:text-base rounded bg-green-500 hover:bg-green-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-slate-100 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
              type='button'
              onClick={handleEnviarClick}
            >
              Enviar Mensagem
            </button>
          </div>
        </div>
        <section className='flex justify-center items-center mb-2'>
          <nav className='mr-9'>
            <div>
              <button type='button' onClick={onClickListTelefones}>
                <img
                  className='w-16 h-16 rounded-s-2xl flex justify-center bg-green-500 hover:bg-green-900 p-1 border-solid border-2 border-indigo-600 hover:w-14 hover:h-14 hover:mr-2'
                  src={ListTelPng}
                  alt='Contatos'
                />
                <p className='mt-1 flex justify-center text-sm'>Contatos</p>
              </button>
            </div>
          </nav>
          <nav>
            <div>
              <button
                className='flex-col justify-center items-center text-center'
                type='button'
                onClick={onClickListMensagens}
              >
                <img
                  className='w-16 h-16 flex justify-center bg-sky-500 hover:bg-sky-900 p-1 border-solid border-2 border-indigo-600 hover:w-14 hover:h-14 hover:ml-1'
                  src={ListMsnPng}
                  alt='Mensagens'
                />
                <p className='mt-1 flex justify-center text-sm'>Mensagens</p>
              </button>
            </div>
          </nav>
          <nav className='ml-6'>
            <div>
              <button type='button' onClick={onClickMostrarAnexo}>
                <img
                  className='w-16 h-16 rounded-e-2xl flex justify-center bg-yellow-400 hover:bg-yellow-600 p-1 border-solid border-2 border-indigo-600 hover:w-14 hover:h-14 hover:ml-2'
                  src={anexoPng}
                  alt='Anexo'
                />
                <p className='mt-1 flex justify-center text-sm'>Anexo</p>
              </button>
            </div>
          </nav>
        </section>
        {mostrarListTelefones && (
          <div className='flex-col ml-5 mr-5 md:flex justify-between'>
            <div className='bg-black p-3 rounded-2xl flex-col auto-cols-max bg-opacity-80 text-slate-100 mb-5 overflow-auto h-screen'>
              <h3 className='flex justify-center mt-3'>Lista de contatos:</h3>
              {carregandoLista ? (
                <section className='container-contats'>
                  <div className='flex justify-between'>
                    <div>
                      <button
                        className='ml-4 mt-2 mb-2 rounded bg-sky-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-slate-100 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
                        type='button'
                        id='select-all'
                        name='select-all'
                        onClick={handleSelectAll}
                      >
                        {modificarTextoBtnSelecTodos}
                      </button>
                    </div>
                    <div className='flex justify-center items-center'>
                      <div className='flex mr-3'>
                        <div className='mr-1'>
                          <label htmlFor='select-filterTel'>Filtrar por:</label>
                        </div>
                        <div>
                          <select
                            id='select-filterTel'
                            className='py-1 text-black rounded-md w-24 md:w-full'
                            onChange={({ target: { value } }) =>
                              setOptionsFindTel(value)
                            }
                            value={optionsFindTel}
                          >
                            <option value='nome'>Nome</option>
                            <option value='telefone'>Telefone</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <input
                          className='py-1 text-black rounded-md w-24 md:w-full'
                          name='input-pesquisa-tel'
                          type='text'
                          placeholder='Pesquise aqui ...'
                          onChange={inputPesquisaTelefones}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                      <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                        <div className='overflow-hidden'>
                          <table className='table-contats min-w-full text-center text-sm font-light md:text-lg'>
                            <thead className='border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900'>
                              <tr>
                                <th scope='col' className='px-6 py-4'>
                                  Selecionar
                                </th>
                                <th scope='col' className=' px-6 py-4'>
                                  Nome
                                </th>
                                <th scope='col' className=' px-6 py-4'>
                                  Telefones
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {listaTelefones.map((contact) => (
                                <tr
                                  className='border-b dark:border-neutral-500'
                                  key={`check-table-${contact.id}`}
                                >
                                  <td className='whitespace-nowrap  px-6 py-4 font-medium'>
                                    <input
                                      id={`check-${contact.id}`}
                                      name={`checkbox-${contact.id}`}
                                      type='checkbox'
                                      value={contact.telefone}
                                      checked={handleChangeCheckbox(contact.id)}
                                      onChange={() =>
                                        handleChangeInput(contact.id)
                                      }
                                    />
                                  </td>
                                  <td className='whitespace-nowrap  px-6 py-4'>
                                    <label htmlFor={`check-${contact.id}`}>
                                      {contact.nome}
                                    </label>
                                  </td>
                                  <td className='whitespace-nowrap  px-6 py-4'>
                                    <label htmlFor={`check-${contact.id}`}>
                                      {contact.telefone}
                                    </label>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <div className='flex justify-center mt-10'>
                  <p>Adicione pelo menos um contato para continuar!</p>
                </div>
              )}
            </div>
          </div>
        )}
        {mostrarListMensagens && (
          <div className='flex-col ml-5 mr-5 md:flex justify-between'>
            <section className='bg-black p-3 rounded-2xl flex-col auto-cols-max bg-opacity-80 text-slate-100 overflow-auto h-screen'>
              <h3 className='flex justify-center'>Lista de mensagens:</h3>
              <div className='flex justify-between'>
                <div>
                  <button
                    className='ml-4 mt-2 mb-2 rounded bg-sky-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-slate-100 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
                    type='button'
                    id='ocultar-msn'
                    name='ocultar-msn'
                    onClick={ocultarMensagens}
                  >
                    {ocultarMensagensBtn}
                  </button>
                </div>
                <div className='flex justify-center items-center'>
                  <div className='flex mr-3'>
                    <div className='mr-1'>
                      <label htmlFor='select-filterMsn'>Filtrar por:</label>
                    </div>
                    <div>
                      <select
                        id='select-filterMsn'
                        className='py-1 text-black rounded-md w-24 md:w-full'
                        onChange={({ target: { value } }) =>
                          setOptionsFindMsn(value)
                        }
                        value={optionsFindMsn}
                      >
                        <option value='nome'>Nome</option>
                        <option value='mensagem'>Mensagem</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <input
                      className='py-1 text-black rounded-md w-24 md:w-full'
                      name='input-pesquisa-msn'
                      type='text'
                      placeholder='Pesquise aqui ...'
                      onChange={inputPesquisaMensagens}
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                    <div className='overflow-hidden'>
                      <table className='table-mensages min-w-full text-center text-sm font-light md:text-lg'>
                        <thead className='border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900'>
                          <tr>
                            <th scope='col' className='px-6 py-4'>
                              Selecionar
                            </th>
                            <th scope='col' className='px-6 py-4'>
                              Nome
                            </th>
                            <th scope='col' className='px-6 py-4'>
                              Mensagens
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {existeMensagem ? (
                            mensagem.map((msn) => (
                              <tr
                                className='border-b dark:border-neutral-500'
                                key={`radio-form-${msn.id}`}
                              >
                                <td className='whitespace-nowrap  px-6 py-4 font-medium'>
                                  <input
                                    id={`radio-${msn.id}`}
                                    type='radio'
                                    name='radioGroup'
                                    value={msn.mensagem}
                                    onChange={(e) => handleChangeRadio(e)}
                                  />
                                </td>
                                <td className='whitespace-nowrap  px-6 py-4'>
                                  <label htmlFor={`radio-${msn.id}`}>
                                    {msn.nome}
                                  </label>
                                </td>
                                <td className='whitespace-nowrap  px-6 py-4'>
                                  <label htmlFor={`radio-${msn.id}`}>
                                    {msn.mensagem}
                                  </label>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className='border-b dark:border-neutral-500'>
                              <td className='whitespace-nowrap  px-6 py-4 font-medium'>
                                Nenhuma mensagem cadastrada!
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-between mb-3'>
                <div className='flex justify-center items-center ml-12 lg:ml-48'>
                  <label htmlFor='radio-message'>
                    <input
                      className='p-2 flex justify-center items-center'
                      id='radio-message'
                      type='radio'
                      name='radioGroup'
                      checked={isCheckedTextArea}
                      onChange={() => setIsCheckedTextArea(true)}
                    />
                  </label>
                </div>
                <div className='flex justify-center items-center ml-12 lg:ml-48'>
                  <p className='p-2'>Escreva sua mensagem</p>
                </div>
                <div className='flex justify-center items-center w-72 lg:w-96'>
                  <textarea
                    className='p-2 w-full h-20 text-black'
                    onChange={(e) => handleChangeRadio(e)}
                    placeholder='Digite sua mensagem...'
                  />
                </div>
              </div>
            </section>
          </div>
        )}
        {mostrarAnexo && (
          <div className='flex-col ml-5 mr-5 md:flex justify-between'>
            <section className='bg-black rounded-2xl flex-col auto-cols-max bg-opacity-80 text-slate-100 mb-5 overflow-auto h-auto mt-10'>
              <h3 className='flex justify-center mt-3'>Upload Arquivos:</h3>
              <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                  <div className='overflow-hidden'>
                    <table className='table-mensages min-w-full text-center text-sm font-light md:text-lg'>
                      <thead className='border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900'>
                        <tr>
                          <th scope='col' className='px-6 py-4'>
                            Selecione um arquivo
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='border-b dark:border-neutral-500'>
                          <td
                            className='whitespace-nowrap  px-6 py-4 font-medium'
                            key='upload-file'
                          >
                            <input
                              type='file'
                              id='fileInput'
                              onChange={handleFileChange}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Enviar;
