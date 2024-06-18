const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT } = require('../config/serverConfig');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    is_online:{
        type:String,
        default:'0'
    }
}, {timestamps:true})

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hashSync(this.password, SALT);
    next();
})

userSchema.methods.comparePassword = async function(incomingPassword){
    return await bcrypt.compareSync(incomingPassword, this.password);
}
const user = mongoose.model("User", userSchema);
module.exports = user;