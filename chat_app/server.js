const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chatModel = require('./models/ChatModel');
const app = express();

mongoose.connect('mongodb://localhost:27017/chat_app', { 'useNewUrlParser': true }, (err) => {
  if (err) {
    console.error(`Error connecting to mongodb: ${err}`);
    return;
  }
  console.log(`Connected to mongodb database`);
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': false }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

const port = 8000;

let server = app.listen(port, () => {
  console.log("Connected to server");
});

let io = require('socket.io').listen(server);

io.on('connection', (socket) => {
  console.log(`New user connected`);
  socket.userName = 'anonymous';
  socket.on('change_username',(newName)=>{
    socket.userName = newName;
    
  })
  socket.on('disconnect', function () {
    console.log('User disconnected');
  });
  socket.on('message',function(msg){
    console.log(msg);
  });
})