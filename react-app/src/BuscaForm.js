import React, { useState } from 'react';
import axios from 'axios';

const BuscaForm = () => {
  const [termoBusca, setTermoBusca] = useState('');
  const [tipoBusca, setTipoBusca] = useState('1');
  const [resultados, setResultados] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/busca/?termo=${termoBusca}&tipo=${tipoBusca}`);
      setResultados(response.data)
    } catch (error) {
      console.error('Erro ao buscar:', error);
    }
  };

  console.log(resultados)

  return (
    <div>
      <form className="mx-auto w-50 mb-3 p-3 py-5 my-5" onSubmit={handleSubmit}>
        <h2 className="mb-3 text-center">Buscar alunos</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control w-50"
            id="termoBusca"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            placeholder="Digite aqui..."
            required
          />
          <select
            className="form-select w-25"
            value={tipoBusca}
            onChange={(e) => setTipoBusca(e.target.value)}
          >
            <option value="1">por nome</option>
            <option value="2">por número</option>
          </select>
          <button type="submit" className="btn btn-secondary">
            <i className='fa fa-search'></i>
          </button>
        </div>
      </form>

      {resultados && resultados.length > 0 ? (
        <div className="mx-auto w-75">
          <h2>Resultados da busca</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Número</th>
                <th>Aluno</th>
                <th>Gaveta</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((resultado, index) => (
                <tr key={index}>
                  <td>{resultado.numeroPasta}</td>
                  <td>{resultado.nomeAluno}</td>
                  <td>{resultado.gaveta?.descricao}</td> {/* Correção aqui */}
                  <td>{resultado.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : "Nenhum resultado encontrado." }
      </div>
  );
};

export default BuscaForm;
