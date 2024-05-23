const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

module.exports={
    PORT: process.env.PORT,
    SALT: bcrypt.genSaltSync(10),
    SESSION_SECRET:process.env.SESSION_SECRET
}