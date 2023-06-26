/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { requestData } from '../services/requests';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import '../styles/pages/Enviar.css';
import Footer from '../components/Footer';

const Enviar = () => {
  const [modificarTextoBtn, setModificarTextoBtn] = useState('Selecionar Todos');
  const [listaTelefones, setListaTelefones] = useState([]);
  const [listaTelefonesSelecionados, setListaTelefonesSelecionados] = useState([]);
  const [carregandoLista, setCarregandoLista] = useState(false);
  const [selecionarTodosCheckbox, setSelecionarTodosCheckbox] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [mensagem, setMensagem] = useState([]);
  const [existeMensagem, setExisteMensagem] = useState(false);
  const [mensagemSelecionada, setMensagemSelecionada] = useState('');

  const contacts = async () => {
    try {
      const arrayList = await requestData('/telefones');
      if (arrayList.length !== 0) {
        setCarregandoLista(true);
        setListaTelefones(arrayList);
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
  }, []);

  const handleSelectAll = () => {
    setSelecionarTodosCheckbox(!selecionarTodosCheckbox);
    if (!selecionarTodosCheckbox) {
      const newArray = listaTelefones.map((contact) => contact.telefone);
      setListaTelefonesSelecionados(newArray);
      setIsChecked(true);
      setModificarTextoBtn(isChecked ? 'Selecionar Todos' : 'Desmarcar Todos');
    } else {
      setListaTelefonesSelecionados([]);
      setIsChecked(false);
      setModificarTextoBtn(isChecked ? 'Selecionar Todos' : 'Desmarcar Todos');
    }
  };

  // const handleChangeInput = ({ target }) => {
  //   if (target.type === 'checkbox') {
  //     target.checked = true;
  //   }
  // };

  const handleChangeInput = (event) => {
    // const { name } = event.target;
    // this.setState({ [name]: event.target.value }, () => this.buttonDisableEnable());
  };

  // const handleSelectContact = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   if (name === value) {
  //     const teste = !event.target.checked;
  //     return teste;
  //   }
  //   setListaTelefonesSelecionados((prevSelectedContacts) => [
  //     ...prevSelectedContacts,
  //     contact,
  //   ]);
  // } else {
  //   setListaTelefonesSelecionados((prevSelectedContacts) =>
  //     prevSelectedContacts.filter(
  //       (selectedContact) => selectedContact !== contact
  //     )
  //   );
  // }
  // };

  const handleRadioChange = ({ target }) => {
    if (target.value.length !== 0 || target.value !== 'on') {
      setMensagemSelecionada(target.value);
    }
    const inputMsg = document.querySelector("#radio-message");
    const textArea = document.querySelector('TEXTAREA');
    if (target.tagName === 'TEXTAREA' && target.value.length !== 0) {
      inputMsg.checked = true;
    } else {
      textArea.value = '';
      inputMsg.checked = false;
    }
  };

  const handleEnviarClick = () => {
    if (
      listaTelefonesSelecionados.length !== 0 &&
      mensagemSelecionada.length !== 0
    ) {
      // FAZER REQUST DE ENVIO DE DADOS
    } else {
      toast.error('Por favor, insira um telefone e uma mensagem para enviar!');
    }
  };

  return (
    <div className='container-enviar flex flex-col min-h-screen'>
      <Header />
      <main className='container-form p-2 flex-grow bg-rgb-212-212-212'>
        <h1 className='flex justify-center text-2xl mb-3'>
          Formulário de Envio
        </h1>
        <div className='flex justify-center p-1 mb-6'>
          <button
            className='md:text-base rounded bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-slate-100 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
            type='button'
            onClick={handleEnviarClick}
          >
            Enviar Mensagem
          </button>
        </div>
        <div className='flex-col ml-5 mr-5 md:flex justify-between'>
          <div className='bg-black rounded-2xl flex-col auto-cols-max bg-opacity-80 text-slate-100 mb-5 overflow-auto h-96'>
            <h3 className='flex justify-center mt-3'>Lista de contatos:</h3>
            {carregandoLista ? (
              <section className='container-contats'>
                <button
                  className='ml-4 mt-2 mb-2 rounded bg-sky-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-slate-100 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
                  type='button'
                  id='select-all'
                  name='select-all'
                  onClick={handleSelectAll}
                >
                  {modificarTextoBtn}
                </button>
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
                                    checked={isChecked}
                                    onChange={(event) =>
                                      handleChangeInput(event)
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
          <section className='bg-black p-3 rounded-2xl flex-col auto-cols-max bg-opacity-80 text-slate-100 overflow-auto h-96'>
            <h3 className='flex justify-center'>Lista de mensagens:</h3>
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
                                  onChange={handleRadioChange}
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
                    onChange={handleRadioChange}
                  />
                </label>
              </div>
              <div className='flex justify-center items-center'>
                <p className='p-2'>Escreva sua mensagem</p>
              </div>
              <div className='flex justify-center items-center w-72 lg:w-96'>
                <textarea
                  className='p-2 w-full h-20 text-black'
                  onChange={handleRadioChange}
                  placeholder='Digite sua mensagem...'
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Enviar;
