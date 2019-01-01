let todoApp = angular.module('todoApp', []);

todoApp.controller('todoCtrl', function ($scope, $http) {

  $scope.todo = {
    'text': '',
  }

  $scope.todos = [];

  $scope.addTask = function () {
    let found = false;
    for (let index = 0; index < $scope.todos.length; index++) {
      if ($scope.todos[index].text === $scope.todo.text) {
        alert('Task already added');
        found = true;
        break;
      }
    }
    if (!found) {
      $http.post('http://localhost:8080/createTask', $scope.todo).
        then(function (response) {
          alert('Task successfully added');
          let task = response.data[0];
          $scope.todos.push({ 'id': task._id, 'text': task.name });
          $scope.todo.text = '';
        }, function (error) {
          alert(error.data);
          $scope.todo.text = '';
        })
    }
  }

  $scope.deleteTask = function (taskId) {
    $http.delete('http://localhost:8080/deleteTask/' + taskId)
      .then(function (response) {
        alert(response.data);
        for (index = 0; index < $scope.todos.length; index++) {
          if ($scope.todos[index].id === taskId) {
            $scope.todos.splice(index, 1);
            break;
          }
        }
      }, function (error) {
        alert(error.data);
      })
  }

  $scope.fetchTodos = function () {
    $http.get('http://localhost:8080/fetchTasks')
      .then(function (response) {
        let tasks = response.data;
        if (tasks.length > 0) {
          tasks.forEach(function (task) {
            $scope.todos.push({ 'id': task._id, 'text': task.name });
          })
        } else {
          alert('No tasks in db');
        }
      }, function (error) {
        alert(error.data);
      })
  }

  function init() {
    $scope.fetchTodos();
  }
  init();
})