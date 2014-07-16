'use strict';
     
app.factory('Order', function ($firebase, FIREBASE_URL) {
  //return $resource(FIREBASE_URL + 'orders/:id.json');
  var ref = new Firebase(FIREBASE_URL + 'orders');
  console.info('ref:', ref);
  var orders = $firebase(ref);
  console.info('orders:', orders);

  var Order = {
    all: orders,
      create: function (order) {
      return orders.$add(order);
    },
    find: function (orderId) {
      return orders.$child(orderId);
    },
    delete: function (orderId) {
      return orders.$remove(orderId);
    }
  };
 
  return Order;
});