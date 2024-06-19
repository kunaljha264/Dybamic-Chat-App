const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const socketio = require("socket.io");

const app = express();

const server = http.createServer(app);

const { PORT, SESSION_SECRET } = require("./config/serverConfig.js");
const connect = require("./config/database");
const User = require("./models/user.js");
const Chat = require("./models/chat.js");

const apiRoutes = require("./routes/index");

const session = require("express-session");
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", apiRoutes);

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const io = socketio(server);

var usp = io.of("/user-namespace");

usp.on("connection", async function (socket) {
  console.log("user connected");

  const userId = socket.handshake.auth.token;
  await User.findByIdAndUpdate( { _id: userId },{ $set: {is_online: "1",} } );

  // User broadcast online status

  socket.broadcast.emit('getOnlineUser', {user_id : userId});

  socket.on("disconnect", async () => {
    await User.findByIdAndUpdate({  _id: userId,},{  $set: {is_online: "0",},});

    //user broadcast offline status
    socket.broadcast.emit('getOfflineUser', {user_id : userId});
    console.log("user disconnected");
  });

  //chatting implementation

  socket.on('newChat', function(data){
    socket.broadcast.emit('loadNewChat', data);
  })

  socket.on('oldChats', async(data)=>{

    
      const chats = await Chat.find({
        $or: [
          {
            sender_id: data.senderId,
            receiver_id:data.receiverId
          },
          {
            sender_id: data.receiverId,
            receiver_id:data.senderId
          }
        ]
      })

     

      socket.emit('loadOldChat', {
          chats: chats,
      })

      socket.on('chatDeleted', function(id){
          socket.broadcast.emit('chatMessageDeleted', id);
      })
  })

 
});

server.listen(PORT, async () => {
  console.log(`Server running at PORT ${PORT}`);
  await connect();
  console.log("Mongodb connected");
});
