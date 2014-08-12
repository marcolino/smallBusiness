'use strict';
     
/* NOjshint NOunused: false */
app.factory('Servicereport', function ($firebase, FIREBASE_URL, User) {
  // N.B.: User injection is necessary to mantain current user across hard page loads...
  var refServiceReports = new Firebase(FIREBASE_URL + 'servicereports');
  var servicereports = $firebase(refServiceReports);

  //var refStash = new Firebase(FIREBASE_URL + 'stash');
  //var stash = $firebase(refStash);

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
    set: function(servicereportId, servicereport) {
      return servicereports.$child(servicereportId).$set(servicereport);
    },
    find: function (servicereportId) {
      return servicereports.$child(servicereportId);
    },
    findByCustomername: function (customername) {
      if (customername) {
        return servicereports.$child('customername').$child(customername); // ???
      }
    },
    getNumberNext: function () {
      var n = servicereports.$child('stash').serviceReportNumber;
      n = n ? n : 1;
      console.info('getNumberNext() - serviceReportNumber is now', n);
      return n;
    },
    setNumberNext: function (n) {
      n = n ? n + 1 : 1;
      console.info('setNumberNext() - serviceReportNumber will be', n);
      servicereports.$child('stash').$set({ 'serviceReportNumber': n });
      return n;
    },
/*
    setAttribute: function (servicereportId, attributeValue) {
      if (User.signedIn()) {
        ref.child(servicereportId).attribute.set(attributeValue);
      }
    },
*/
    delete: function (servicereportId) {
      if (User.signedIn()) {
        console.info('DELETE SR SERVICE:', servicereportId);
        var servicereport = Servicereport.find(servicereportId);

        servicereport.$on('loaded', function () {
          var user = User.findByUsername(servicereport.owner);
 
          console.info('delete SR service servicereportId');
          servicereports.$remove(servicereportId).then(function () {
            if (user) { // REMOVE THIS...
              user.$child('servicereports').$remove(servicereportId);
            }
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
/*
    getNextNumber: function () {
      return stash.$on('loaded', function () {
        var number = stash['serviceReportNumber'];
        console.log('number was ', number, 'returning ', number + 1);
        return number + 1;
      });
    }
*/
  };
 
  return Servicereport;
});