'use strict';

/* jshint unused: false */
app.factory('Customer', function ($firebase, FIREBASE_URL, User) {
  // N.B.: User injection is necessary to mantain current user across hard page loads...
  var ref = new Firebase(FIREBASE_URL + 'customers');
  var customers = $firebase(ref);
  var refByName = new Firebase(FIREBASE_URL + 'customersByName');
  var customersByName = $firebase(refByName);

  var Customer = {
    all: customers,
    create: function (customer) {
      return customers.$add(customer).then(function (ref) {
        var customerId = ref.name();
        customersByName.$child(customer.name).$set(customerId);
        return customerId;
      });
    },
    set: function(customerId, customer) {
      var oldname = customers.$child(customerId).name;
      if (customer.name !== oldname) {
        customersByName.$remove(oldname);
      }
      customersByName.$child(customer.name).$set(customerId);
      return customers.$child(customerId).$set(customer);
    },
    find: function (customerId) {
      return customers.$child(customerId);
    },
    findByName: function (customerName) { // TESTING...
      return customersByName.$child(customerName);
    },
    delete: function (customerId) {
      var customer = Customer.find(customerId);
      customer.deleted = true;
      customer.$on('loaded', function () {
        customersByName.$remove(customer.name);
        customers.$child(customerId).$set(customer);
      });
    }
  };

  return Customer;
});