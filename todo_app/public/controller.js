let todoApp = angular.module('todoApp', []);

todoApp.controller('todoCtrl', function ($scope, $http) {

  $scope.todo = {
    'text': '',
  }

  $scope.addTask = function () {
    $http.post('http://localhost:8080/createTask', $scope.todo).
      then(function (response) {
        alert(response.data);
        $scope.todo.text = '';
      }, function (error) {
        alert(error.data);
        $scope.todo.text = '';
      })
  }
})