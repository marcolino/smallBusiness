'use strict';
 
app.controller('NavCtrl', function ($scope, $location, Auth) {
/*
  $scope.orderPlaceholder = { url: 'http://', title: '' };
  $scope.order = $scope.orderPlaceholder;
  console.log('NAV CTRL');

  $scope.submitOrder = function () {
    console.log('submitOrder in NavCtrl');
    Order.create($scope.order).then(function (orderId) {
      $scope.order = $scope.orderPlaceholder;
      $location.path('/orders/' + orderId);
    });
  };
*/

  $scope.logout = function () {
    console.info('logout...');
    Auth.logout();
  };
});