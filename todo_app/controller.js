exports.createTask = function (req, res, text, TodoModel) {
  let task = new TodoModel({
    'name': text
  });
  task.save(function (err) {
    if (err) {
      console.error("Error while saving task: ", err);
      res.status(400).send('Error saving task')
    } else {
      TodoModel.find({ 'name': text }, function (err, task) {
        if (err) {
          console.error('Saved task not fetched from db');
          res.status(400).send('Task saved but not fetched from db');
        } else {
          res.status(200).json(task);
        }
      })
    }
  })
}

exports.fetchTasks = function (req, res, TodoModel) {
  TodoModel.find(function (err, tasks) {
    if (err) {
      console.error("Error fetching tasks: ", err);
      res.status(400).send('Error fetching tasks');
    } else {
      if (tasks.length === 0) {
        console.log('No tasks added in db');
        res.status(200).send('No tasks added in db');
      } else {
        console.log('Fetched tasks');
        res.status(200).json(tasks);
      }
    }
  })
}

exports.deleteTask = function (req, res, taskId, TodoModel) {
  TodoModel.remove({
    '_id': taskId
  }, function (err, todo) {
    if (err) {
      console.error('Error deleting task: ', err);
      res.status(400).send('Error deleting task');
    } else {
      console.log('Task deleted successfully');
      res.status(200).send('Task deleted successfully');
    }
  })
}