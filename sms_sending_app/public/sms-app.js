let smsApp = angular.module('smsApp', [
  'ui.router',
  'ngTable'
]);

smsApp.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('contacts', {
      'url': '/contacts',
      'templateUrl': 'contacts.html',
      'controller': 'ContactsCtrl'
    })
    .state('contact-info', {
      'url': '/contacts/:id',
      'templateUrl': 'contact-info.html',
      'controller': 'ContactInfoCtrl'
    })
    .state('sendMessage', {
      'url': '/send-message/:id',
      'templateUrl': 'send-message.html',
      'controller': 'SendMessageCtrl'
    })
    .state('messages', {
      'url': '/messages',
      'templateUrl': 'messages.html',
      'controller': 'MessagesCtrl'
    })
  $urlRouterProvider.otherwise('/contacts');
});