const fileupload = (req, res) => {
    res.json({ message: 'File Uploaded Successfully', fileName: req.file.filename });
}




const getUploadedFiles = (req, res) => {
    const fileName = req.params.fn;
    if(!fileName) {
        res.status(400).json({ error: 'File name is required' });
    }
    const filePath = require('path').join(__dirname, '../../assets/uploads', fileName);

    if (require('fs').existsSync(filePath)) {
        // Send the file
        res.sendFile(filePath);
    } else {
        // File not found
        res.status(404).json({ error: 'File not found' });
    }
}


const getProcessedFiles = (req, res) => {
    const fileName = req.params.fn;
    if(!fileName) {
        res.status(400).json({ error: 'File name is required' });
    }
    const filePath = require('path').join(__dirname, '../../assets/processed', fileName);

    if (require('fs').existsSync(filePath)) {
        // Send the file
        console.log(filePath);
        res.sendFile(filePath);
    } else {
        // File not found
        res.status(404).json({ error: 'File not found' });
    }
}





const exportFile = async (req, res) => {

    const { PDFDocument, rgb } = require('pdf-lib');

    async function extractPages(inputPath, outputPath, selectedPages) {
        if(selectedPages.length === 0) {
            console.log('No pages selected');
            return;
        }
        try {
            const pdfBytes = await require('fs').promises.readFile(inputPath);
            const pdfDoc = await PDFDocument.load(pdfBytes);

            const newPdf = await PDFDocument.create();

            for (const pageNum of selectedPages) {
                const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum - 1]);
                newPdf.addPage(copiedPage);
            }

            const newPdfBytes = await newPdf.save();
            await require('fs').promises.writeFile(outputPath, newPdfBytes);
        } catch (error) {
            console.error(`Error in extractPages: ${error.message}`);
            throw error;
        }
    }


    try {
        const generatePdfName = `pdftool-${Date.now()}.pdf`
        const { fileName } = req.body;
        if(!fileName) {
            res.status(400).json({ error: 'File name is required' });
        }

        const inputPdfPath = require('path').join(__dirname, '../../assets/uploads', fileName);
        const outputPdfPath = require('path').join(__dirname, '../../assets/processed', generatePdfName);
        const selectedPages = req.body.selectedPages;

       
        await extractPages(inputPdfPath, outputPdfPath, selectedPages);

        res.json({ message: 'PDF created successfully', fileName: generatePdfName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}






module.exports = { fileupload, getUploadedFiles, getProcessedFiles, exportFile };