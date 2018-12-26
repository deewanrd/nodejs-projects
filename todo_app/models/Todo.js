const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  'name': String
})

let ToDo = mongoose.model('Todo', todoSchema);

exports.ToDo = ToDo;