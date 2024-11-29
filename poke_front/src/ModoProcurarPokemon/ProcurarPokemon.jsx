import { useState } from 'react';
import { ProvedorDados } from '../hooks/provedorDados'
import { Helmet } from 'react-helmet'
import Formulario from './Cards/Formulario'
import Cards from './Cards/Cards'
import './ProcurarPokemon.css'


function ProcurarPokemon() {
    const [result, setResult] = useState(null);

    return (
        <div id="procurar-pokemon-app">
            <Helmet>
                <title>Pokeclone - Procurar Pokémon</title>
            </Helmet>
            <div className="container-procurar">
                <h2 className="titulo-pokemon">Procurar Pokémon</h2>
                <p>Descubra o Pokémon do modo clássico!</p>
                <ProvedorDados>
                    <Formulario setResult={setResult} />
                </ProvedorDados>
            </div>
            
            {result && (
                <div className="container-procurar" id="cards">
                    <Cards result={result} />
                </div>
            )}
        </div>
    );
}

export default ProcurarPokemon;
