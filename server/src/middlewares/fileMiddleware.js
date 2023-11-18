const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, './assets/uploads');
    },
    filename: (req, file, cb) => {
        return cb(null, file.originalname + '-' + Date.now());
    },
});

const uploadMiddleWare = multer({ storage: storage });






module.exports = { uploadMiddleWare };


