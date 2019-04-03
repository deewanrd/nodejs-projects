let booksApp = angular.module('booksApp', []);

booksApp.controller('bookCtrl', function ($scope, $http) {

  $scope.subjects = [];
  $scope.books = [];
  $scope.book = {};

  $scope.updateBook = function () {
    let payload = $scope.book;
    Object.keys($scope.bookPropertiesArray).forEach(function (key) {
      payload[key] = $scope.bookPropertiesArray[key];
    });
    Object.keys($scope.bookPropertiesObject).forEach(function (key) {
      payload[key] = $scope.bookPropertiesObject[key];
    });
    $http.put('http://localhost:8000/api/books/' + $scope.selectedBookId, payload).
      then(function (response) {
        alert('Book successfully updated');
      }, function (error) {
        alert(error.data);
        $scope.todo.text = '';
      })
  }

  $scope.displayBookDetails = function (selectedBookId) {
    $scope.selectedBookId = selectedBookId;
    $http.get('http://localhost:8000/api/books?id=' + selectedBookId)
      .then(function (response) {
        $scope.book = response.data[0];
        $scope.bookPropertiesArray = {};
        $scope.bookPropertiesObject = {};
        Object.keys($scope.book).forEach(function (key) {
          if ($scope.book[key] instanceof Array) {
            $scope.bookPropertiesArray[key] = $scope.book[key];
            delete $scope.book[key];
          } else if ($scope.book[key] instanceof Object) {
            $scope.bookPropertiesObject[key] = $scope.book[key];
            delete $scope.book[key];
          }
        })
      }, function (error) {
        alert(error.data);
      })
  };

  $scope.displaySubjectBooks = function (selectedSubject) {
    $http.get('http://localhost:8000/api/books?subjects=' + selectedSubject)
      .then(function (response) {
        let books = response.data;
        if (books.length > 0) {
          books.forEach(function (book) {
            $scope.books.push(book);
          })
        } else {
          alert('No books are avaliable for the given subject. Choose another.');
        }
      }, function (error) {
        alert(error.data);
      })
  };

  $scope.fetchSubjects = function () {
    $http.get('http://localhost:8000/api/subjects')
      .then(function (response) {
        let subjects = response.data;
        if (subjects.length > 0) {
          subjects.forEach(function (subject) {
            $scope.subjects.push(subject);
          })
        } else {
          alert('No subjects are available');
        }
      }, function (error) {
        alert(error.data);
      })
  };

  function init() {
    $scope.fetchSubjects();
  }
  init();
})