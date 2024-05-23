const express = require('express');
const http = require('http');


const app = express();

const server = http.createServer(app);

const {PORT} = require('./config/serverConfig.js');
const connect = require('./config/database');




server.listen(PORT, async()=>{
    console.log(`Server running at PORT ${PORT}`);
    await connect();
    console.log("Mongodb connected");
})
