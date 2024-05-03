import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GavetaForm = () => {
  const [gavetas, setGavetas] = useState([]);
  const [addToggle, setAddToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(null);
  const [selectedGaveta, setSelectedGaveta] = useState(null);
  const [newGaveta, setNewGaveta] = useState({
    descricao: ''
  });

  useEffect(() => {
    fetchGavetas();
    const handleKeyPress = (event) => {
      if (event.key === 'a' && !document.activeElement.tagName.startsWith('INPUT')) {
        setAddToggle(true);
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  const fetchGavetas = async () => {
    try {
      const response = await axios.get('/api/gaveta/');
      setGavetas(response.data);
    } catch (error) {
      console.error('Erro ao buscar gavetas:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGaveta(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddGaveta = async () => {
    try {
      await axios.post('/api/gaveta/', newGaveta);
      fetchGavetas();
      setNewGaveta({
        descricao: ''
      });
      setAddToggle(false);
    } catch (error) {
      console.error('Erro ao adicionar gaveta:', error);
    }
  };

  const toggleEdit = (index) => {
    setEditToggle(editToggle === index ? null : index);
  };

  const cancelEdit = () => {
    setEditToggle(null);
    setNewGaveta({
      descricao: ''
    });
    setAddToggle(false);
  };

  const showPastas = (gaveta) => {
    setSelectedGaveta(gaveta);
  };

  return (
    <div className='py-3'>
      <div className='d-flex justify-content-between'>
        <h1>Gavetas</h1>
        <button className='fs-1 px-3' onClick={() => setAddToggle(true)}><i className='fa fa-plus'></i></button>
      </div>
      <table className='table table-sm w-75 mx-auto'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {addToggle && (
            <tr>
              <td></td>
              <td><input type="text" name="descricao" value={newGaveta.descricao} onChange={handleInputChange} autoFocus/></td>
              <td>
                <button className='px-3' onClick={handleAddGaveta}><i className='fa fa-save'></i></button>
                <button className='px-3' onClick={cancelEdit}><i className='fa fa-close'></i></button>
              </td>
            </tr>
          )}
          {gavetas.map((gaveta, index) => (
            <tr key={gaveta.id}>
              <td><input type="text" value={gaveta.id} disabled readOnly /></td>
              <td>
                {editToggle === index ? (
                  <input
                    type="text"
                    name="descricao"
                    value={newGaveta.descricao}
                    onChange={handleInputChange}
                  />
                ) : (
                  <input type="text" value={gaveta.descricao} disabled readOnly />
                )}
              </td>
              <td>
                {editToggle === index ? (
                  <button className='px-3' onClick={handleAddGaveta}>
                    <i className='fa fa-save'></i>
                  </button>
                ) : (
                  <button className='px-3' onClick={() => toggleEdit(index)}>
                    <i className='fa fa-edit'></i>
                  </button>
                )}
                {editToggle === index ? (
                  <button className='px-3' onClick={cancelEdit}>
                    <i className='fa fa-close'></i>
                  </button>
                ) : (
                  <button className='px-3' onClick={() => showPastas(gaveta)}>
                    <i className='fa fa-eye'></i>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedGaveta && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pastas da gaveta "{selectedGaveta.descricao}"</h5>
                <button type="button" className="close" onClick={() => setSelectedGaveta(null)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome do Aluno</th>
                      <th>Número da Pasta</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedGaveta.pastas.map((pasta) => (
                      <tr key={pasta.id}>
                        <td>{pasta.id}</td>
                        <td>{pasta.nomeAluno}</td>
                        <td>{pasta.numeroPasta}</td>
                        <td>{pasta.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GavetaForm;