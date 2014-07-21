'use strict';
 
app.factory('Customer', function ($rootScope, $firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL + 'customers');
  var customers = $firebase(ref);

  var Customer = {
    all: customers,
    create: function (customer) {
console.info('creating customer in service...');
      return customers.$add(customer).then(function (ref) {
        var customerId = ref.name(); 
        return customerId;
      });
    },
    find: function (customerId) {
      return customers.$child(customerId);
    },
    findByCustomername: function (customername) {
      if (customername) {
        return customers.$child(customername);
      }
    },
    delete: function (customerId) {
console.log('deleting:', customerId);
      var customer = Customer.find(customerId);
      customer.$on('loaded', function () {
        customers.$child(customerId).$set({ deleted: true });
      });
    }
  };

  /*
  function setCurrentCustomer (customername) {
    $rootScope.currentCustomer = Customer.findByCustomername(customername);
  }
  */

  return Customer;
});