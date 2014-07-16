'use strict';
 
app.controller('OrdersCtrl', function ($scope) {
  $scope.orders = [];
  $scope.order = {
    url: 'http://', title: ''
  };

  $scope.submitOrder = function () {
    $scope.orders.push($scope.order);
    $scope.order = {
      url: 'http://', title: ''
    };
  };

  $scope.deleteOrder = function (index) {
    $scope.orders.splice(index, 1);
  };

});