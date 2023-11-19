import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import pdffile from './2.pdf'

function PdfThumbnails() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfBlob, setPdfBlob] = useState(null);

    useEffect(() => {
        const fetchPdfFile = async () => {
          try {
            const response = await fetch('https://www.africau.edu/images/default/sample.pdf');
            const blob = await response.blob();
            setPdfBlob(blob);
          } catch (error) {
            console.error('Error fetching PDF file:', error);
          }
        };
      
        fetchPdfFile();
      }, []);


    function onDocumentSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document file={pdfBlob} onLoadSuccess={onDocumentSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
        </div>
    )
}

export default PdfThumbnails