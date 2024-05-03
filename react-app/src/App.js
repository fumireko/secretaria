import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PastaForm from './PastaForm';
import GavetaForm from './GavetaForm';
import BuscaForm from './BuscaForm';

function App() {
  const [pastas, setPastas] = useState([]);
  const [gavetas, setGavetas] = useState([]);
  const [showPastaForm, setShowPastaForm] = useState(false);
  const [showGavetaForm, setShowGavetaForm] = useState(false);
  const [activeNav, setActiveNav] = useState("inicio");
  const [showBuscaForm, setShowBuscaForm] = useState(false);

  useEffect(() => {
    fetchData();
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const fetchData = async () => {
    try {
      const { data: pastaData } = await axios.get('/api/pasta/');
      const { data: gavetaData } = await axios.get('/api/gaveta/');
      setPastas(pastaData);
      setGavetas(gavetaData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleForm = (form) => {
    if (form === 'pasta') {
      setShowPastaForm(true);
      setShowGavetaForm(false);
      setShowBuscaForm(false);
      setActiveNav(form);
    } else if (form === 'gaveta') {
      setShowGavetaForm(true);
      setShowPastaForm(false);
      setShowBuscaForm(false); 
      setActiveNav(form);
    } else if (form === 'busca') {
      setShowBuscaForm(true);
      setShowPastaForm(false);
      setShowGavetaForm(false);
      setActiveNav(form);
    }
  };  

  const toggleInicio = () => {
    setShowBuscaForm(false);
    setShowPastaForm(false);
    setShowGavetaForm(false);
    setActiveNav("inicio");
  };

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.shiftKey) {
      switch (event.keyCode) {
        case 49: // Ctrl+Shift+1
          toggleInicio();
          break;
        case 50: // Ctrl+Shift+2
          toggleForm('pasta');
          break;
        case 51: // Ctrl+Shift+3
          toggleForm('gaveta');
          break;
        case 52: // Ctrl+Shift+4
          toggleForm('busca');
          break;
        default:
          break;
      }
    }
  };

  return (
    <div>
      <nav className="nav nav-underline nav-fill my-3">
        <a className={`nav-link ${activeNav === "inicio" ? "active" : ""}`} aria-current="page" onClick={toggleInicio}>Início</a>
        <button className={`nav-link ${activeNav === "pasta" ? "active" : ""}`} onClick={() => toggleForm('pasta')}>Alunos</button>
        <button className={`nav-link ${activeNav === "gaveta" ? "active" : ""}`} onClick={() => toggleForm('gaveta')}>Gavetas</button>
        <a className={`nav-link ${activeNav === "busca" ? "active" : ""}`} aria-current="page" onClick={() => toggleForm('busca')}>Buscar</a>
      </nav>
      {showPastaForm && <PastaForm />}
      {showGavetaForm && <GavetaForm />}
      {showBuscaForm && <BuscaForm />}
      {!showPastaForm && !showGavetaForm && !showBuscaForm && (
        <div className='row py-3'>
          <div className='col-6'>
            <h1>Gavetas</h1>
            <table className='table'>
              <thead>
                <tr>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {gavetas.map((gaveta) => (
                  <tr key={gaveta.id}>
                    <td>{gaveta.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='col-6'>
            <h1>Pastas</h1>
            <table className='table'>
              <thead>
                <tr>
                  <th>Número</th> 
                  <th>Nome</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pastas.map((pasta) => (
                  <tr key={pasta.id}>
                    <td>{pasta.numeroPasta}</td>
                    <td>{pasta.nomeAluno}</td>
                    <td>{pasta.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
