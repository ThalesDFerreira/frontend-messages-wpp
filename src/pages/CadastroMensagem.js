import { useState, useEffect } from 'react';
import {
  requestData,
  requestInsert,
  requestEdit,
  requestDelete,
} from '../services/requests';
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
import ListMsnPng from '../assets/list_msn.png';
import ListMsnPngClick from '../assets/list_msn_click.png';

const CadastroMensagem = () => {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [listaMensagens, setListaMensagens] = useState([]);
  const [temMensagem, setTemMensagem] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [mensagemSelecionadaEditar, setMensagemSelecionadaEditar] =
    useState('');
  const [nomeAtualizado, setNomeAtualizado] = useState('');
  const [mensagemAtualizado, setMensagemAtualizado] = useState('');
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [mensagemSelecionadaDeletar, setMensagemSelecionadaDeletar] =
    useState('');
  const [listaMensagemClone, setListaMensagemClone] = useState([]);
  const [optionsFindMsn, setOptionsFindMsn] = useState('nome');
  const [mostrarListMensagens, setMostrarListMensagens] = useState(false);

  const requestDataMessages = async () => {
    const result = await requestData('/mensagens');
    if (result.length !== 0) {
      setListaMensagens(result);
      setTemMensagem(true);
      setListaMensagemClone(result);
    } else {
      setTemMensagem(false);
    }
  };

  const btnRequestInsertMessages = async () => {
    try {
      if (listaMensagens.some((msn) => msn.mensagem === mensagem)) {
        return toast.error('Mensagem já existente!');
      }
      if (listaMensagens.some((msn) => msn.nome === nome)) {
        return toast.error('Nome de mensagem já existente!');
      }
      const result = await requestInsert('/mensagens', { nome, mensagem });
      requestDataMessages();
      setNome('');
      setMensagem('');
      toast.success(result.mensagem);
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
      const filterMensagemId = listaMensagens.filter(
        (msn) => msn.id === Number(mensagemSelecionadaEditar)
      );

      const filterRemoverIdList = listaMensagens.filter(
        (tel) => tel.id !== Number(mensagemSelecionadaEditar)
      );

      const filterListaMensagem = filterRemoverIdList.some(
        (msn) => msn.mensagem === mensagemAtualizado
      );

      const filterListaNome = filterRemoverIdList.some(
        (msn) => msn.nome === nomeAtualizado
      );

      if (
        filterMensagemId[0].nome === nomeAtualizado &&
        filterMensagemId[0].mensagem === mensagemAtualizado
      ) {
        toast.error('Mensagem não alterado!');
      } else if (filterListaMensagem) {
        toast.error('Mensagem já existe!');
      } else if (filterListaNome) {
        toast.error('Nome da mensagem já existe!');
      } else {
        const result = await requestEdit('/mensagens', {
          id: Number(mensagemSelecionadaEditar),
          nome: nomeAtualizado,
          mensagem: mensagemAtualizado,
        });
        requestDataMessages();
        setNomeAtualizado('');
        setMensagemAtualizado('');
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

  const handleOpenModalEdit = (id, nome, mensagem) => {
    setMensagemSelecionadaEditar(id);
    setNomeAtualizado(nome);
    setMensagemAtualizado(mensagem);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const btnRequestDeleteMessages = async () => {
    try {
      const idMensagem = Number(mensagemSelecionadaDeletar);
      const result = await requestDelete(`/mensagens?id=${idMensagem}`);
      requestDataMessages();
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

  const handleOpenModalDelete = (id) => {
    setMensagemSelecionadaDeletar(id);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const inputPesquisaMensagens = async ({ target }) => {
    const valueInput = target.value;
    let newArray = [];
    const arraySearch = [...listaMensagemClone];
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
      setListaMensagens(newArray);
    }

    if (optionsFindMsn === 'mensagem' && valueInput !== '') {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (element.mensagem.includes(valueInput)) {
          newArray.push(element);
        }
      }
      setListaMensagens(newArray);
    }

    if (valueInput === '') {
      setListaMensagens(listaMensagemClone);
    }
  };

  const onClickListMensagens = () => {
    if (!mostrarListMensagens) {
      setMostrarListMensagens(true);
    } else {
      setMostrarListMensagens(false);
    }
  };

  return (
    <div className='container-add-mensagem flex flex-col min-h-screen'>
      <Header />
      <main className='container-mensagem p-2 flex-grow bg-rgb-azul-claro'>
        <section className='flex justify-center items-center mb-2'>
          <nav>
            <div className='img-mensagens'>
              <button type='button' onClick={onClickListMensagens}>
                <img
                  className='w-16 h-16 flex justify-center p-1 hover:w-14 hover:h-14 hover:mb-3 hover:ml-1'
                  src={mostrarListMensagens ? ListMsnPngClick : ListMsnPng}
                  alt='Mensagens'
                />
                <p className='mt-1 flex justify-center text-sm'>Mensagens</p>
              </button>
            </div>
          </nav>
        </section>
        <section className='bg-rgb-preto bg-opacity-20 rounded-2xl flex-col auto-cols-max text-slate-100 mb-5 overflow-auto'>
          <h1 className='p-2 flex justify-center text-xl'>
            Adicionar mensagem:
          </h1>
          <div className='flex flex-col text-slate-100'>
            <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                <div className='overflow-hidden'>
                  <table className='table-contats min-w-full text-center text-sm font-light md:text-lg'>
                    <thead className='border-b bg-neutral-800 opacity-40 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900'>
                      <tr>
                        <th scope='col' className='px-2 py-2'>
                          Nome
                        </th>
                        <th scope='col' className='px-2 py-2'>
                          Mensagem
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
                        <td className='whitespace-nowrap px-2 py-2 text-black'>
                          <textarea
                            // className='p-1 text-black rounded-md w-28 md:w-full'
                            // type='text'
                            onChange={({ target: { value } }) =>
                              setMensagem(value)
                            }
                            value={mensagem}
                            placeholder='Digite aqui ...'
                          />
                        </td>
                        <td className='whitespace-nowrap px-2 py-2 flex justify-center'>
                          <button
                            className='btn-entrar text-center mb-2 bg-blue-400 hover:bg-blue-600 text-slate-100 p-2 w-20 flex justify-center rounded-xl font-bold'
                            type='button'
                            onClick={btnRequestInsertMessages}
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
        {mostrarListMensagens && (
          <section className='bg-rgb-preto bg-opacity-20 rounded-2xl flex-col auto-cols-max text-slate-100 mb-5 overflow-auto h-screen'>
            <h1 className='p-2 flex justify-center text-xl'>
              Lista de mensagens:
            </h1>
            <div className='flex justify-end'>
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
            <div className='flex flex-col text-slate-100'>
              <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                  <div className='overflow-hidden'>
                    <table className='table-contats min-w-full text-center text-sm font-light md:text-lg'>
                      <thead className='border-b bg-neutral-800 opacity-40 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900'>
                        <tr>
                          <th scope='col' className='px-2 py-2'>
                            Nome
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Mensagem
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
                        {temMensagem ? (
                          listaMensagens.map((msn) => (
                            <tr
                              className='border-b dark:border-neutral-500'
                              key={`message-${msn.id}`}
                            >
                              <td className='whitespace-nowrap px-2 py-2 font-medium'>
                                {msn.nome}
                              </td>
                              <td className='whitespace-nowrap px-2 py-2'>
                                {msn.mensagem}
                              </td>
                              <td className='whitespace-nowrap px-2 py-2'>
                                <button
                                  className='bg-gray-200 hover:bg-gray-400 p-1 rounded-xl'
                                  type='button'
                                  onClick={() =>
                                    handleOpenModalEdit(
                                      msn.id,
                                      msn.nome,
                                      msn.mensagem
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
                    <th>Nome</th>
                    <th>Mensagem</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        className='p-1 text-black rounded-md bg-rgb-212-212-212'
                        type='text'
                        onChange={({ target: { value } }) =>
                          setNomeAtualizado(value)
                        }
                        value={nomeAtualizado}
                        placeholder='Digite aqui ...'
                      />
                    </td>
                    <td>
                      <input
                        className='p-1 text-black rounded-md bg-rgb-212-212-212'
                        type='text'
                        onChange={({ target: { value } }) =>
                          setMensagemAtualizado(value)
                        }
                        value={mensagemAtualizado}
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
              <Button onClick={btnRequestEditMessages}>
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
                onClick={btnRequestDeleteMessages}
              >
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

export default CadastroMensagem;
