angular.module('smsApp')
  .controller('SendMessageCtrl', function ($scope, $stateParams, $http) {

    $scope.message = "Hi. Your OTP is: ";

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

    $scope.send = function () {
      let phone = $scope.contact.phone;
      let recipientName = $scope.contact.firstName + " " + $scope.contact.lastName;
      let params = {
        'phone': phone,
        'message': $scope.message,
        'recipientName': recipientName
      };
      $scope.loading = true;
      $http.post('http://localhost:8000/sendMessage', params)
        .then((result) => {
          alert('Message sent');
          $scope.loading = false;
          window.location.href = "#";
        }).catch((error) => {
          alert(error.data);
          $scope.loading = false;
          window.location.href = "#";
        })
    };

    function init() {
      $scope.contactId = $stateParams.id;
      $scope.fetchContactInfo();
    }

    init();
  });