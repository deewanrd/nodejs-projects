exports.createTask = function (req, res, text, TodoModel) {
  let task = new TodoModel({
    'name': text
  });
  task.save(function (err) {
    if (err) {
      console.error("Error while saving task: ", err);
      res.status(400).send('Error saving task')
    } else {
      console.log("Task successfully saved");
      res.status(200).send('Task saved successfully');
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