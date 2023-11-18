const router = require('express').Router();

const {fileupload,filesFetch} = require('../controllers/fileControllers');
const {uploadMiddleWare} = require('../middlewares/fileMiddleware');



router.route('/files').post(uploadMiddleWare.single('file'),fileupload);

router.route('/files').get(filesFetch);








module.exports = router;