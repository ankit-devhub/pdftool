const app = require('express')();







//router middleware
app.use(require('express').json());
app.use(require('express').urlencoded({ extended: true }));
app.use('/', require('./routes/fileRoutes'));



module.exports = {app};