import { useEffect, useState, useRef } from "react";
import Pitchfinder from "pitchfinder";

const SightReader = ({ selectedABC }) => {
    // const ABC_EXT = ".abc";
    // const PLS_EXT = ".pls";
    // const NOTE_COLOR_DEFAULT = "#000000";
    // const NOTE_COLOR_PLAYING = "#3D9AFC";
    // const DEFAULT_SCALE = 1.5;
    // const DEFAULT_TEMPO = 60;
    // const SILENCE = "-";
    // const MIN_VOLUME = 0.075;

    // const scales = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    // const [currentMidiNumber, setCurrentMidiNumber] = useState(0);
    // const [expectedMidiNumber, setExpectedMidiNumber] = useState(0);
    // const [currentScoreStats, setCurrentScoreStats] = useState(null);
    // const [scrollOffset, setScrollOffset] = useState(0);
    // const [currentQpm, setCurrentQpm] = useState(null);
    const [loadedABC, setLoadedABC] = useState(null);
    const [recording, setRecording] = useState(false);
    // const [countdown, setCountdown] = useState(3);
    // const [playlistFiles, setPlaylistFiles] = useState([]);

    // const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());
    const pitchDetectorRef = useRef(null);
    const sourceStreamRef = useRef(null);
    // const synthRef = useRef(null);

    useEffect(() => {
        
        if(selectedABC != null)
            loadABC(selectedABC);

        pitchDetectorRef.current = new Pitchfinder.AMDF();
    }, []);

    const startRecording = async () => {
        setRecording(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            sourceStreamRef.current = stream;
            // Implement pitch detection logic
        } catch (err) {
            console.error("Error accessing microphone:", err);
        }
    };

    const stopRecording = () => {
        setRecording(false);
        if (sourceStreamRef.current) {
            sourceStreamRef.current.getTracks().forEach(track => track.stop());
        }
    };

    const loadABC = (abcData) => {
        setLoadedABC(abcData);
        console.log("Loaded ABC:", abcData);
    };

    return (
        <div>
            <h2>Sight Reader</h2>
            <button onClick={startRecording} disabled={recording}>Start</button>
            <button onClick={stopRecording} disabled={!recording}>Stop</button>
            {/* <p>Current MIDI Number: {currentMidiNumber}</p>
            <p>Expected MIDI Number: {expectedMidiNumber}</p>
            <p>Scroll Offset: {scrollOffset}</p>
            <p>Current QPM: {currentQpm}</p> */}
            <textarea
                placeholder="Paste ABC notation here"
                onChange={(e) => loadABC(e.target.value)}
                rows={5}
                cols={50}
            />
            {loadedABC && <pre>{loadedABC}</pre>}
        </div>
    );
};

export default SightReader;
