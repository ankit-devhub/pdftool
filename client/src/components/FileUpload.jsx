import React, { useState } from 'react';
import axios from 'axios';
import PdfPageSelector from './PdfPageSelector';
import { BsFiletypePdf } from "react-icons/bs";

function FileUpload() {



  const [selectedFile, setSelectedFile] = useState(null);
  const [fileNameonServer, setFileNameonServer] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      // Check if the selected file is a PDF
      if (selectedFile.type === 'application/pdf') {
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
      } else {
        // Handle the case when the selected file is not a PDF
        console.error('Selected file is not a PDF.');
        // You can show an error message to the user if needed
      }
    }
  };

  return (
    <div>



      <div className='flex items-center justify-center w-full h-screen bg-teal-50 '>
        <div className='grid grid-flow-row grid-cols-1 bg-white w-fit h-fit rounded-2xl'>
          <div className='flex flex-col gap-10 p-6'>
            <div className='flex flex-col col-span-1'>
              <span className='text-3xl font-bold text-teal-300'>
                Upload PDF Files
              </span>
              <span className='text-sm font-medium text-teal-900'>Upload PDF documents you want to work on</span>
            </div>
            <div className='flex items-center justify-center p-20 border-2 border-teal-400 border-dashed rounded-2xl'>
              <div className='flex flex-col items-center justify-center gap-3 text-xl cursor-pointer'>
                <BsFiletypePdf size={80} className='fill-teal-600' />
                <span>Drag and Drop Files Here</span>
                <span>- Or -</span>
                <form className='flex flex-col items-center justify-center gap-3' onSubmit={handleFormSubmit}>

                  <input type="file" onChange={handleFileChange} multiple={false} accept=".pdf" />

                  <button className='p-2 px-6 mt-5 bg-teal-400 rounded-xl' type="submit">Upload File</button>
                </form>
              </div>
            </div>
          </div>
          {/* <div className='col-span-2'>
            <span>Uploaded Files</span>
          </div> */}
        </div>
      </div>



      <div>
        {
          fileNameonServer !== null &&
          <PdfPageSelector fileNameonServer={fileNameonServer} />
        }
      </div>



    </div>
  );
}

export default FileUpload;
