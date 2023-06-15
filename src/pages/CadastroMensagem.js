import React, { useState, useEffect } from 'react';
import { requestData, requestInsert } from '../services/requests';
import toast from 'react-hot-toast';
import '../styles/pages/CadastroMensagem.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CadastroMensagem = () => {
  const [nome, setNome] = useState('');
  const [menssagem, setMenssagem] = useState('');
  const [listMessages, setListMessages] = useState([]);
  const [hasMessage, setHasMessage] = useState(false);

  const requestDataMessages = async () => {
    const result = await requestData('/mensagens');
    console.log(result.length);
    if (result.length !== 0) {
      setListMessages(result);
      setHasMessage(true);
    } else {
      setHasMessage(false);
    }
  };

  const btnRequestInsertMessages = async () => {
    try {
      await requestInsert('/mensagens', { nome, menssagem });
      requestDataMessages();
      toast.success('Mensagem inserida com Sucesso!');
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
                />
              </td>
              <td>
                <input
                  type='text'
                  onChange={({ target: { value } }) => setMenssagem(value)}
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
                    <button type='button'>Editar</button>
                  </td>
                  <td>
                    <button type='button'>Deletar</button>
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
      <Footer />
    </div>
  );
};

export default CadastroMensagem;
