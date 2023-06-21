import React, { useState, useEffect } from 'react';
import { requestData, requestInsert, requestEdit } from '../services/requests';
import toast from 'react-hot-toast';
import '../styles/pages/CadastroMensagem.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Confirmar from '../assets/check.png';
import Cancelar from '../assets/close.png';
import Editar from '../assets/edit.png';
import Deletar from '../assets/delete.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
        await requestEdit('/telefones', { id: Number(telefoneSelectedEdit), nome: nomeUpdate, telefone: telefoneUpdate });
        requestDataTelefone();
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
      // await requestEdit('/telefones', { nome, menssagem });
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
    <div className='container-add-telefone flex flex-col min-h-screen'>
      <Header />
      <main className='container-telefone p-2 flex-grow bg-rgb-212-212-212'>
        <section className='bg-black rounded-2xl flex-col auto-cols-max bg-opacity-80 text-slate-100 mb-5 overflow-auto'>
          <h1 className='p-2 flex justify-center text-xl'>
            Adicionar contato:
          </h1>
          <div className='flex flex-col text-slate-100'>
            <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                <div className='overflow-hidden'>
                  <table className='table-contats min-w-full text-center text-sm font-light md:text-lg'>
                    <thead className='border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900'>
                      <tr>
                        <th scope='col' className='px-2 py-2'>
                          Nome
                        </th>
                        <th scope='col' className='px-2 py-2'>
                          Contato
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
                            onChange={({ target: { value } }) => setNome(value)}
                            value={nome}
                            placeholder='Digite aqui ...'
                          />
                        </td>
                        <td className='whitespace-nowrap px-2 py-2'>
                          <input
                            className='p-1 text-black rounded-md w-28 md:w-full'
                            type='text'
                            onChange={({ target: { value } }) =>
                              setTelefone(value)
                            }
                            value={telefone}
                            placeholder='Digite aqui ...'
                          />
                        </td>
                        <td className='whitespace-nowrap px-2 py-2'>
                          <button
                            className='btn-entrar text-center mb-2 bg-blue-400 hover:bg-blue-600 text-slate-100 p-2 w-20 flex justify-center rounded-xl font-bold'
                            type='button'
                            onClick={btnRequestInsertTelefone}
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
            Lista de contatos:
          </h1>
          <div className='flex flex-col text-slate-100'>
            <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                <div className='overflow-hidden'>
                  <table className='table-contats min-w-full text-center text-sm font-light md:text-lg'>
                    <thead className='border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900'>
                      <tr>
                        <th scope='col' className='px-2 py-2'>
                          Nome
                        </th>
                        <th scope='col' className='px-2 py-2'>
                          Contato
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
                      {hasTelefone ? (
                        listTelefones.map((tel) => (
                          <tr
                            className='border-b dark:border-neutral-500'
                            key={`contato-${tel.id}`}
                          >
                            <td className='whitespace-nowrap px-2 py-2 font-medium'>
                              {tel.nome}
                            </td>
                            <td className='whitespace-nowrap px-2 py-2'>
                              {tel.telefone}
                            </td>
                            <td className='whitespace-nowrap px-2 py-2'>
                              <button
                                className='bg-gray-200 hover:bg-gray-400 p-1 rounded-xl'
                                type='button'
                                onClick={() =>
                                  handleOpenModalEdit(
                                    tel.id,
                                    tel.nome,
                                    tel.telefone
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
                    <th>Nome</th>
                    <th>Contato</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        className='p-1 text-black rounded-md bg-rgb-212-212-212'
                        type='text'
                        onChange={({ target: { value } }) =>
                          setNomeUpdate(value)
                        }
                        value={nomeUpdate}
                        placeholder='Digite aqui ...'
                      />
                    </td>
                    <td>
                      <input
                        className='p-1 text-black rounded-md bg-rgb-212-212-212'
                        type='text'
                        onChange={({ target: { value } }) =>
                          setTelefoneUpdate(value)
                        }
                        value={telefoneUpdate}
                        placeholder='Digite aqui ...'
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleCloseModalEdit}>
                <img className='w-7 h-7' src={Cancelar} alt='Cancelar' />
              </Button>
              <Button onClick={btnRequestEditTelefone}>
                <img className='w-7 h-7' src={Confirmar} alt='Confirmar' />
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div>
          <Modal show={openModalDelete} onHide={handleCloseModalDelete}>
            <Modal.Body>
              Tem certeza que deseja excluir esse contato?
            </Modal.Body>
            <Modal.Footer>
              <Button type='button' onClick={handleCloseModalDelete}>
                Não
              </Button>
              <Button type='button' onClick={btnRequestDeleteTelefone}>
                Sim
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CadastroTelefone;
