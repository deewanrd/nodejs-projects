let smsApp = angular.module('smsApp', ["ngTable"]);

smsApp.controller('smsCtrl', ['$scope', '$http', 'NgTableParams', function ($scope, $http, NgTableParams) {

  $scope.contacts = [];
  $scope.fetchContacts = function () {
    $http.get('http://localhost:8000/fetchContacts')
      .then(function (response) {
        let contacts = response.data;
        contacts.forEach((contact) => {
          $scope.contacts.push({
            'id': contact.id,
            'firstName': contact.firstName,
            'lastName': contact.lastName,
            'phone': contact.phone
          })
        })
        $scope.tableData = new NgTableParams({}, { dataset: $scope.contacts });
      }).catch((error) => {
        alert(error.data);
      })
  };

  $scope.send = function (contact) {
    console.log("Info: ", contact);
  }

  function init() {
    $scope.fetchContacts();
  }
  init();

}]);