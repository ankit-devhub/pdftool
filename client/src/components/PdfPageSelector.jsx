import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Checkbox } from "@material-tailwind/react";
import axios from 'axios';




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
      <div className={`border ${selected ? "border-yellow-500 border-2 shadow-xl" : "border-black"} shrink-0 w-fit flex h-[505px] overflow-clip relative `}>
        <Page pageNumber={pageNumber} renderTextLayer={false} className={"group-hover:opacity-20"} scale={0.6} />
        <div className='absolute items-center group cursor-pointer flex justify-center h-full w-full'>
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
    <div className='grid grid-flow-row grid-cols-1  md:grid-cols-2 xl:grid-cols-3 w-full items-center gap-4 p-6'>
      {children}
    </div>
  )
}



const url = "http://localhost:5000/file"

export default function PdfPageSelector({ fileNameonServer }) {

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [exportList, setExportList] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }



  return (
    <>
      <div className="">




        <Document file={`${url}/${fileNameonServer}`} onLoadSuccess={onDocumentLoadSuccess} >
          <PagesGrid>
            {
              Array.from(new Array(numPages), (el, index) => (
                <SelectablePage key={index} pageNumber={index + 1} exportList={exportList} setExportList={setExportList} />
              ))
            }
          </PagesGrid>


        </Document>












        <div className='flex justify-center fixed bottom-0 w-full p-6 ' >
          <input type="button" value="Export PDF" onClick={() => {
            console.log(exportList)
          }} className='bg-green-500 cursor-pointer p-2 text-lg font-semibold px-6 rounded-lg' />
        </div>
      </div>
    </>
  );
}
