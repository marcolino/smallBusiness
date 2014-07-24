'use strict';
 
app.controller('CustomersCtrl', function ($scope, $location, Customer, User) {
  console.info('customers controller...');

  $scope.customerSelected = undefined;

  //if ($location.path() === '/customers') {
    $scope.customers = Customer.all;
  //}
console.log('$scope.customers:', $scope.customers);

  $scope.customerPlaceholder = { name: '', address: '', dateCreation: '', email: '', };
  $scope.customer =  angular.copy($scope.customerPlaceholder);
  $scope.customerAddMode = $scope.customerEditMode = false;

  $scope.submitCustomer = function () {
console.log('submitCustomer in CustomersCtrl:', $scope.customer);
console.log('customerId in CustomersCtrl:', customerId);
    var now = new Date();
    $scope.customer.dateCreation = now;
    if ($scope.customerEditMode) {
      var customerId = $scope.customerIdCurrent;
      playerFactory.set(id, player).then(function (customerId) {
        $scope.customer = angular.copy($scope.customerPlaceholder);
console.log('customerId: ', customerId);
      });
    }
    if ($scope.customerAddMode) {
      Customer.create($scope.customer).then(function (customerId) { /*ref*/
        $scope.customer = angular.copy($scope.customerPlaceholder);
console.log('customerId: ', customerId);
console.log('$scope.customer: ', $scope.customer);
        //$location.path('/customers/' + /*ref.name()*/customerId);
      });
    }
    $scope.customerAddMode = $scope.customerEditMode = false;
  };

  $scope.cancelCustomer = function () {
    $scope.customerAddMode = $scope.customerEditMode = false;
    $scope.customer = angular.copy($scope.customerPlaceholder);
  }

  $scope.deleteCustomer = function (customerId) {
    Customer.delete(customerId);
  };

  $scope.editCustomer = function (customerId) {
console.log('customerId: ', customerId);
    if (!$scope.customerEditMode) {
      $scope.customerIdCurrent = customerId;
      $scope.customer = Customer.find(customerId);
      $scope.customerEditMode = true;
    } else {
      $scope.customerEditMode = false;
    }
  }

});