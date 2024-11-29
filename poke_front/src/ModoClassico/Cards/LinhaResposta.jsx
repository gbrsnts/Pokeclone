import './LinhaResposta.css';

function LinhaResposta({ pokemon, pokemonSorteado }) {

    const heightformatada = pokemon.height <= 99 
    ? `${pokemon.height}cm` 
    : `${(pokemon.height / 100).toFixed(2).replace('.', 'm').replace('00', '')}`;

    const weightformatada = (pokemon.weight % 1 === 0) 
        ? `${Number(pokemon.weight).toFixed(0)}kg` 
        : `${Number(pokemon.weight).toFixed(1)}kg`

    const classificaValor = (valor, valorSorteado, valorAlternativo = null) => {
        if (valor === valorSorteado) return 'match-color'
        if (valor === valorAlternativo) return 'close-color'
        return 'dismatch-color'
    }

    const classificaTipo = (type, sortedType, otherType) => {
        if (type === sortedType) return 'match-color';
        if (type === otherType) return 'close-color';
        return 'dismatch-color';
    }

    const classificaRelacao = (valor, valorSorteado) =>
        (+valor > +valorSorteado ? 'superior' :
            (+valor < +valorSorteado ? 'inferior' : ''))

    return (
        <tr className='novo-card'>
            <td className="imagem-pokemon">
                <img src={pokemon.url_sprite} alt={pokemon.name} className="pokemon-sprite" />
                <span className="pokemon-contexto">{pokemon.name}</span>
            </td>
            <td className={classificaTipo(pokemon.type1, pokemonSorteado.type1, pokemonSorteado.type2)}>{pokemon.type1}</td>
            <td className={classificaTipo(pokemon.type2, pokemonSorteado.type2, pokemonSorteado.type1)}>{pokemon.type2}</td>
            <td className={classificaValor(pokemon.habitat, pokemonSorteado.habitat)}>{pokemon.habitat}</td>
            <td className={classificaValor(pokemon.color, pokemonSorteado.color)}>{pokemon.color}</td>
            <td className={`${classificaValor(pokemon.stage, pokemonSorteado.stage)} ${classificaRelacao(pokemon.stage, pokemonSorteado.stage)}`}>
                {pokemon.stage}
            </td>
            <td className={`${classificaValor(pokemon.height, pokemonSorteado.height)} ${classificaRelacao(pokemon.height, pokemonSorteado.height)}`}>
                {heightformatada}
            </td>
            <td className={`${classificaValor(pokemon.weight, pokemonSorteado.weight)} ${classificaRelacao(pokemon.weight, pokemonSorteado.weight)}`}>
                {weightformatada}
            </td>
        </tr>
    );
}

export default LinhaResposta;