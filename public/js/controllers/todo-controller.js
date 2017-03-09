var app = angular.module('todoModule');

app.controller('todoController', function($scope, todoService) {

  //retrieves information from server and stores in $scope accessible object.
  todoService.retrieveData().then(function() {
    $scope.thingsToDo = todoService.updateList();
    console.log($scope.thingsToDo);
  });

  //receives taskId to be deleted.
  $scope.removeTask = function(taskId) {
    todoService.deleteData(taskId).then(function() {
      $scope.thingsToDo = todoService.updateList();
    })
  };

  $scope.addTask = function(addItem) {
    todoService.addData(addItem).then(function () {
      $scope.thingsToDo = todoService.updateList();
    });
  };

  $scope.changeTask = function(changeItem, id) {
    var changeObject = {
      id: id,
      todo: changeItem
    };
    todoService.editData(changeObject).then(function() {
      $scope.thingsToDo = todoService.updateList();
    });
  };
  // Add a function for each CRUD command. One for GET, POST, PUT, DELETE

});
