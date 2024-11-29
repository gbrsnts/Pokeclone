function Stages ({ stagesSelecionados, setStagesSelecionados, stages}) {

    const handleMudarCheckbox = (stage) => {
        setStagesSelecionados((prevSelected) =>
            prevSelected.includes(stage)
                ? prevSelected.filter((h) => h !== stage)
                : [...prevSelected, stage]
        )
    }


    return (
        <div className="aba-container">
                {stages.map((stage) => (
                    <div className="aba-item" key={stage}>
                        <label>
                            <input
                            type="checkbox"
                            checked={stagesSelecionados.includes(stage)}
                            onChange={() => handleMudarCheckbox(stage)}
                            />
                            {stage}
                        </label>
                    </div>
                ))}
            </div>
    )    
}

export default Stages
