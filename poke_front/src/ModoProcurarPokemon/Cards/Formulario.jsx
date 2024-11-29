import { useState, useEffect } from 'react';
import { useData } from '../../hooks/provedorDados'
import useSearch from '../../hooks/useSearch'
import Stages from '../components/Stages';
import Habitats from '../components/Habitats';
import Cores from '../components/Cores';
import Tipo1 from '../components/Tipo1';
import Tipo2 from '../components/Tipo2';
import Dimensoes from '../components/Dimensoes';
import './Formulario.css';

function Formulario({ setResult }) {
    const [minWeight, setMinWeight] = useState(0.1)
    const [maxWeight, setMaxWeight] = useState(460)
    const [minHeight, setMinHeight] = useState(20)
    const [maxHeight, setMaxHeight] = useState(880)
    const stages = [3, 2, 1]
    const [stagesSelecionados, setStagesSelecionados, ] = useState(stages)
    const {type1, type2, habitats, colors, base } = useData()
    const [coresSelecionadas, setCoresSelecionadas] = useState([])
    const [habitatsSelecionados, setHabitatsSelecionados] = useState([])
    const [tipo2Selecionados, setTipo2Selecionados] = useState([])
    const [tipo1Selecionados, setTipo1Selecionados] = useState([])
    const [abaAtiva, setAbaAtiva] = useState('Tipo1')

    // Inicializa com todos selecionados
    useEffect(() => {
        setTipo1Selecionados(type1);
        setTipo2Selecionados(type2)
        setHabitatsSelecionados(habitats)
        setCoresSelecionadas(colors)
    }, [type1, type2, habitats, colors])

    //Parâmetros para a busca
    const searchParams = {
        minWeight: Number(minWeight) || 0.1,
        maxWeight: Number(maxWeight) || 460,
        minHeight: minHeight || 20,
        maxHeight: maxHeight || 880,
        type1: tipo1Selecionados.join(','),
        type2: tipo2Selecionados.join(','),
        stage: stagesSelecionados.join(','),
        color: coresSelecionadas.join(','),
        habitat: habitatsSelecionados.join(','),
    }
    
    const { data, error, fetchData } = useSearch(base, searchParams)

    useEffect(() => {
        if (data) {
            setResult(data);
        }
    }, [data, setResult])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchData()
    }

    const handleInverterSelecao = () => {
        let novosSelecionados;

        switch (abaAtiva) {
            case 'Tipo1':
                novosSelecionados = type1.filter(tipo => !tipo1Selecionados.includes(tipo));
                setTipo1Selecionados(novosSelecionados);
                break;
            case 'Tipo2':
                novosSelecionados = type2.filter(tipo => !tipo2Selecionados.includes(tipo));
                setTipo2Selecionados(novosSelecionados);
                break;
            case 'Cores':
                novosSelecionados = colors.filter(cor => !coresSelecionadas.includes(cor));
                setCoresSelecionadas(novosSelecionados);
                break;
            case 'Habitat':
                novosSelecionados = habitats.filter(habitat => !habitatsSelecionados.includes(habitat));
                setHabitatsSelecionados(novosSelecionados);
                break;
            case 'Stages':
                novosSelecionados = stages.filter(stage => !stagesSelecionados.includes(stage));
                setStagesSelecionados(novosSelecionados);
                break;
            default:
                break;
        }
    }

    const renderizarAba = () => {
        switch (abaAtiva) {
            case 'Tipo1':
                return <Tipo1 tipo1Selecionados={tipo1Selecionados} setTipo1Selecionados={setTipo1Selecionados} type1={type1}/>;
            case 'Tipo2':
                return <Tipo2 tipo2Selecionados={tipo2Selecionados} setTipo2Selecionados={setTipo2Selecionados} type2={type2} />;
            case 'Cores':
                return <Cores coresSelecionadas={coresSelecionadas} setCoresSelecionadas={setCoresSelecionadas} colors={colors} />;
            case 'Habitat':
                return <Habitats habitatsSelecionados={habitatsSelecionados} setHabitatsSelecionados={setHabitatsSelecionados} habitats={habitats} />;
            case 'Stages':
                return <Stages stagesSelecionados={stagesSelecionados} setStagesSelecionados={setStagesSelecionados} stages={stages} />;
            case 'Dimensões':
                return (
                    <Dimensoes
                        minHeight={minHeight}
                        maxHeight={maxHeight}
                        minWeight={minWeight}
                        maxWeight={maxWeight}
                        setMinHeight={setMinHeight}
                        setMaxHeight={setMaxHeight}
                        setMinWeight={setMinWeight}
                        setMaxWeight={setMaxWeight}
                        fetchData={fetchData}
                    />
                );
            default:
                return null;
        }
    }

    const reiniciarFiltros = () => {
        setMinHeight(20)
        setMaxHeight(880)
        setMinWeight(0.1)
        setMaxWeight(460)
        setTipo1Selecionados(type1)
        setTipo2Selecionados(type2)
        setHabitatsSelecionados(habitats)
        setCoresSelecionadas(colors)
        setStagesSelecionados(stages)
        setAbaAtiva('Tipo1')
    }

    return (
        <div id="app">
            <div className="abas">
                {['Tipo1', 'Tipo2', 'Habitat', 'Cores', 'Stages', 'Dimensões'].map((aba) => (
                    <button
                        key={aba}
                        className={`aba-button ${abaAtiva === aba ? 'ativo' : ''}`}
                        onClick={() => setAbaAtiva(aba)}
                    >
                        {aba}
                    </button>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="aba-content">{renderizarAba()}</div>
                <button type="submit" className="search-button">Buscar</button>  
                {abaAtiva !== 'Dimensões' && (
                    <button type="button" className="search-button" onClick={handleInverterSelecao}>Inverter Seleção</button>
                )}
                <button type="submit" className="search-button" onClick={reiniciarFiltros}>Reiniciar filtros</button>
            </form>
        </div>
    )
}

export default Formulario


