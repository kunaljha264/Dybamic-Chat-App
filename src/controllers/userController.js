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


const loginGet = async(req,res)=>{
    try {
        res.render('login');
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            err:error.explanation ,
            message:error.message,
        })
    }
}
const loginPost = async(req,res)=>{
    try {
        const response = await userService.login({
            email:req.body.email,
            password:req.body.password,
        });
        if(response){
            if (!req.session) {
                console.log("Session is not initialized"); // Log if session is not initialized
                return res.status(500).json({ message: "Session is not initialized" });
            }
            req.session.user = response;
            res.redirect('/v1/dashboard');
        }else{
            res.render('login', {message:"Email or Password is incorrect"})
        }
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            err:error.explanation ,
            message:error.message,
        })
    }
}
const logoutGet = async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/v1/login');
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            err:error.explanation ,
            message:error.message,
        })
    }
}
const dashboardGet = async(req,res)=>{
    try {
        console.log("From dashboard");
        res.render('dashboard', {user: req.session.user});
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
    loginGet,
    loginPost,
    logoutGet,
    dashboardGet,
}