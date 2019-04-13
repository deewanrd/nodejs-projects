let productsApp = angular.module('productsApp', ["ngTable"]);

productsApp.controller('productCtrl', ['$scope', '$http', 'NgTableParams', function ($scope, $http, NgTableParams) {

  // This will hold all the product details after being fetched from the API.
  $scope.products = [];

  $scope.fetchProducts = function () {
    $http.get('http://localhost:8000/fetchProducts')
      .then(function (response) {
        let products = response.data.products;
        if (products && products !== null) {
          Object.keys(products).forEach(function (key) {
            let product = products[key];
            $scope.products.push({
              'subcategory': product.subcategory, 'title': product.title,
              'price': Number(product.price), 'popularity': Number(product.popularity)
            });
          })
          $scope.tableData = new NgTableParams({sorting: { popularity: "desc" }} , { dataset: $scope.products });
        } else {
          alert('No products in db');
        }
      }, function (error) {
        alert(error.data);
      })
  }

  function init() {
    $scope.fetchProducts();
  }
  init();
}]);