let chatApp = angular.module('chatApp', []);

chatApp.controller('chatCtrl', function ($scope, $http) {
  let socket = io();
  $scope.sendMessage = function () {
    socket.emit('message', { message: $scope.message });
  }

  socket.on('message', (data) => {
    console.log("DATA: ", data)
  })
})