angular.module('smsApp')
  .controller('ContactInfoCtrl', function ($scope, $stateParams, $rootScope) {

    function init() {
      $scope.contactId = $stateParams.id;
      for (let index = 0; index < $rootScope.contacts.length; index++) {
        let contact = $rootScope.contacts[index];
        if (contact.id == $scope.contactId) {
          $scope.contact = contact;
          break;
        }
      }
    }
    init();
  });