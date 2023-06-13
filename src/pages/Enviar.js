import React, { useState, useEffect } from 'react';
import { requestData } from '../services/requests';
import '../styles/pages/Enviar.css';

const Enviar = () => {
  const [listContacts, setListContacts] = useState([]);
  const [listSelectedContacts, setListSelectedContacts] = useState([]);
  const [loadList, setLoadList] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isMessage, setIsMessage] = useState([]);
  const [existsIsMessage, setExistsIsMessage] = useState(false);

  console.log(listSelectedContacts);

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
      setLoadList(false);
    }
  };

  const messages = async () => {
    try {
      const stringMessage = await requestData('/mensagens');
      if (isMessage.length !== 0) {
        setExistsIsMessage(true);
        setIsMessage(stringMessage);
      } else {
        setExistsIsMessage(false);
      }
    } catch (error) {
      setExistsIsMessage(false);
    }
  };

  useEffect(() => {
    contacts();
    messages();
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const newArray = listContacts.map((contact) => [
        contact.id,
        contact.telefone,
      ]);
      setListSelectedContacts(newArray);
      setIsChecked(true);
    } else {
      setListSelectedContacts([]);
      setIsChecked(false);
    }
  };

  const handleSelectContact = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === value) {
      const teste = !event.target.checked;
      return teste;
    }
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
  };

  return (
    <>
      <h1>Formulário de Mensagens</h1>
      <section>
        <label>Lista de contatos:</label>
        {loadList ? (
          <>
            <input
              id='select-all'
              type='checkbox'
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <label htmlFor='select-all'>Selecionar Todos</label>
            {listContacts.map((contact) => (
              <div key={contact.id}>
                <input
                  type='checkbox'
                  name={contact.telefone}
                  checked={isChecked}
                  id={contact.id}
                  value={contact.telefone}
                  onChange={handleSelectContact}
                />
                <label htmlFor={contact.id}>{contact.telefone}</label>
              </div>
            ))}
          </>
        ) : (
          <p>Adicione pelo menos um contato para continuar!</p>
        )}
      </section>
      <form>
        { existsIsMessage ? (
          isMessage.map((msn) => (
          <div>
            <label>
              <input
                type="radio"
                name={'radioGroup'}
                value={msn.menssagem}
                // checked={selectedOption === 'option1'}
                // onChange={handleOptionChange}
              />
              {msn.menssagem}
          </label>
        </div>
        ))) : (
          <p>Nenhuma mensagem cadastrada!</p>
        )}
         
      <div>
        <label>
          <input
            type="radio"
            name="option"
            value="option2"
            // checked={selectedOption === 'option2'}
            // onChange={handleOptionChange}
          />
          Opção 2
        </label>
      </div>
      <div>
        <textarea
          // value={message}
          // onChange={handleMessageChange}
          placeholder="Digite sua mensagem..."
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
    </>
  );
};

export default Enviar;
