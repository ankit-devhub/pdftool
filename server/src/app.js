const app = require('express')();







//router middleware
app.use(require('cors')());
app.use(require('express').json());
app.use(require('express').urlencoded({ extended: true }));
app.use('/', require('./routes/fileRoutes'));




app.get('/api/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = require('path').join(__dirname, '../assets/uploads', filename);
    console.log(__dirname,__filename);
  
    // Check if the file exists
    if (require('fs').existsSync(filePath)) {
      // Send the file
      res.sendFile(filePath);
    } else {
      // File not found
      res.status(404).json({ error: 'File not found' });
    }
  });
module.exports = {app};