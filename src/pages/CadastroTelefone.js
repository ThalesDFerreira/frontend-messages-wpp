import { useState, useEffect } from 'react';
import {
  requestGet,
  requestPost,
  requestPut,
  requestDelete,
  requestUplaodFile,
} from '../services/requests';
import toast from 'react-hot-toast';
import '../styles/pages/CadastroTelefone.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Confirmar from '../assets/check.png';
import Cancelar from '../assets/close.png';
import Editar from '../assets/edit.png';
import Deletar from '../assets/delete.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListContatosPng from '../assets/list_contacts.png';
import ListContatosPngClick from '../assets/list_contacts_click.png';

const CadastroTelefone = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [listaTelefones, setListaTelefones] = useState([]);
  const [temTelefone, setTemTelefone] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalCsvImport, setOpenModalCsvImport] = useState(false);
  const [selectedFileCsv, setSelectedFileCsv] = useState(null);
  const [telefoneSelecionadoEditar, setTelefoneSelecionadoEditar] =
    useState('');
  const [nomeAtualizado, setNomeAtualizado] = useState('');
  const [telefoneAtualizado, setTelefoneAtualizado] = useState('');
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [telefoneSelecionadoDeletar, setTelefoneSelecionadoDeletar] =
    useState('');
  const [listaTelefonesClone, setListaTelefonesClone] = useState([]);
  const [optionsFindTel, setOptionsFindTel] = useState('nome');
  const [mostrarListContatos, setMostrarListContatos] = useState(false);

  const requestDataTelefone = async () => {
    const result = await requestGet('/telefones');
    if (result.length !== 0) {
      setListaTelefones(result);
      setTemTelefone(true);
      setListaTelefonesClone(result);
    } else {
      setTemTelefone(false);
    }
  };

  const btnRequestInsertTelefone = async () => {
    try {
      if (listaTelefones.some((tel) => tel.phone === Number(telefone))) {
        return toast.error('Contato já existente!');
      }
      if (listaTelefones.some((tel) => tel.name === nome)) {
        return toast.error('Nome de contato já existente!');
      }

      if (telefone.length === 10) {
        const numberAdd = '9';
        const indexAdd = 3;

        const novaString =
          telefone.slice(0, indexAdd) + numberAdd + telefone.slice(indexAdd);
        console.log();
        const result = await requestPost('/telefones', {
          name: nome,
          phone: Number(novaString),
        });
        await requestDataTelefone();
        setNome('');
        setTelefone('');
        toast.success(result.message);
      } else {
        const result = await requestPost('/telefones', {
          name: nome,
          phone: Number(telefone),
        });
        await requestDataTelefone();
        setNome('');
        setTelefone('');
        toast.success(result.message);
      }
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
  }, []);

  const btnRequestEditTelefone = async () => {
    try {
      const filterTelefoneId = listaTelefones.filter(
        (tel) => tel.id === Number(telefoneSelecionadoEditar)
      );

      const filterRemoverIdList = listaTelefones.filter(
        (tel) => tel.id !== Number(telefoneSelecionadoEditar)
      );

      const filterListaTelefone = filterRemoverIdList.some(
        (tel) => tel.phone === Number(telefoneAtualizado)
      );

      const filterListaNome = filterRemoverIdList.some(
        (tel) => tel.name === nomeAtualizado
      );

      if (
        filterTelefoneId[0].name === nomeAtualizado &&
        filterTelefoneId[0].phone === Number(telefoneAtualizado)
      ) {
        toast.error('Telefone não alterado!');
      } else if (filterListaTelefone) {
        toast.error('Telefone já existe!');
      } else if (filterListaNome) {
        toast.error('Nome do telefone já existe!');
      } else {
        const result = await requestPut('/telefones', {
          id: Number(telefoneSelecionadoEditar),
          name: nomeAtualizado,
          phone: telefoneAtualizado,
        });
        await requestDataTelefone();
        setNomeAtualizado('');
        setTelefoneAtualizado('');
        toast.success(result.message);
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

  const handleOpenModalEdit = (id, nome, telefone) => {
    setTelefoneSelecionadoEditar(id);
    setNomeAtualizado(nome);
    setTelefoneAtualizado(telefone);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleCloseModalCsvImport = () => {
    setOpenModalCsvImport(false);
  };

  const handleOpenModalCsvImport = () => {
    setOpenModalCsvImport(true);
  };

  const handleFileChangeCsv = (event) => {
    setSelectedFileCsv(event.target.files[0]);
  };

  const btnRequestSendCsv = async () => {
    try {
      if (selectedFileCsv !== null) {
        const formData = new FormData();
        formData.append('file', selectedFileCsv);
        const result = await requestUplaodFile('/envia-contatos', formData);
        toast.success(result.message);
        setSelectedFileCsv(null);
        handleCloseModalCsvImport();
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

  const btnRequestDeleteTelefone = async () => {
    try {
      const idTelefone = Number(telefoneSelecionadoDeletar);
      const result = await requestDelete(`/telefones?id=${idTelefone}`);
      await requestDataTelefone();
      toast.success(result.message);
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
    setTelefoneSelecionadoDeletar(id);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const inputPesquisaTelefones = async ({ target }) => {
    const valueInput = target.value;
    let newArray = [];
    const arraySearch = [...listaTelefonesClone];
    if (optionsFindTel === 'nome' && valueInput !== '') {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (
          element.name &&
          element.name.toLowerCase().includes(valueInput.toLowerCase())
        ) {
          newArray.push(element);
        }
      }
      setListaTelefones(newArray);
    }

    if (optionsFindTel === 'telefone' && valueInput !== '') {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (element.phone.toString().includes(valueInput)) {
          newArray.push(element);
        }
      }
      setListaTelefones(newArray);
    }

    if (valueInput === '') {
      setListaTelefones(listaTelefonesClone);
    }
  };

  const onClickListContatos = () => {
    if (!mostrarListContatos) {
      setMostrarListContatos(true);
    } else {
      setMostrarListContatos(false);
    }
  };

  return (
    <div className='container-add-telefone flex flex-col min-h-screen'>
      <Header />
      <main className='container-telefone p-2 flex-grow bg-rgb-azul-claro'>
        <section className='flex justify-center items-center mb-2'>
          <nav>
            <div className='img-telefone'>
              <button type='button' onClick={onClickListContatos}>
                <img
                  className='w-16 h-16 flex justify-center p-1 hover:w-14 hover:h-14 hover:mb-3 hover:ml-1'
                  src={
                    mostrarListContatos ? ListContatosPngClick : ListContatosPng
                  }
                  alt='Contatos'
                />
                <p className='mt-1 flex justify-center text-sm text-rgb-cinza'>
                  Contatos
                </p>
              </button>
            </div>
          </nav>
        </section>
        <section className='bg-rgb-preto bg-opacity-20 rounded-2xl flex-col auto-cols-max text-slate-100 mb-5'>
          <div className='flex justify-between'>
            <div>
              <button
                className='ml-4 mt-2 mb-2 rounded bg-rgb-azul hover:bg-sky-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-slate-100 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
                type='button'
                id='import-csv'
                name='import-csv'
                onClick={handleOpenModalCsvImport}
              >
                Importar contatos Google
              </button>
            </div>
          </div>
          <div className='flex flex-col text-slate-100'>
            <div className='overflow-x-auto'>
              <div className='inline-block min-w-full py-2'>
                <div className='overflow-hidden'>
                  <table className='table-contats min-w-full text-center text-sm font-light md:text-lg'>
                    <thead className='bg-neutral-800 bg-opacity-40 font-medium text-slate-100'>
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
                    <tbody className='break-all'>
                      <tr>
                        <td className='whitespace-nowrap px-2 py-2 font-medium'>
                          <input
                            className='p-1 text-black rounded-md w-full'
                            type='text'
                            onChange={({ target: { value } }) => setNome(value)}
                            value={nome}
                            placeholder='Digite aqui ...'
                          />
                        </td>
                        <td className='whitespace-nowrap px-2 py-2'>
                          <input
                            className='p-1 text-black rounded-md w-full'
                            type='text'
                            onChange={({ target: { value } }) =>
                              setTelefone(value)
                            }
                            value={telefone}
                            placeholder='Digite aqui ...'
                          />
                        </td>
                        <td className='whitespace-nowrap px-2 py-2 flex justify-center'>
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
        {mostrarListContatos && (
          <section className='bg-rgb-preto bg-opacity-20 rounded-2xl flex-col auto-cols-max text-slate-100 mb-5'>
            <h1 className='py-2 flex justify-center text-xl'>
              Lista de contatos:
            </h1>
            <div className='flex justify-end mr-5'>
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
            <div className='flex flex-col text-slate-100'>
              <div className='overflow-x-auto'>
                <div className='inline-block min-w-full py-2'>
                  <div className='overflow-hidden'>
                    <table className='table-contats min-w-full text-center text-sm font-light md:text-lg'>
                      <thead className='bg-neutral-800 bg-opacity-40 font-medium text-slate-100'>
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
                      <tbody className='break-all'>
                        {temTelefone ? (
                          listaTelefones.map((tel) => (
                            <tr
                              className='border-b border-solid border-rgb-cinza'
                              key={`contato-${tel.id}`}
                            >
                              <td className='whitespace-nowrap px-2 py-2 font-medium'>
                                {tel.name}
                              </td>
                              <td className='whitespace-nowrap px-2 py-2'>
                                {tel.phone}
                              </td>
                              <td className='whitespace-nowrap px-2 py-2'>
                                <button
                                  className='bg-gray-200 hover:bg-gray-400 p-1 rounded-xl'
                                  type='button'
                                  onClick={() =>
                                    handleOpenModalEdit(
                                      tel.id,
                                      tel.name,
                                      tel.phone
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
        )}
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
                <tbody className='break-all'>
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
                          setTelefoneAtualizado(value)
                        }
                        value={telefoneAtualizado}
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
                onClick={btnRequestDeleteTelefone}
              >
                Sim
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div>
          <Modal show={openModalCsvImport} onHide={handleCloseModalCsvImport}>
            <Modal.Body className='flex justify-center'>
              <div>
                <input
                  type='file'
                  id='fileInputCsv'
                  onChange={handleFileChangeCsv}
                />
                <p className='font-bold mt-3 text-center'>Insira o arquivo CSV do Google Contatos</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleCloseModalCsvImport}>
                <img className='w-7 h-7' src={Cancelar} alt='Cancelar' />
              </Button>
              <Button onClick={btnRequestSendCsv}>
                <img className='w-7 h-7' src={Confirmar} alt='Confirmar' />
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
