





const fileupload = (req, res) => {

    res.send(req.file);
    console.log(req.file)
}

const filesFetch = (req, res) => {
    const {fileName} = req.body;
    console.log(fileName);
    res.send('files fetched successfully');
}






module.exports = { fileupload, filesFetch };