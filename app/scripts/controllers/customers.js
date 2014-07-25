'use strict';
 
app.controller('CustomersCtrl', function ($scope, $location, Customer/*, UserNotify*//*, User*/) {
  console.info('customers controller...');

  //if ($location.path() === '/customers') {
    $scope.customers = Customer.all;
  //}
console.log('$scope.customers:', $scope.customers);

  $scope.customerSelected = '';
console.log('$scope.typeof(customerSelected):', typeof($scope.customerSelected));
  $scope.customerIdCurrent = null;

  $scope.customerPlaceholder = { name: '', piva: '', address: '', email: '', dateCreation: '', };
  $scope.customer =  angular.copy($scope.customerPlaceholder);
  $scope.customerAddMode = $scope.customerEditMode = false;

  $scope.submitCustomer = function () {
    var now = new Date();
    $scope.customer.dateCreation = now;
    if ($scope.customerEditMode) {
      //var customerId = $scope.customerIdCurrent;
      var customer = {};
      for (var fld in $scope.customerPlaceholder) {
        customer[fld] = $scope.customer[fld];
      }
      Customer.set($scope.customerIdCurrent, customer).then(function () {
        $scope.customer = angular.copy($scope.customerPlaceholder);
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
  };

  $scope.deleteCustomer = function (customerId) {
    Customer.delete(customerId);
  };

  $scope.editCustomer = function (customerId) {
console.log('customerId: ', customerId);
    if (!$scope.customerEditMode) {
      $scope.customerIdCurrent = customerId;
console.log('customerIdCurrent: ', $scope.customerIdCurrent);
      $scope.customer = Customer.find(customerId);
      $scope.customerEditMode = true;
    } else {
      $scope.customerEditMode = false;
    }
  };

  $scope.typeof = function (val) {
    return typeof val;
  };

  $scope.match = function (str, pattern) {
    var regex = new RegExp(pattern, 'g');
    return str.match(regex);
  };

});