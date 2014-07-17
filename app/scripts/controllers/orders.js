'use strict';
 
app.controller('OrdersCtrl', function ($scope, $location, Order) {
  $scope.orders = Order.all;

  $scope.orderPlaceholder = { url: 'http://', title: '' };
  $scope.order = $scope.orderPlaceholder;

  $scope.submitOrder = function () {
    Order.create($scope.order).then(function (ref) {
      $scope.order = $scope.orderPlaceholder;
      $location.path('/orders/' + ref.name());
    });
  };

  $scope.deleteOrder = function (orderId) {
    Order.delete(orderId);
  };

});