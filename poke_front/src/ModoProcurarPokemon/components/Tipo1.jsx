function Tipos({ tipo1Selecionados, setTipo1Selecionados, type1}) {

    const handleMudarCheckbox = (tipo) => {
        setTipo1Selecionados((prevSelected) =>
            prevSelected.includes(tipo)
                ? prevSelected.filter((h) => h !== tipo)
                : [...prevSelected, tipo]
        ) 
    }

    return (
        <div className="aba-container">
            {type1.map((tipo) => (
                <div className="aba-item" key={tipo}>
                    <label>
                        <input
                        type="checkbox"
                        checked={tipo1Selecionados.includes(tipo)}
                        onChange={() => handleMudarCheckbox(tipo)}
                        />
                        {tipo}
                    </label>
                </div>
            ))}
        </div>
    )    
}

export default Tipos