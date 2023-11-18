const { app } = require('./src/app');
require('dotenv').config();



app.listen(5000, () => {
    console.log(`Server Running on port 5000`);
});