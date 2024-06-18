const isLogin = (req,res,next)=>{
    try {
        if(!req.session.user){
            
            res.redirect('/v1/login');
      
        }
        
        next();
    } catch (error) {
        console.log(error);
    }
}

const isLogout = (req,res,next)=>{
    try {
        if(req.session.user){
            res.redirect('/v1/dashboard');
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    isLogin,
    isLogout,
}