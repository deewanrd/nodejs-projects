let todoApp = angular.module('webScrappingApp', ['ngTable']);

todoApp.controller('webScrapCtrl', function ($scope, $http, NgTableParams) {

  $scope.reviewPageUrls = [
    'http://www.tigerdirect.com/applications/SearchTools/item-details.asp?EdpNo=3415697',
    'http://www.tigerdirect.com/applications/SearchTools/item-details.asp?EdpNo=3415706'
  ];

  $scope.displayReviews = function (reviews) {
    $scope.reviews = reviews;
    $scope.tableData = new NgTableParams({}, { dataset: $scope.reviews });
  };

  $scope.fetchReviews = function (reviewPageUrl) {
    $scope.loading = true;
    let url = document.location.protocol + "//" + document.location.host + '/fetchReviews';
    $http.get(url, {
      'params': { 'reviewPageUrl': reviewPageUrl },
    })
      .then((response) => {
        $scope.loading = false;
        $scope.displayReviews(response.data);
      }).catch((error) => {
        $scope.loading = false;
        alert(error.data.name);
      })
  };
});