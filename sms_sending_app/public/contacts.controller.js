angular.module('smsApp')
  .controller('ContactsCtrl', function ($scope, $http, NgTableParams) {

    $scope.contacts = [];
    $scope.fetchContacts = function () {
      $http.get('http://localhost:8000/fetchContacts')
        .then(function (response) {
          let contacts = response.data;
          Object.keys(contacts).forEach(function (key) {
            $scope.contacts.push({
              'id': contacts[key].id,
              'firstName': contacts[key].firstName,
              'lastName': contacts[key].lastName,
              'phone': contacts[key].phone
            })
          })
          $scope.tableData = new NgTableParams({}, { dataset: $scope.contacts });
        }).catch((error) => {
          alert(error.data);
        })
    };

    function init() {
      $scope.fetchContacts();
    }
    init();

  });