import React, { useState } from 'react';
import axios from 'axios';
import PdfPageSelector from './PdfPageSelector';

function FileUpload() {



  const [selectedFile, setSelectedFile] = useState(null);
  const [fileNameonServer, setFileNameonServer] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios
        .post('http://localhost:5000/file', formData)
        .then((response) => {
          console.log(response.data.fileName);
          setFileNameonServer(response.data.fileName);
          // Handle success, e.g., show a success message to the user
        })
        .catch((error) => {
          console.error('Error uploading file: ', error);
          // Handle error, e.g., show an error message to the user
        });
    }
  };

  return (
    <div>
      <h2 className=''>File Upload Form</h2>
      
   
        <form onSubmit={handleFormSubmit}>
          <label>
            Select File:
            <input type="file" onChange={handleFileChange} multiple={false} accept=".pdf" />
          </label>
          <br />
          <button type="submit">Upload File</button>
        </form>
        
        <div>

          <PdfPageSelector fileNameonServer={fileNameonServer} />
        </div>
      


    </div>
  );
}

export default FileUpload;
