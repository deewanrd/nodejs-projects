angular.module('smsApp')
  .controller('ContactInfoCtrl', function ($scope, $stateParams, $http) {

    $scope.fetchContactInfo = function () {
      $http.get('http://localhost:8000/fetchContactInfo', {
        'params': { 'id': $scope.contactId }
      })
        .then((response) => {
          $scope.contact = response.data;
        })
        .catch((error) => {
          alert(error.data);
        })
    };

    function init() {
      $scope.contactId = $stateParams.id;
      $scope.fetchContactInfo();
    }
    init();
  });