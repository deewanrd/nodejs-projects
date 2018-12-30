const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const todoModel = require('./models/Todo');
const controller = require('./controller');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ 'extended': false }));

mongoose.connect('mongodb://localhost:27017/todo', { 'useNewUrlParser': true });

let db = mongoose.connection;

db.on('error', function (error) {
  console.error("Error connecting to mongodb: ", error);
})
  .once('open', function () {
    console.log("Connected to Mongodb")
  })

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
})

app.post('/createTask', function (req, res) {
  let text = req.body.text;
  controller.createTask(req, res, text, todoModel.ToDo);
})

app.get('/fetchTasks', function (req, res) {
  controller.fetchTasks(req, res, todoModel.ToDo);
})

app.delete('/deleteTask/:taskId', function (req, res) {
  let taskId = req.params.taskId;
  controller.deleteTask(req, res, taskId, todoModel.ToDo);
})

app.listen(8080, function () {
  console.log("Connected to server");
})

