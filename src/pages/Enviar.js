/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { requestData } from '../services/requests';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import '../styles/pages/Enviar.css';
import Footer from '../components/Footer';

const Enviar = () => {
  const [selectAllText, setSelectAllText] = useState('Selecionar Todos');
  const [listContacts, setListContacts] = useState([]);
  const [listSelectedContacts, setListSelectedContacts] = useState([]);
  const [loadList, setLoadList] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isMessage, setIsMessage] = useState([]);
  const [existsIsMessage, setExistsIsMessage] = useState(false);
  const [messageSelected, setMessageSelected] = useState('');

  console.log(listSelectedContacts);
  console.log(messageSelected);

  const contacts = async () => {
    try {
      const arrayList = await requestData('/telefones');
      if (arrayList.length !== 0) {
        setLoadList(true);
        setListContacts(arrayList);
      } else {
        setLoadList(false);
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
        setExistsIsMessage(true);
        setIsMessage(stringMessage);
      } else {
        setExistsIsMessage(false);
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
    setSelectAll(!selectAll);
    if (!selectAll) {
      const newArray = listContacts.map((contact) => contact.telefone);
      setListSelectedContacts(newArray);
      setIsChecked(true);
      setSelectAllText(isChecked ? 'Selecionar Todos' : 'Desmarcar Todos');
    } else {
      setListSelectedContacts([]);
      setIsChecked(false);
      setSelectAllText(isChecked ? 'Selecionar Todos' : 'Desmarcar Todos');
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
    // console.log(event.target);
  };

  // const handleSelectContact = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   if (name === value) {
  //     const teste = !event.target.checked;
  //     return teste;
  //   }
  //   setListSelectedContacts((prevSelectedContacts) => [
  //     ...prevSelectedContacts,
  //     contact,
  //   ]);
  // } else {
  //   setListSelectedContacts((prevSelectedContacts) =>
  //     prevSelectedContacts.filter(
  //       (selectedContact) => selectedContact !== contact
  //     )
  //   );
  // }
  // };

  const handleRadioChange = ({ target }) => {
    if (target.value.length !== 0 || target.value !== 'on') {
      const result = target.value;
      setMessageSelected(result);
    }
  };

  const handleEnviarClick = () => {
    if (listSelectedContacts.length !== 0 && messageSelected.length !== 0) {
      // FAZER REQUST DE ENVIO DE DADOS
    } else {
      toast.error('Por favor, insira um telefone e uma mensagem para enviar!');
    }
  };

  return (
    <div className='container-enviar'>
      <Header />
      <div className='container-form'>
        <h1 className='flex justify-center text-2xl mb-3'>
          Formulário de Envio
        </h1>
        <div className='flex justify-between'>
          <div>
            <h3>Lista de contatos:</h3>
            {loadList ? (
              <section className='container-contats'>
                <button
                  type='button'
                  id='select-all'
                  name='select-all'
                  onClick={handleSelectAll}
                >
                  {selectAllText}
                </button>
                <div className='flex flex-col'>
                  <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                      <div className='overflow-hidden'>
                        <table className='table-contats min-w-full text-center text-sm font-light'>
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
                            {listContacts.map((contact) => (
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
              <p>Adicione pelo menos um contato para continuar!</p>
            )}
          </div>
          <section>
            <h3>Lista de mensagens:</h3>
            <table className='table-mensages'>
              <thead>
                <tr>
                  <th>Selecionar</th>
                  <th>Nome</th>
                  <th>Mensagens</th>
                </tr>
              </thead>
              <tbody>
                {existsIsMessage ? (
                  isMessage.map((msn) => (
                    <tr key={`radio-form-${msn.id}`}>
                      <td>
                        <input
                          id={`radio-${msn.id}`}
                          type='radio'
                          name='radioGroup'
                          value={msn.menssagem}
                          onChange={handleRadioChange}
                        />
                      </td>
                      <td>
                        <label htmlFor={`radio-${msn.id}`}>{msn.nome}</label>
                      </td>
                      <td>
                        <label htmlFor={`radio-${msn.id}`}>
                          {msn.menssagem}
                        </label>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>Nenhuma mensagem cadastrada!</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div>
              <label htmlFor='radio-message'>
                <input
                  id='radio-message'
                  type='radio'
                  name='radioGroup'
                  onChange={handleRadioChange}
                />
                <textarea
                  onChange={handleRadioChange}
                  placeholder='Digite sua mensagem...'
                />
              </label>
            </div>
          </section>
        </div>
        <button type='button' onClick={handleEnviarClick}>
          Enviar
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Enviar;
