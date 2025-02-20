// import React, { useState, useEffect } from "react";

const Controls = ({ onControlPressed }) => {
    
    const handleStartButtonClicked = async (event) => {
        onControlPressed(event);
    };

    const handleResetButtonClicked = async (event) => {
        onControlPressed(event);
    };

    const handleTuneButtonClicked = async (event) => {
        onControlPressed(event);
    };

    return (
        <>
            <button id="start" onClick={handleStartButtonClicked} disabled="disabled" title="Enable mic and begin playing along to sheet music.">Start</button>
            <button id="reset" onClick={handleResetButtonClicked}>Reset</button>
            <button id="tune" onClick={handleTuneButtonClicked} title="Enable mic and show pitch but don't play a game.">Tune</button>
        </>
    );
};

export default Controls;