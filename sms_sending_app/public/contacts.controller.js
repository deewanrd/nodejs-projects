angular.module('smsApp')
  .controller('ContactsCtrl', function ($scope, $rootScope, $http, NgTableParams) {

    $rootScope.contacts = [];
    $scope.fetchContacts = function () {
      $http.get('http://localhost:8000/fetchContacts')
        .then(function (response) {
          let contacts = response.data;
          contacts.forEach((contact) => {
            $rootScope.contacts.push({
              'id': contact.id,
              'firstName': contact.firstName,
              'lastName': contact.lastName,
              'phone': contact.phone
            })
          })
          $scope.tableData = new NgTableParams({}, { dataset: $rootScope.contacts });
        }).catch((error) => {
          alert(error.data);
        })
    };

    function init() {
      $scope.fetchContacts();
    }
    init();

  });