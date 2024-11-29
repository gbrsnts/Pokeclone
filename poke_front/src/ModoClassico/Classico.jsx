import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useData } from '../hooks/provedorDados'
import Formulario from './Cards/FormularioClassico'
import TabelaResposta from './Cards/TabelaResposta'
import './Classico.css'

function Classico() {
  const [idPokemon] = useState(Math.floor(Math.random() * 151) + 1);
  const { base } = useData()
  const [vitoria, setVitoria] = useState(false);
  const [result, setResult] = useState({ total: 0, pokemons: [] });
  const [pokemon, setPokemon] = useState(null)
  const [lista, setLista] = useState([])

  useEffect(() => {
    if (base && base.pokemons) {
      const listaInicial = base.pokemons.map(pokemon => ({
        name: pokemon.name,
        url_sprite: pokemon.url_sprite
      }))
      setLista(listaInicial)
      const selectedPokemon = base.pokemons.find(pokemon => pokemon.id === idPokemon)
      setPokemon(selectedPokemon)
    }
  }, [base, idPokemon])

  return (
    <div id="classico-app">
      <Helmet>
        <title>Pokeclone - Clássico</title>
      </Helmet>
      <div className="container-classico">
        <h2 className="titulo-pokemon">Modo Clássico</h2>
        <p>Advinhe o pokemon!</p>
        <p></p>
        {!vitoria && pokemon ? (
              <Formulario 
                  setVitoria={setVitoria} 
                  pokemonSorteado={pokemon.name} 
                  setResult={setResult}
                  lista={lista}
                  setLista={setLista}
              />
        ) : (
          vitoria && pokemon && (
              <>
                  <p className='parabens'>
                      Parabéns! O Pokémon era {pokemon.name}!
                  </p> 
                  <p className="tentativas">
                      Você acertou em {result.total} tentativa{result.total > 1 ? 's' : ''}.
                  </p>
                  <p>Deseja<button className="jogar-novamente" onClick={() => window.location.reload()}>jogar novamente</button>?</p>
              </>
          )
        )}
      </div>
      

      
      {result.total > 0  && (
        <div className="container-classico">
          <TabelaResposta result={result} pokemonSorteado={pokemon}/>
        </div>
      )}
    </div>
  );  
}

export default Classico;
