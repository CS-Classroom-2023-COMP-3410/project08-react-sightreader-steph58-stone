import React, { useState, useEffect } from "react";

const DeviceSelector = ({ onDeviceChange }) => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState("");

    useEffect(() => {
        // Fetch audio input devices
        const fetchDevices = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const deviceList = await navigator.mediaDevices.enumerateDevices();
                const audioDevices = deviceList.filter(device => device.kind === "audioinput");
                setDevices(audioDevices);
                if (audioDevices.length > 0) {
                    setSelectedDevice(audioDevices[0].deviceId);
                    onDeviceChange(audioDevices[0].deviceId);
                }
            } catch (error) {
                console.error("Error accessing audio devices:", error);
            }
        };

        fetchDevices();
    }, []);

    const handleDeviceChange = async (event) => {
        const newDeviceId = event.target.value;
        setSelectedDevice(newDeviceId);
        onDeviceChange(newDeviceId);
    };

    return (
        <>
            <label htmlFor="devices">Microphone:</label>
            <select id="devices" value={selectedDevice} onChange={handleDeviceChange}>
                {devices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `Microphone ${device.deviceId}`}
                    </option>
                ))}
            </select>
        </>
    );
};

export default DeviceSelector;