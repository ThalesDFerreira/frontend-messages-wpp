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

const CadastroMensagem = () => {
  const [nome, setNome] = useState('');
  const [menssagem, setMenssagem] = useState('');
  const [listMessages, setListMessages] = useState([]);
  const [hasMessage, setHasMessage] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [messageSelectedEdit, setMessageSelectedEdit] = useState('');
  const [nomeUpdate, setNomeUpdate] = useState('');
  const [menssagemUpdate, setMenssagemUpdate] = useState('');
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [messageSelectedDelete, setMessageSelectedDelete] = useState('');

  const requestDataMessages = async () => {
    const result = await requestData('/mensagens');
    if (result.length !== 0) {
      setListMessages(result);
      setHasMessage(true);
    } else {
      setHasMessage(false);
    }
  };

  const btnRequestInsertMessages = async () => {
    try {
      if (
        listMessages.some(
          (msn) =>
            (msn.nome === nome && msn.menssagem === menssagem) ||
            msn.menssagem === menssagem
        )
      ) {
        toast.error('Mensagem já existente!');
      } else {
        await requestInsert('/mensagens', { nome, menssagem });
        requestDataMessages();
        setNome('');
        setMenssagem('');
        toast.success('Mensagem inserida com Sucesso!');
      }
    } catch (error) {
      toast(
        '⚠️ Verifique se os campos estão preenchidos corretamente e tente novamente!',
        {
          duration: 3000,
        }
      );
      toast.error('Mensagem não inserida!');
    }
  };

  useEffect(() => {
    requestDataMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const btnRequestEditMessages = async () => {
    try {
      if (
        listMessages.some(
          (msn) => msn.nome === nomeUpdate && msn.menssagem === menssagemUpdate
        )
      ) {
        toast.error('Mensagem não alterada!');
        return;
      }
      if (
        listMessages.some(
          (msn) =>
            (msn.nome !== nomeUpdate && msn.menssagem === menssagemUpdate) ||
            msn.menssagem !== menssagemUpdate
        )
      ) {
        console.log(Number(messageSelectedEdit), nomeUpdate, menssagemUpdate);
        // await requestInsert('/mensagens', { nome, menssagem });
        // requestDataMessages();
        setNomeUpdate('');
        setMenssagemUpdate('');
        toast.success('Mensagem alterada com Sucesso!');
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

  const handleOpenModalEdit = (id, nome, menssagem) => {
    setMessageSelectedEdit(id);
    setNomeUpdate(nome);
    setMenssagemUpdate(menssagem);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const btnRequestDeleteMessages = () => {
    try {
      console.log(messageSelectedDelete);
      // await requestInsert('/mensagens', { nome, menssagem });
      // requestDataMessages();
      toast.success('Mensagem excluída com Sucesso!');
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
              <th>Mensagem</th>
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
                />
              </td>
              <td>
                <input
                  type='text'
                  onChange={({ target: { value } }) => setMenssagem(value)}
                  value={menssagem}
                />
              </td>
              <td>
                <button type='button' onClick={btnRequestInsertMessages}>
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
              <th>Mensagem</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {hasMessage ? (
              listMessages.map((msn) => (
                <tr key={`message-${msn.id}`}>
                  <td>{msn.nome}</td>
                  <td>{msn.menssagem}</td>
                  <td>
                    <button
                      type='button'
                      onClick={() =>
                        handleOpenModalEdit(msn.id, msn.nome, msn.menssagem)
                      }
                    >
                      <img src={Editar} alt='Editar' />
                    </button>
                  </td>
                  <td>
                    <button
                      type='button'
                      onClick={() => handleOpenModalDelete(msn.id)}
                    >
                      <img src={Deletar} alt='Deletar' />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr key={'no-message'}>
                <td>---</td>
                <td>Não há mensagens</td>
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
                <th>Mensagem</th>
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
                  />
                </td>
                <td>
                  <input
                    type='text'
                    onChange={({ target: { value } }) =>
                      setMenssagemUpdate(value)
                    }
                    value={menssagemUpdate}
                  />
                </td>
                <td>
                  <button onClick={handleCloseModalEdit}>
                    <img src={Cancelar} alt='Cancelar' />
                  </button>
                </td>
                <td>
                  <button onClick={btnRequestEditMessages}>
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
          <p>Tem certeza que deseja excluir essa mensagem?</p>
          <button type='button' onClick={handleCloseModalDelete}>
            Não
          </button>
          <button type='button' onClick={btnRequestDeleteMessages}>
            Sim
          </button>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroMensagem;
