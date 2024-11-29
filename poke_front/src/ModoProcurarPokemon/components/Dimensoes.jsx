import './Dimensoes.css';


function Dimensoes({ minHeight, maxHeight, minWeight, maxWeight, setMinHeight, setMaxHeight, setMinWeight, setMaxWeight, fetchData }) {
    const handleFocus = (setter) => {
        setter("");
    };


    return (
        <div className="dimensoes-container">
                <div>
                    <div id="altura"></div>
                        <label>Altura mínima<input type="number" value={minHeight} onChange={(e) => setMinHeight(e.target.value)} onFocus={() => handleFocus(setMinHeight)} placeholder={20} onBlur={fetchData} /></label>
                        <label>Altura máxima<input type="number" value={maxHeight} onChange={(e) => setMaxHeight(e.target.value)} onFocus={() => handleFocus(setMaxHeight)} placeholder={880} onBlur={fetchData} /></label>
                    <div id="peso">
                        <label>Peso mínimo
                            <input type="number" value={minWeight} onChange={(e) => setMinWeight(e.target.value)} onFocus={() => handleFocus(setMinWeight)} placeholder={0.1} onBlur={fetchData} />
                        </label>
                        <label>Peso máximo
                            <input type="number" value={maxWeight} onChange={(e) => setMaxWeight(e.target.value)} onFocus={() => handleFocus(setMaxWeight)} placeholder={460} onBlur={fetchData} />
                        </label>
                    </div>
                </div>
        </div>
    )    
}

export default Dimensoes