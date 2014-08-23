'use strict';
 
app.controller('NavCtrl', function ($scope, $rootScope, $location, Auth) {
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
  $rootScope.formLabel = '';

  $scope.logout = function () {
    //console.info('logout...');
    $rootScope.formLabel = '';
    Auth.logout();
  };
});