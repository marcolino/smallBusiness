'use strict';
 
app.controller('NavCtrl', function ($scope, $location, Auth, Order) {
  $scope.orderPlaceholder = { url: 'http://', title: '' };
  $scope.order = $scope.orderPlaceholder;
 
  $scope.submitOrder = function () {
    Order.create($scope.order).then(function (ref) {
      $scope.order = $scope.orderPlaceholder;
      $location.path('/orders/' + ref.name());
    });
  };

  $scope.logout = function () {
    console.info('logout...');
    Auth.logout();
  };

});