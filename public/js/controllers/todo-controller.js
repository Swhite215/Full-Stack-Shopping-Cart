var app = angular.module('todoModule');

app.controller('todoController', function($scope, todoService) {
  $scope.total = 0;

  // This function retrieves the information from the server
  todoService.getShopList().then(function() {
    $scope.shopList = todoService.defineShopList();
    console.log($scope.shopList);
    $scope.sumValue();
  });

  // This function removes an object from my database
  $scope.removeItem = function(itemId) {
    todoService.removeListItem(itemId).then(function() {
      $scope.shopList = todoService.defineShopList();
      $scope.sumValue();
    });
  }

  // This function adds an object to my database
  $scope.addItem = function(object) {
    todoService.addListItem(object).then(function() {
      $scope.shopList = todoService.defineShopList();
      $scope.sumValue();
    });
  }

  // This function updates an object on my database
  $scope.updateItem = function(updatedItem, updatedPrice, id) {
    var changeObject = {
      product: updatedItem,
      price: updatedPrice,
      id: id
    };
    todoService.updateItem(changeObject).then(function() {
      $scope.shopList = todoService.defineShopList();
      $scope.sumValue();
    });
  }

  // This function calculates my cart sum
  $scope.sumValue = function() {
    $scope.total = 0;
    for (var i = 0; i < $scope.shopList.length; i++) {
      $scope.total += $scope.shopList[i].price;
    }
  }



});
