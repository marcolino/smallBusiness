'use strict';
 
app.controller('OrdersCtrl', function ($scope, Order) {
  //$scope.orders = [];
  //$scope.orders = Order.get();
  $scope.orders = Order.all;
  //console.info('orders:', $scope.orders);

  $scope.order = { url: 'http://', title: '' };

  $scope.submitOrder = function () {
/*
    Order.save($scope.order, function (ref) {
      $scope.orders[ref.name] = $scope.order;
      $scope.order = {url: 'http://', title: ''};
    });
*/
    Order.create($scope.order).then(function () {
      $scope.order = { url: 'http://', 'title': '' };
    });
  };

  $scope.deleteOrder = function (orderId) {
/*
    Order.delete({id: orderId}, function () {
      delete $scope.orders[orderId];
    });
*/
    Order.delete(orderId);
  };

});