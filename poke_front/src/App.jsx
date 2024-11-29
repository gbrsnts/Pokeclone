import Classico from './ModoClassico/Classico';
import ProcurarPokemon from './ModoProcurarPokemon/ProcurarPokemon';
import Sugestao from './ModoSugestao/Sugestao';
import Melhorias from './ModoMelhorias/Melhorias';
import { ProvedorDados } from './hooks/provedorDados'
import githubLogo from './assets/github.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

function App() {
  return (
    <div id="app">
      <h1 id="banner" onClick={() => window.location.href = '/'}>Pokeclone</h1> 

      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/classic" element={<ProvedorDados><Classico /></ProvedorDados>} />                
        <Route path="/procurar" element={<ProcurarPokemon />} />
        <Route path="/sugestoes" element={<Sugestao />} />
        <Route path="/melhorias" element={<Melhorias />}/>
      </Routes>
    </div>
  )
}

function Menu() {
  const navigate = useNavigate()
  const handleGitHub = () => {
    window.open('https://github.com/', '_blank');
  };

  return (
    <div id="sub-app">
      <div className="botao-container">
        <button className="botao-jogar" onClick={() => navigate('/classic')}>
          Clássico
        </button>
        <button className="botao-jogar" onClick={() => navigate('/procurar')}>
          Procurar Pokémon
        </button>
        <button className="botao-jogar" onClick={() => navigate('/sugestoes')}>
          Sugestões
        </button>
        <button className="botao-jogar" onClick={() => navigate('/melhorias')}>
          Melhorias mapeadas
        </button>
        <button className="botao-jogar" onClick={handleGitHub}>
          Repositório Github
        </button>
      </div>
    </div>
  );
}

export default App;