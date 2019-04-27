angular.module('smsApp')
  .controller('SendMessageCtrl', function ($scope, $rootScope, $stateParams, $http) {

    $scope.message = "";
    $scope.send = function () {
      console.log("Message: ", $scope.message);
    };

    function init() {
      $scope.contact = $stateParams.contact;
    }

    init();
  })