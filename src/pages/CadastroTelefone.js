import React, { useState, useEffect } from 'react';
import { requestData, requestInsert } from '../services/requests';
import toast from 'react-hot-toast';
import '../styles/pages/CadastroMensagem.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from 'react-modal';
import Confirmar from '../assets/check.png';
import Cancelar from '../assets/close.png';
import Editar from '../assets/edit.png';
import Deletar from '../assets/delete.png';

const CadastroTelefone = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [listTelefones, setListTelefones] = useState([]);
  const [hasTelefone, setHasTelefone] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [telefoneSelectedEdit, setTelefoneSelectedEdit] = useState('');
  const [nomeUpdate, setNomeUpdate] = useState('');
  const [telefoneUpdate, setTelefoneUpdate] = useState('');
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [messageSelectedDelete, setMessageSelectedDelete] = useState('');

  const requestDataTelefone = async () => {
    const result = await requestData('/telefones');
    if (result.length !== 0) {
      setListTelefones(result);
      setHasTelefone(true);
    } else {
      setHasTelefone(false);
    }
  };

  const btnRequestInsertTelefone = async () => {
    try {
      if (listTelefones.some((tel) => tel.telefone === Number(telefone))) {
        return toast.error('Contato já existente!');
      }
      await requestInsert('/telefones', { nome, telefone: Number(telefone) });
      requestDataTelefone();
      setNome('');
      setTelefone('');
      toast.success('Contato inserido com Sucesso!');
    } catch (error) {
      toast(
        '⚠️ Verifique se os campos estão preenchidos corretamente e tente novamente!',
        {
          duration: 3000,
        }
      );
      toast.error('Contato não inserido!');
    }
  };

  useEffect(() => {
    requestDataTelefone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const btnRequestEditTelefone = async () => {
    try {
      if (
        listTelefones.some(
          (tel) => tel.nome === nomeUpdate && tel.telefone === telefoneUpdate
        )
      ) {
        toast.error('Contato não alterado!');
        return;
      }
      if (
        listTelefones.some(
          (tel) =>
            (tel.nome !== nomeUpdate && tel.telefone === telefoneUpdate) ||
            tel.telefone !== telefoneUpdate
        )
      ) {
        console.log(Number(telefoneSelectedEdit), nomeUpdate, telefoneUpdate);
        // await requestInsert('/telefones', { nome, telefone });
        // requestDataTelefone();
        setNomeUpdate('');
        setTelefoneUpdate('');
        toast.success('Contato alterado com Sucesso!');
        handleCloseModalEdit();
        return;
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

  const handleOpenModalEdit = (id, nome, telefone) => {
    setTelefoneSelectedEdit(id);
    setNomeUpdate(nome);
    setTelefoneUpdate(telefone);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const btnRequestDeleteTelefone = () => {
    try {
      console.log(Number(messageSelectedDelete));
      // await requestInsert('/telefones', { nome, menssagem });
      // requestDataMessages();
      toast.success('Contato excluído com Sucesso!');
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

  const handleOpenModalDelete = (id) => {
    setMessageSelectedDelete(id);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  return (
    <div>
      <Header />
      <section>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Contato</th>
              <th>Cadastrar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type='text'
                  onChange={({ target: { value } }) => setNome(value)}
                  value={nome}
                  placeholder='Digite aqui ...'
                />
              </td>
              <td>
                <input
                  type='text'
                  onChange={({ target: { value } }) => setTelefone(value)}
                  value={telefone}
                  placeholder='Digite aqui ...'
                />
              </td>
              <td>
                <button type='button' onClick={btnRequestInsertTelefone}>
                  Enviar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Contato</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {hasTelefone ? (
              listTelefones.map((tel) => (
                <tr key={`contato-${tel.id}`}>
                  <td>{tel.nome}</td>
                  <td>{tel.telefone}</td>
                  <td>
                    <button
                      type='button'
                      onClick={() =>
                        handleOpenModalEdit(tel.id, tel.nome, tel.telefone)
                      }
                    >
                      <img src={Editar} alt='Editar' />
                    </button>
                  </td>
                  <td>
                    <button
                      type='button'
                      onClick={() => handleOpenModalDelete(tel.id)}
                    >
                      <img src={Deletar} alt='Deletar' />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr key={'no-contato'}>
                <td>---</td>
                <td>Não há contatos</td>
                <td>---</td>
                <td>---</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <div>
        <Modal
          isOpen={openModalEdit}
          onRequestClose={handleCloseModalEdit}
          contentLabel='edit'
          className='modal-edit'
          overlayClassName='modal-edit-overlay'
          ariaHideApp={false}
        >
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Contato</th>
                <th>Cancelar</th>
                <th>Confirmar alterações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type='text'
                    onChange={({ target: { value } }) => setNomeUpdate(value)}
                    value={nomeUpdate}
                    placeholder='Digite aqui ...'
                  />
                </td>
                <td>
                  <input
                    type='text'
                    onChange={({ target: { value } }) =>
                      setTelefoneUpdate(value)
                    }
                    value={telefoneUpdate}
                    placeholder='Digite aqui ...'
                  />
                </td>
                <td>
                  <button onClick={handleCloseModalEdit}>
                    <img src={Cancelar} alt='Cancelar' />
                  </button>
                </td>
                <td>
                  <button onClick={btnRequestEditTelefone}>
                    <img src={Confirmar} alt='Confirmar' />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </Modal>
      </div>
      <div>
        <Modal
          isOpen={openModalDelete}
          onRequestClose={handleCloseModalDelete}
          contentLabel='delete'
          className='modal-delete'
          overlayClassName='modal-delete-overlay'
          ariaHideApp={false}
        >
          <p>Tem certeza que deseja excluir esse contato?</p>
          <button type='button' onClick={handleCloseModalDelete}>
            Não
          </button>
          <button type='button' onClick={btnRequestDeleteTelefone}>
            Sim
          </button>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroTelefone;
