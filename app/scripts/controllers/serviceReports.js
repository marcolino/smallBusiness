'use strict';
 
app.controller('ServicereportsCtrl', function ($scope, $rootScope, $location, Servicereport, Customer, Auth, DateTime) {

  $scope.servicereport = {};
  $scope.servicereports = Servicereport.all;

  // initialize report operator if user is authenticated
  $scope.$watch(Auth.currentUser, function(user) {
    if (user) {
      $scope.servicereport.operator = $scope.currentUser.username;
    }
  }, true);

  $scope.servicereports.$on('loaded', function() {
    $scope.servicereport.number = Servicereport.getNumberNext();
  });

  $scope.initServicereport = function () {
    //$scope.servicereport.number = null;
    $scope.servicereport.operator = $scope.currentUser ? $scope.currentUser.username : null;
    $scope.servicereport.dateIn = new Date();
    $scope.servicereport.dateOut = $scope.servicereport.dateIn;
    $scope.servicereport.duration = null;
    $scope.servicereport.customer = null;
    $scope.servicereport.location = null;
    $scope.servicereport.notes = null;
    $scope.servicereport.dateCreation = null;
  
    $scope.formAddEditSubmitted = false;
    $scope.currentId = null;
    $scope.addMode = false;
    $scope.editMode = false;  
    $scope.printMode = false;
    $scope.orderby = '-number';
    $scope.dateInit();
  };

  $scope.submitServicereport = function (valid) {
    $scope.formAddEditSubmitted = true; // allow validation errors to be shown
    if (!valid) {
      return;
    }

    $scope.servicereport.dateCreation = new Date(); // set report creation date
    $scope.setDateOut();

    if ($scope.editMode) {
      Servicereport.set($scope.currentId, $scope.servicereport).then(function () {
        $scope.initServicereport();
      });
    }
    if ($scope.addMode) {
      Servicereport.create($scope.servicereport).then(function (/*servicereportId*/) {
        $scope.servicereport.number = Servicereport.setNumberNext($scope.servicereport.number);
        $scope.initServicereport();
      });
    }
    $scope.addMode = $scope.editMode = false;
    $scope.formAddEditSubmitted = false; // forbid validation errors to be shown until next submission
  };

  $scope.cancelServicereport = function () {
    $scope.addMode = $scope.editMode = $scope.printMode = false;
    $scope.initServicereport();
  };

  $scope.deleteServicereport = function (servicereport) {
    var id = servicereport.$id;
    Servicereport.delete(id);
  };

  $scope.editServicereport = function (servicereport) {
    var id = servicereport.$id;
    if (!$scope.editMode) {
      $scope.currentId = id;
      $scope.servicereport = Servicereport.find(id);
      console.info('EDIT $scope.servicereport:', id, $scope.servicereport);
      $scope.editMode = true;
    } else {
      $scope.editMode = false;
    }
  };

  $scope.preprintServicereport = function (servicereport) {
    var id = servicereport.$id;
    if (!$scope.printMode) {
      $scope.currentId = id;
      $scope.servicereport = Servicereport.find(id);
      console.info('Preprint $scope.servicereport:', id, $scope.servicereport);
      $scope.printMode = true;
    } else {
      $scope.printMode = false;
    }
  };

  $scope.printServicereport = function () {
    if ($scope.printMode) {
      $scope.print();
      window.onafterprint = function () {
        console.log('Printing dialog closed...');
        $scope.printMode = false;
        $scope.$apply();
      };
    }
  };

  $scope.dateInit = function () {
    $scope.dateMin = null;
    $scope.dateMax = null;
    $scope.dateFormat = 'dd MMMM yyyy HH:mm';
    $scope.dateOptions = {
      formatYear: 'yyyy',
      startingDay: 1,
      showWeeks: false
    };
    $scope.dateDisabled = function(/*date, mode*/) {
      //return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      return false;
    };
    $scope.dateOpen = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.dateOpened = true;
    };
  };

  $scope.setDateOut = function () {
    var d = new DateTime($scope.servicereport.dateOut);
    var hhmm = $scope.servicereport.duration.split(':');
    d.addHours(hhmm[0] || 0);
    d.addMinutes(hhmm[1] || 0);
    $scope.servicereport.dateOut = d.get();
  };

  $scope.getCustomers = function (viewValue) {
    console.info('getCustomers() - viewValue:', viewValue);
    return Customer.all;
  };

  $scope.onCustomerSelect = function(item, model, label) {
    console.info('onCustomerSelect() - item, model, label:', item, model, label);
    //if (!$scope.servicereport.location)
    $scope.servicereport.customer = item;
    $scope.servicereport.location = item.address;
  };

  $scope.typeof = function (val) {
    return typeof val;
  };

  $scope.match = function (str, pattern) {
    var regex = new RegExp(pattern, 'g');
    return str.match(regex);
  };

  $scope.print = function () {
    setTimeout(function () {
      window.print();
    }, 0);
  };

  $scope.initServicereport();

});