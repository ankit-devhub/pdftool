const router = require('express').Router();

const {fileupload, exportFile, getUploadedFiles, getProcessedFiles} = require('../controllers/fileControllers');
const {uploadMiddleWare} = require('../middlewares/fileMiddleware');



router.route('/file').post(uploadMiddleWare.single('file'),fileupload);

router.route('/file/u/:fn').get(getUploadedFiles);

router.route('/file/p/:fn').get(getProcessedFiles);

router.route('/export').post(exportFile);








module.exports = router;