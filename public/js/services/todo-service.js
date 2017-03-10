var app = angular.module('todoModule');

// Need to inject something to make AJAX calls
app.factory('todoService', function($http) {

  var list = [];

  return {
    // Establish our key/value pairs for our functions
    getShopList: getShopList,
    defineShopList: defineShopList,
    removeListItem: removeListItem,
    addListItem: addListItem,
    updateItem: updateItem
  }

  // Write out our functions, one for each CRUD command(GET, POST, PUT, DELETE)
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

  function defineShopList() {
    return list;
  }

});
