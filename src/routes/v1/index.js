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
router.get('/login', userController.loginGet);
router.post('/login', userController.loginPost);
router.get('/logout', userController.logoutGet);
router.get('/dashboard', userController.dashboardGet);

router.get('*', function(req,res){
    res.redirect('/v1/login');
})


module.exports = router;

