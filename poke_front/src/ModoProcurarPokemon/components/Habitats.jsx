function Habitats({ habitatsSelecionados, setHabitatsSelecionados, habitats }) {

    const handleMudarCheckbox = (habitat) => {
        setHabitatsSelecionados((prevSelected) =>
            prevSelected.includes(habitat)
                ? prevSelected.filter((h) => h !== habitat)
                : [...prevSelected, habitat]
        )
    }

    return (
        <div className="aba-container">
                {habitats.map((habitat) => (
                    <div className="aba-item" key={habitat}>
                        <label>
                            <input
                            type="checkbox"
                            checked={habitatsSelecionados.includes(habitat)}
                            onChange={() => handleMudarCheckbox(habitat)}
                            />
                            {habitat}
                        </label>
                    </div>
                ))}
        </div>
    )    
}

export default Habitats