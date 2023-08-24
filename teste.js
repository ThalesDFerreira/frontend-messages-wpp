<section className='bg-rgb-preto bg-opacity-20 rounded-2xl flex-col auto-cols-max text-slate-100 mb-5'>
          <h1 className='py-2 flex justify-center text-xl'>
            Adicionar usuário:
          </h1>
          <div className='flex flex-col text-slate-100'>
            <div className='overflow-x-auto'>
              <div className='inline-block min-w-full py-2'>
                <div className='overflow-hidden'>
                  <table className='table-contats min-w-full text-center text-sm font-light md:text-lg'>
                    <thead className='bg-neutral-800 bg-opacity-40 font-medium text-slate-100'>
                      <tr>
                        <th scope='col' className='px-2 py-2'>
                          Usuário
                        </th>
                        <th scope='col' className='px-2 py-2'>
                          Senha
                        </th>
                        <th scope='col' className='px-2 py-2'>
                          Permissão
                        </th>
                        <th scope='col' className='px-2 py-2'>
                          Cadastrar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='whitespace-nowrap px-2 py-2 font-medium'>
                          <input
                            className='p-1 text-black rounded-md w-28 md:w-full'
                            type='text'
                            onChange={({ target: { value } }) =>
                              setUsuario(value.toLowerCase())
                            }
                            value={usuario}
                            placeholder='Digite aqui ...'
                          />
                        </td>
                        <td className='whitespace-nowrap px-2 py-2'>
                          <input
                            className='p-1 text-black rounded-md w-28 md:w-full'
                            type='text'
                            onChange={({ target: { value } }) =>
                              setSenha(value)
                            }
                            value={senha}
                            placeholder='Digite aqui ...'
                          />
                        </td>
                        <td className='whitespace-nowrap px-2 py-2'>
                          <select
                            className='py-1 text-black rounded-md w-24 md:w-full'
                            onChange={({ target: { value } }) => setRole(value)}
                            value={role}
                          >
                            <option value='user'>user</option>
                            <option value='admin'>admin</option>
                          </select>
                        </td>
                        <td className='whitespace-nowrap px-2 py-2 flex justify-center'>
                          <button
                            className='btn-entrar text-center mb-2 bg-blue-400 hover:bg-blue-600 text-slate-100 p-2 w-20 flex justify-center rounded-xl font-bold'
                            type='button'
                            onClick={btnRequestInsertUser}
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