const router = require('express').Router();

const {fileupload,filesFetch, exportFile} = require('../controllers/fileControllers');
const {uploadMiddleWare} = require('../middlewares/fileMiddleware');



router.route('/file').post(uploadMiddleWare.single('file'),fileupload);

router.route('/file/:fn').get(filesFetch);

router.route('/export').get(exportFile);








module.exports = router;