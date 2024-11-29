function Tipos({ tipo2Selecionados, setTipo2Selecionados, type2}) {

    const handleMudarCheckbox = (tipo) => {
        setTipo2Selecionados((prevSelected) =>
            prevSelected.includes(tipo)
                ? prevSelected.filter((h) => h !== tipo)
                : [...prevSelected, tipo]
        )
    }

    return (
        <div className="aba-container">
            {type2.map((tipo) => (
                <div className="aba-item" key={tipo}>
                    <label>
                        <input
                        type="checkbox"
                        checked={tipo2Selecionados.includes(tipo)}
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