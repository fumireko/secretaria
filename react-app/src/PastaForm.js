import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const PastaForm = () => {
  const [gavetas, setGavetas] = useState([]);
  const [pastas, setPastas] = useState([]);
  const [addToggle, setAddToggle] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newPasta, setNewPasta] = useState({
    numeroPasta: '',
    nomeAluno: '',
    gavetaId: '',
    status: ''
  });
  const [editedPasta, setEditedPasta] = useState({
    numeroPasta: '',
    nomeAluno: '',
    gavetaId: '',
    status: ''
  });

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'a' && !document.activeElement.tagName.startsWith('INPUT')) {
      setAddToggle(true);
    }
  }, []);

  const fetchGavetas = useCallback(async () => {
    try {
      const response = await axios.get('/api/gaveta/');
      setGavetas(response.data);
    } catch (error) {
      console.error('Error fetching gavetas:', error);
    }
  }, []);

  const fetchPastas = useCallback(async () => {
    try {
      const response = await axios.get('/api/pasta/');
      setPastas(response.data.length > 0 ? response.data : []);
    } catch (error) {
      console.error('Error fetching pastas:', error);
    }
  }, []);

  const fetchLastPasta = useCallback(async () => {
    try {
      const response = await axios.get('/api/pasta/last');
      return response.data;
    } catch (error) {
      console.error('Error fetching last pasta:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchGavetas();
    fetchPastas();
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [fetchGavetas, fetchPastas, handleKeyPress]);

  useEffect(() => {
    if (addToggle) {
      fetchLastPasta().then((lastPasta) => {
        const newNumeroPasta = lastPasta ? lastPasta.numeroPasta + 1 : 1;
        setNewPasta({
          numeroPasta: newNumeroPasta,
          nomeAluno: '',
          gavetaId: lastPasta ? lastPasta.gaveta.id : '',
          status: lastPasta ? lastPasta.status : ''
        });
      });
    }
  }, [addToggle, fetchLastPasta]);

  const handleAddPasta = async () => {
    try {
      const newPastaData = { ...newPasta };
      const selectedGaveta = gavetas.find(gaveta => gaveta.id === +newPastaData.gavetaId);
      newPastaData.gaveta = { id: selectedGaveta.id, descricao: selectedGaveta.descricao };
      await axios.post('/api/pasta/', newPastaData);
      fetchPastas();
      setAddToggle(false);
      setNewPasta({
        numeroPasta: '',
        nomeAluno: '',
        gavetaId: '',
        status: ''
      });
    } catch (error) {
      console.error('Error adding pasta:', error);
    }
  };

  const toggleEdit = (index, pasta) => {
    setEditedPasta(pasta);
    setEditIndex(editIndex === index ? null : index);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditedPasta({
      numeroPasta: '',
      nomeAluno: '',
      gavetaId: '',
      status: ''
    });
    setAddToggle(false);
  };

  const edit = async () => {
    try {
      const editedPastaData = { ...editedPasta };
      const selectedGaveta = gavetas.find(gaveta => gaveta.id === +editedPastaData.gaveta.id);
      editedPastaData.gaveta = { id: selectedGaveta.id, descricao: selectedGaveta.descricao };
      await axios.put(`/api/pasta/${editedPastaData.id}`, editedPastaData);
      fetchPastas();
      setEditIndex(null);
    } catch (error) {
      console.error('Error editing pasta:', error);
    }
  };

  const removePasta = async (id) => {
    if (window.confirm('Tem certeza que deseja remover esta pasta?')) {
      try {  
        await axios.delete(`/api/pasta/${id}`);
        fetchPastas();
      } catch (error) {
        console.error('Error removing pasta:', error);
      }
    }
  };

  return (
    <div className='py-3'>
      <div className='d-flex justify-content-between'>
        <h1>Pastas</h1>
        <button className='fs-1 px-3' onClick={() => setAddToggle(true)}><i className='fa fa-plus'></i></button>
      </div>
      <table className='table table-sm w-75 mx-auto'>
        <thead>
          <tr>
            <th>Número</th>
            <th>Aluno</th>
            <th>Gaveta</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {addToggle && (
            <tr>
                <td>
                  <input
                    type="number"
                    name="numeroPasta"
                    value={newPasta.numeroPasta}
                    onChange={(e) => setNewPasta({ ...newPasta, numeroPasta: e.target.value })}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="nomeAluno"
                    value={newPasta.nomeAluno}
                    onChange={(e) => setNewPasta({ ...newPasta, nomeAluno: e.target.value.toUpperCase() })}
                    required
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newPasta.numeroPasta && newPasta.nomeAluno) {
                        handleAddPasta();
                      }
                    }}
                    autoFocus
                  />
                </td>
                <td>
                  <select
                    name="gavetaId"
                    value={newPasta.gavetaId}
                    onChange={(e) => setNewPasta({ ...newPasta, gavetaId: e.target.value })}
                    required
                  >
                    <option value="" disabled>
                      Selecione a gaveta
                    </option>
                    {gavetas.map((gaveta) => (
                      <option key={gaveta.id} value={gaveta.id}>
                        {gaveta.descricao}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    name="status"
                    value={newPasta.status}
                    onChange={(e) => setNewPasta({ ...newPasta, status: e.target.value })}
                    required
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                    <option value="Concluinte">Concluinte</option>
                  </select>
                </td>
                <td>
                  <button onClick={handleAddPasta} className='px-3'>
                    <i className='fa fa-save'></i>
                  </button>
                  <button className='px-3' onClick={() => setAddToggle(false)}>
                    <i className='fa fa-close'></i>
                  </button>
                </td>
            </tr>
          )}

          {pastas.map((pasta, index) => (
            <tr key={pasta.id}>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="numeroPasta"
                      value={editedPasta.numeroPasta}
                      onChange={(e) => setEditedPasta({ ...editedPasta, numeroPasta: e.target.value })}
                      autoFocus
                      required
                    />
                  ) : (
                    pasta.numeroPasta
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="nomeAluno"
                      value={editedPasta.nomeAluno}
                      onChange={(e) => setEditedPasta({ ...editedPasta, nomeAluno: e.target.value.toUpperCase() })}
                      required
                    />
                  ) : (
                    pasta.nomeAluno?.toUpperCase()
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <select
                      name="gavetaId"
                      value={editedPasta.gaveta.id}
                      onChange={(e) => setEditedPasta({ ...editedPasta, gavetaId: e.target.value })}
                      required
                    >
                      <option value="" disabled>
                        Selecione a gaveta
                      </option>
                      {gavetas.map((gaveta) => (
                        <option key={gaveta.id} value={gaveta.id}>
                          {gaveta.descricao}
                        </option>
                      ))}
                    </select>
                  ) : (
                    pasta.gaveta?.descricao
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <select
                      name="status"
                      value={editedPasta.status}
                      onChange={(e) => setEditedPasta({ ...editedPasta, status: e.target.value })}
                      required
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                      <option value="Concluinte">Concluinte</option>
                    </select>
                  ) : (
                    pasta.status
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <button onClick={edit} className='px-3'>
                      <i className='fa fa-save'></i>
                    </button>
                  ) : (
                    <button className='px-3' onClick={() => toggleEdit(index, pasta)}>
                      <i className='fa fa-edit'></i>
                    </button>
                  )}
                  {editIndex === index ? (
                    <button className='px-3' onClick={cancelEdit}>
                      <i className='fa fa-close'></i>
                    </button>
                  ) : (
                    <button className='px-3' onClick={() => removePasta(pasta.id)}>
                      <i className='fa fa-trash'></i>
                    </button>
                  )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(PastaForm);
