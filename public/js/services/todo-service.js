var app = angular.module('todoModule');

// Need to inject something to make AJAX calls
app.factory('todoService', function($http) {

  var todos = [];

  return {
    // Establish our key/value pairs for our functions
    retrieveData: retrieveData,
    updateList: updateList,
    deleteData: deleteData,
    addData: addData,
    editData: editData
  }

  // Write out our functions, one for each CRUD command(GET, POST, PUT, DELETE)
  function retrieveData() {
    var promise = $http({
      method: 'GET',
      url: '/get-things'
    }).then(function successfulCallback(response) {
      console.log(response);
      todos = response.data;
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

  function updateList() {
    return todos;
  }

  //function to delete an item from the server
  function deleteData(taskId) {
    var promise = $http({
      method: 'DELETE',
      url: '/delete-things/' + taskId
    }).then(function successfulCallback(response) {
      console.log(response);
      todos = response.data;
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

  //function to add an item to the server.
  function addData(addItem) {
    var promise = $http({
      method: 'POST',
      url: '/add-thing',
      data: {
        todo: addItem
    }
    }).then(function successfulCallback(response) {
      console.log(response);
      todos = response.data;
    });
    return promise;
  }

  //function to edit a data entry on the server
  function editData(changeObject) {
    var todo = {
      todo: changeObject.todo
    };
    var promise = $http({
      method: 'PUT',
      url: '/update-thing/' + changeObject.id,
      data: todo
    }).then(function successfulCallback(response) {
      todos = response.data;
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

});
