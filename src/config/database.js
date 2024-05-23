// const mongoose = require('mongoose');

// const connect = async () =>{
//     await mongoose.connect('mongodb://localhost/twitter_Dev');
// }

// module.exports = connect;


const mongoose = require('mongoose');

const connect = async()=>{
    mongoose.connect('mongodb://localhost/DynamicChatApp');
}

module.exports=connect;
