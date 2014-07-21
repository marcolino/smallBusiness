'use strict';
 
app.controller('OrdersCtrl', function ($scope, $location, Order) {
  if ($location.path() === '/') { // avoid overriding $scope.orders when listing specific user's orders
    $scope.orders = Order.all;
  }

  $scope.orderPlaceholder = { url: 'http://', title: '' };
  $scope.order = $scope.orderPlaceholder;

  $scope.submitOrder = function () {
    //console.log('submitOrder in OrdersCtrl');
    Order.create($scope.order).then(function (postId) { /*ref*/
      $scope.order = $scope.orderPlaceholder;
      $location.path('/orders/' + /*ref.name()*/postId);
    });
  };

  $scope.deleteOrder = function (orderId) {
    Order.delete(orderId);
  };

});