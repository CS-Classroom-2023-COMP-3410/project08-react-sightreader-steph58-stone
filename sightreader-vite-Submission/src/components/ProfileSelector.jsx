import React, { useState, useEffect } from "react";

const ProfileSelector = ({ onProfileChange }) => {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState("");

    useEffect(() => {
        const staticProfiles = [{id: 1, label: 'My Profile'}];
		setProfiles(staticProfiles);
    }, []);

    const handleProfileChange = async (event) => {
        const newProfileId = event.target.value;
        setSelectedProfile(newProfileId);
        onProfileChange(newProfileId);
    };

    return (
        <>
            <label htmlFor="profiles">Profile:</label>
            <select id="profiles" value={selectedProfile} onChange={handleProfileChange}>
                {profiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>
                        {profile.label}
                    </option>
                ))}
            </select>
            <input type="text" id="newProfile" style={{display: 'none'}} placeholder="Enter name and press enter" />
        </>
    );
};

export default ProfileSelector;