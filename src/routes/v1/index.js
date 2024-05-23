const express = require('express');
const userController = require('../../controllers/userController');
const router = express.Router();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname, '../../public/images'))
    },
    filename: function(req,file,cb){
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
})

const upload = multer({storage : storage});

router.get('/register',  userController.registrationGet);
router.post('/register', upload.single('image'), userController.registrationPost)

module.exports = router;

