const Chat = require("../models/chat");

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
            image:'images/'+req.file.filename,
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
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Failed to log out" });
            }
            return res.redirect('/v1/login');
        });
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
        const response = await userService.findUsers({
            _id : {
                $nin:[req.session.user._id]
            }
        });
        res.render('dashboard', {user: req.session.user, users:response});
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            err:error.explanation ,
            message:error.message,
        })
    }
}

const saveChat = async(req,res)=>{
    try{
        const chat = await Chat.create({
            sender_id : req.body.senderid,
            receiver_id : req.body.receiverid,
            message : req.body.message,
        })
        return res.status(200).send({
            success:true,
            msg:"Chat inserted",
            data: chat
        })
    }catch(error){
        res.status(400).send({
            success:false,
            msg:error.message,
        })
    }
}

const deleteChat = async(req,res)=>{
    try{
        const response  = await Chat.findByIdAndDelete({
            _id : req.body.id
        });
        res.status(200).send({success:response});
    }catch(error){
        return res.status(400).send({
            success:false,
            msg:error.message,
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
    saveChat,
    deleteChat
}