import React, {useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import axios from 'axios';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';





function SelectablePage({ pageNumber, exportList, setExportList }) {

  const [selected, setSelected] = useState(false)

  const handleSelection = (pageNumber) => {

    if (exportList.includes(pageNumber)) {
      setExportList(exportList.filter((page) => page !== pageNumber))
    } else {
      setExportList([...exportList, pageNumber])
    }
    setSelected(!selected);
  }



  return (
    <div className='flex items-center justify-center '>
      <div className={`border ${selected ? "border-yellow-500 border-2 shadow-xl" : "border-black"} shrink-0 w-fit flex h-[252px] overflow-clip relative `}>
        <Page pageNumber={pageNumber} renderTextLayer={false} className={"group-hover:opacity-20"} scale={0.3} />
        <div className='absolute flex items-center justify-center w-full h-full cursor-pointer group'>
          <div className=''>
            <input type='checkbox' className='' onClick={() => { handleSelection(pageNumber) }} />
          </div>
        </div>
      </div>
    </div>
  )
}











function PagesGrid({ children }) {
  return (
    <div className='grid items-center w-full grid-flow-row grid-cols-2 gap-4 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8'>
      {children}
    </div>
  )
}





export default function PdfPageSelector({ fileNameonServer }) {


  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [exportList, setExportList] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }




  return (
    <>
      <div className="">




        <Document file={`http://localhost:5000/file/u/${fileNameonServer}`} onLoadSuccess={onDocumentLoadSuccess} >
          <PagesGrid>
            {
              Array.from(new Array(numPages), (el, index) => (
                <SelectablePage key={index} pageNumber={index + 1} exportList={exportList} setExportList={setExportList} />
              ))
            }
          </PagesGrid>


        </Document>












        <div className='fixed bottom-0 flex justify-center w-full p-6 ' >
          <input type="button" value="Export PDF" onClick={() => {
            console.log(exportList);
            console.log(fileNameonServer);
            if(exportList.length <= 0){
              alert("Please select atleast one page to export");
              return;
            }
            axios.post("http://localhost:5000/export",
              {
                fileName: fileNameonServer,
                selectedPages: exportList
              }
            ).then((response) => {
              console.log(response.data.fileName);
              window.location.href=`http://localhost:5000/file/p/${response.data.fileName}`
            })
          }} className='p-2 px-6 text-lg font-semibold bg-green-500 rounded-lg cursor-pointer' />
        </div>
      </div>
    </>
  );
}
