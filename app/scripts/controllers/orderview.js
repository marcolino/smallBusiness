'use strict';
 
app.controller('OrderViewCtrl', function ($scope, $routeParams, Order) {
  $scope.Order = Order.find($routeParams.orderId);
});