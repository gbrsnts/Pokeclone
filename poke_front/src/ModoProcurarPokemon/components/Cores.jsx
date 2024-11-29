function Cores({ coresSelecionadas, setCoresSelecionadas, colors }) {

    const handleMudarCheckbox = (cor) => {
        setCoresSelecionadas((prevSelected) =>
            prevSelected.includes(cor)
                ? prevSelected.filter((h) => h !== cor)
                : [...prevSelected, cor]
        )
    }


    return (
        <div className="aba-container">
            {colors.map((cor) => (
                <div className="aba-item" key={cor}>
                    <label>
                        <input
                        type="checkbox"
                        checked={coresSelecionadas.includes(cor)}
                        onChange={() => handleMudarCheckbox(cor)}
                        />
                        {cor}
                    </label>
                </div>
            ))}
        </div>
    )    
}

export default Cores