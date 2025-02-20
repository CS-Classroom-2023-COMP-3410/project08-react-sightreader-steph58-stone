import React, { useState, useEffect } from "react";

const FileSelector = ({ onFileChange }) => {
    const [files, setFiles] = useState([]);
    // const [selectedIndex, setSelectedIndex] = useState("");
    const [selectedFile, setSelectedFile] = useState("");

    const ABC_EXT = '.abc';
    const PLS_EXT = '.pls';

    // Playlist variables.
    let playlist_files = [
        {label: 'cecilio-lesson1-open-strings.abc'},
        {label: 'cecilio-lesson2-first-position.abc'},
        {label: 'cecilio-lesson2-twinkle-twinkle-little-star.abc'},
        {label: 'cecilio-lesson3-exercise-1.abc'},
        {label: 'cecilio-lesson3-exercise-2.abc'},
        {label: 'hot-cross-buns.abc'}
    ];
    
    useEffect(() => {
        // setSelectedIndex(0);
        setFiles(playlist_files);
    }, []);

    const handleFileChange = async (event) => {
        setSelectedFile(event.target.value);

        // clear_playlist();
        // update_playlist();

        if (selectedFile.endsWith(ABC_EXT)) {
            // $('#abc-textarea-container').hide();
            //load_abc_file(selectedFile);
        } else if(selectedFile.endsWith(PLS_EXT)) {
            // $('#abc-textarea-container').hide();
            //load_playlist_file(selectedFile);
        } else {
            // $('#abc-textarea-container').show();
            // load_abc($('#abc-textarea').val());
        }
    
        // selectedFile.blur();
        onFileChange(event);
    };

    return (
        <>
            <label htmlFor="file">File:</label>
            <select id="file" value={selectedFile} onChange={handleFileChange}>
                <option value="">---Custom ABC---</option>
                {files.map((file) => (
                    <option key={file.label} value={file.label}>
                        {file.label}
                    </option>
                ))}
            </select>
        </>
    );
};

export default FileSelector;