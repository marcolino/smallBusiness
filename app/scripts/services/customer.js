'use strict';

/* jshint unused: false */
app.factory('Customer', function ($firebase, FIREBASE_URL, User) {
  // N.B.: User injection is necessary to mantain current user across hard page loads...
  var ref = new Firebase(FIREBASE_URL + 'customers');
  var customers = $firebase(ref);

  var Customer = {
    all: customers,
    create: function (customer) {
      //console.info('creating customer in service...');
      return customers.$add(customer).then(function (ref) {
        var customerId = ref.name(); 
        return customerId;
      });
    },
    set: function(id, customer) {
      ref.child(id).set(customer);
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
      //console.log('deleting:', customerId);
      var customer = Customer.find(customerId);
      customer.$on('loaded', function () {
        customers.$child(customerId).$set({ deleted: true });
      });
    }
  };

  return Customer;
});