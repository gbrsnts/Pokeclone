import React, { useEffect } from 'react';
import './TabelaResposta.css';
import LinhaResposta from './LinhaResposta';

function TabelaResposta({ result, pokemonSorteado}) {
    return (
        <>
        <table className="tabela-pokemon-classico">
            <thead>
                <tr>
                    <th>Pokémon</th>
                    <th>Tipo 1</th>
                    <th>Tipo 2</th>
                    <th>Habitat</th>
                    <th>Cor</th>
                    <th>Evolução</th>
                    <th>Altura</th>
                    <th>Peso</th>
                </tr>
            </thead>
            <tbody>
                {result.pokemons.map((pokemon, index) => (
                    <LinhaResposta key={index} pokemon={pokemon} pokemonSorteado={pokemonSorteado} />
                ))}
            </tbody>
        </table>

        </>
    );
}

export default TabelaResposta
