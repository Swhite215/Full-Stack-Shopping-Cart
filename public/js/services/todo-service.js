var app = angular.module('todoModule');

app.factory('todoService', function($http) {

  //List that stores returned database information
  var list = [];

  return {
    // Key-Value Pairs for Functions
    getShopList: getShopList,
    defineShopList: defineShopList,
    removeListItem: removeListItem,
    addListItem: addListItem,
    updateItem: updateItem
  }

  //service function that sends GET request to server
  function getShopList() {
    var promise = $http({
      method: 'GET',
      url: '/api/items'
    }).then(function successfulCallback(response) {
      console.log(response.data);
      list = response.data;
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

  //service function that sends DELETE request to server
  function removeListItem(itemId) {
    var promise = $http({
      method: 'DELETE',
      url: '/api-remove-item/' + itemId
    }).then(function successfulCallback(response) {
      list = response.data;
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

  //service function that sends POST request to server
  function addListItem(object) {
    var promise = $http({
      method: 'POST',
      url: '/api-add-item',
      data: {
        product: object.product,
        price: object.price
      }
    }).then(function successfulCallback(response) {
      list = response.data;
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

  //service function that sends PUT request to server
  function updateItem(changeObject) {
    var newItem = {
      product: changeObject.product,
      price: changeObject.price
    };
    var promise = $http({
      method: 'PUT',
      url: '/api-change-item/' + changeObject.id,
      data: newItem
    }).then(function successfulCallback(response) {
      list = response.data;
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

  //service function that returns my list
  function defineShopList() {
    return list;
  }

});
