const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, './assets/uploads');
    },
    filename: (req, file, cb) => {
        return cb(null, "u" + Date.now() + Math.round(Math.random() * 1E9));
    },
});

const uploadMiddleWare = multer({ storage: storage });






module.exports = { uploadMiddleWare };


