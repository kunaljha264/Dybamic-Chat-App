const UserService = require("../services/userService");

const userService = new UserService();

const registrationGet = async(req,res)=>{
    try {
        console.log("Hello");
        // console.log("HEllo from controller");
        res.render('register');
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            err:error.explanation ,
            message:error.message,
        })
    }
}

const registrationPost = async(req,res)=>{
    try {
        // console.log(req.body);
        const response = await userService.create({
            name: req.body.name,
            email:req.body.email,
            image:'images'+req.file.filename,
            password:req.body.password
        });
        res.render('register', {message: "Your registration has been completed"});
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            err:error.explanation ,
            message:error.message,
        })
    }
}

module.exports={
    registrationGet,
    registrationPost,
}