import { useState, useEffect } from 'react'
import Pitchfinder from "pitchfinder";
import ABCJS from "abcjs";

import DeviceSelector from './components/DeviceSelector'
import ProfileSelector from './components/ProfileSelector'
import FileSelector from './components/FileSelector'
import TempoSelector from './components/TempSelector'
// import Controls from './components/Controls'
import SightReader from './components/SightReader';
import './preface.css'
import './sightreader.css'

function App() {

  const [notation, setNotation] = useState("");
  const [micStream, setMicStream] = useState(null);
  const [detectedPitch, setDetectedPitch] = useState(null);
  // const [expectedPitch, setExpectedPitch] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  // const notationRef = useRef(null);
  let detectPitch = new Pitchfinder.YIN();

  useEffect(() => {
      if (notation) {
          ABCJS.renderAbc("notation", notation);
      }
  }, [notation]);

  const startMic = async () => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setMicStream(stream);
    const source = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    source.connect(analyser);
    
    const processAudio = () => {
        const buffer = new Float32Array(analyser.fftSize);
        analyser.getFloatTimeDomainData(buffer);
        const pitch = detectPitch(buffer);
        setDetectedPitch(pitch ? Math.round(pitch) : null);
    };

    setInterval(processAudio, 100);
  };

  const stopMic = () => {
      if (micStream) {
          micStream.getTracks().forEach(track => track.stop());
          setMicStream(null);
      }
  };

  const handleDeviceChange = async (deviceId) => {
    console.log("Handling Device Change");
    if (!deviceId) return;
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: { deviceId: { exact: deviceId } },
        });
        console.log("Microphone stream started with device:", deviceId);
        // Store the stream if needed
    } catch (error) {
        console.error("Error selecting microphone:", error);
    }
  };

  const handleProfileChange = async () => {

    console.log("Handling Profile Change");
    return;
  };

  const handleFileChange = async (event) => {
    console.log("Handling File Change");

    var filename = event.target.value;
    console.log('Loading file ' + filename + '.');

    return;
  };

  const handleTempoChange = async () => {
    console.log("Handling Tempo Change");
    return;
  };

  // const handleControlPressed = async () => {
  //   console.log("Handling Control Pressed");
  //   return;
  // };

  return (
    <div>
      <div className="container">
        <h3>ABC Sightreader</h3>
      </div>
      <div className="container">
        <div className="row-fluid">
            <div className="span12" id="status" title="Status">1. Select your mic 2. Select your ABC file 3. Press start</div>
        </div>
        <div className="row-fluid controls">
            <div className="span12">

              <DeviceSelector onDeviceChange={handleDeviceChange} />

              <ProfileSelector onProfileChange={handleProfileChange} />

              <FileSelector onFileChange={handleFileChange} />

            </div>
            <div className='span12 px-2'>

              <TempoSelector onFileChange={handleTempoChange} />

              <SightReader></SightReader>
          </div>
      </div>
    </div>
    </div>
  )
}

export default App;
