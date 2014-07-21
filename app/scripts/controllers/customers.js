'use strict';
 
app.controller('CustomersCtrl', function ($scope, $location, Customer) {
console.info('customers controller...');
console.info('$scope.customer:', $scope.customer);

  //if ($location.path() === '/customers') {
    $scope.customers = Customer.all;
  //}
console.log('$scope.customers:', $scope.customers);

  $scope.customerPlaceholder = { name: 'name', address: 'address' };
  $scope.customer = $scope.customerPlaceholder;

  $scope.submitCustomer = function () {
console.log('submitCustomer in CustomersCtrl:', $scope.customer);
    Customer.create($scope.customer).then(function (customerId) { /*ref*/
      $scope.customer = $scope.customerPlaceholder;
console.log('customerId: ', customerId);
      //$location.path('/customers/' + /*ref.name()*/customerId);
    });
  };

  $scope.deleteCustomer = function (customerId) {
    Customer.delete(customerId);
  };

});