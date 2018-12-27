exports.createTask = function (req, res, text, TodoModel) {
  let task = new TodoModel({
    'name': text
  });
  task.save(function (err) {
    if (err) {
      console.error("Error while saving task: ", err);
      res.status(500).send('Error saving task')
    } else {
      console.log("Task successfully saved");
      res.status(200).send('Task saved successfully');
    }
  })
}