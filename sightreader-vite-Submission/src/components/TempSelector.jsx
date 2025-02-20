import React, { useState, useEffect } from "react";

const TempoSelector = ({ onTempoChange }) => {
    const [tempos, setTempos] = useState([]);
    const [selectedTempo, setSelectedTempo] = useState("");

    useEffect(() => {
        const staticTempos = [
            {value: "30"},
            {value: "60"},
            {value: "90"},
            {value: "120"},
            {value: "180"},
            {value: "240"},
        ];
        setTempos(staticTempos);
    }, []);

    const handleTempoChange = async (event) => {
        const newTempoValue = event.target.value;
        setSelectedTempo(newTempoValue);
        onTempoChange(newTempoValue);
    };

    return (
        <>
            <label htmlFor="tempo">Tempo:</label>
            <select id="tempo" value={selectedTempo} onChange={handleTempoChange}>
                <option value="">inherit</option>
                {tempos.map((tempo) => (
                    <option key={tempo.value} value={tempo.value}>
                        {tempo.value}
                    </option>
                ))}
            </select>
        </>
    );
};

export default TempoSelector;