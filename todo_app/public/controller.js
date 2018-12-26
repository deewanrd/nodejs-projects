let todoApp = angular.module('todoApp', []);

todoApp.controller('todoCtrl', function ($scope, $http) {

  $scope.todo = {
    'text': '',
  }

  $scope.addTask = function () {
    console.log("Name: ", $scope.todo.name);
    $http.post('http://localhost:8080/createTask', $scope.todo).
      then(function (response) {
        console.log("Response: ", response);
      }, function (error) {
        console.error("Error: ", error);
      })
  }
})