var app = angular.module('todoModule');

app.controller('todoController', function($scope, todoService) {


  // This function retrieves the information from the server
  todoService.getShopList().then(function() {
    $scope.shopList = todoService.defineShopList();
    console.log($scope.shopList);
  });

  $scope.removeItem = function(itemId) {
    todoService.removeListItem(itemId).then(function() {
      $scope.shopList = todoService.defineShopList();
    });
  }

  $scope.addItem = function(object) {
    todoService.addListItem(object).then(function() {
      $scope.shopList = todoService.defineShopList();
    });
  }



});
