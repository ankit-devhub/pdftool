import React, { useState } from 'react'
import axios from 'axios'

function FileUpload() {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (selectedFile) {
            console.log(selectedFile);
            const formData = new FormData();
            formData.append('file', selectedFile);

            axios.post('http://localhost:5000/files', formData)
                .then(response => {
                    console.log(response.data);
                    // Handle success, e.g., show a success message to the user
                })
                .catch(error => {
                    console.error('Error uploading file: ', error);
                    // Handle error, e.g., show an error message to the user
                });
        }
    };


    return (
        <div>
            <h2>File Upload Form</h2>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Select File:
                    <input type="file" onChange={handleFileChange} multiple={false} accept='.pdf'/>
                </label>
                <br />
                <button type="submit">Upload File</button>
            </form>
        </div>
    )
}

export default FileUpload