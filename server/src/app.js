const app = require('express')();
const { PDFDocument, rgb } = require('pdf-lib');








//router middleware
app.use(require('cors')());
app.use(require('express').json());
app.use(require('express').urlencoded({ extended: true }));
app.use('/', require('./routes/fileRoutes'));









module.exports = { app };