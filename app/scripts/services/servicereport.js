'use strict';
     
app.factory('Servicereport', function ($firebase, FIREBASE_URL, User) {
  // N.B.: User injection is necessary to mantain current user across hard page loads...
  var ref = new Firebase(FIREBASE_URL + 'servicereports');
  var servicereports = $firebase(ref);

  var Servicereport = {
    all: servicereports,
    create: function (servicereport) {
      if (User.signedIn()) {
        var user = User.getCurrent();

        servicereport.owner = user.username;
        
        return servicereports.$add(servicereport).then(function (ref) {
          var servicereportId = ref.name(); 
          user.$child('servicereports').$child(servicereportId).$set(servicereportId);
          return servicereportId;
        });
      }
    },
    find: function (servicereportId) {
      return servicereports.$child(servicereportId);
    },
    set: function (servicereportId, servicereport) {
      if (User.signedIn()) {
        ref.child(servicereportId).set(servicereport);
      }
    },
    setAttribute: function (servicereportId, attributeValue) {
      if (User.signedIn()) {
        ref.child(servicereportId).attribute.set(attributeValue);
      }
    },
    delete: function (servicereportId) {
      //return servicereports.$remove(servicereportId);
      if (User.signedIn()) {
        var servicereport = Servicereport.find(servicereportId);
 
        servicereport.$on('loaded', function () {
          var user = User.findByUsername(servicereport.owner);
 
          servicereports.$remove(servicereportId).then(function () {
            user.$child('servicereports').$remove(servicereportId);
          });
        });
      }
    },

/*
    deleteItem: function (servicereport, item, itemId) {
      if (User.signedIn()) {
        var user = User.findByUsername(item.username);
 
        servicereport.$child('items').$remove(itemId).then(function () {
          user.$child('items').$remove(itemId);
        });
      }
    }
*/    
  };
 
  return Servicereport;
});