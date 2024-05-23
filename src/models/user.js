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
    },
    image:{
        type:String,
        required:true,
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
})
const user = mongoose.model("User", userSchema);
module.exports = user;