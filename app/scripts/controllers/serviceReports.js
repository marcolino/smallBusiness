'use strict';
 
app.controller('ServicereportsCtrl', function ($scope, $location, Servicereport, Customer, Auth/*, UserNotify*/) {
  console.info('servicereports controller...');

  $scope.servicereport = { number: '', date: '', customername: '', place: '', notes: '', owner: '', dateCreation: '', };
  $scope.$watch(Auth.currentUser, function(user) {
    if (user) {
      //$scope.servicereport = angular.copy($scope.servicereportPlaceholder);
/*
      $scope.stash.$on('loaded', function () {
        var number = stash['serviceReportNumber'];
        console.log('number was ', number, 'returning ', number + 1);
        $scope.servicereport.number = number + 1;
      });
*/
      $scope.servicereport.date = new Date();
      $scope.servicereport.owner = $scope.currentUser.username;
      $scope.servicereport.number = Servicereport.getNumberNext();
console.info('$scope.servicereport.number:', $scope.servicereport.number);

      $scope.servicereportPlaceholder = angular.copy($scope.servicereport);

      initDate();
      console.info($scope.servicereport);
    }
  }, true);

  //if ($location.path() === '/servicereports') {
    $scope.servicereports = Servicereport.all;
  //}

  $scope.servicereportSelected = '';
  $scope.servicereportIdCurrent = null;

  $scope.servicereportAddMode = false;
  $scope.servicereportEditMode = false;  
  $scope.servicereportPrintMode = false;
  $scope.orderby = '-number';

  ////////////////////////////////////////////////////////////////////////////////////
  function initDate () {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    $scope.disabled = function(/*date, mode*/) {
      //return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      return false;
    };

    $scope.minDate = null;
/*
    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
*/

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

/*
  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1,
    showWeeks: false
  };
*/

    $scope.initDate = $scope.servicereport.date;
    /*
    $scope.formats = ['dd MMMM yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    */
    $scope.format = 'dd MMMM yyyy';
  }
  ////////////////////////////////////////////////////////////////////////////////////

  $scope.submitServicereport = function () {
    var now = new Date();
    $scope.servicereport.dateCreation = now;
    if ($scope.servicereportEditMode) {
      //var servicereportId = $scope.servicereportIdCurrent;
      var servicereport = {};
      for (var fld in $scope.servicereportPlaceholder) {
        servicereport[fld] = $scope.servicereport[fld];
      }
      Servicereport.set($scope.servicereportIdCurrent, servicereport).then(function () {
        $scope.servicereport = angular.copy($scope.servicereportPlaceholder);
      });
    }
    if ($scope.servicereportAddMode) {
        Servicereport.create($scope.servicereport).then(function (/*servicereportId*/) {
        $scope.servicereport = angular.copy($scope.servicereportPlaceholder);
      });
    }
    $scope.servicereportAddMode = $scope.servicereportEditMode = false;
  };

  $scope.cancelServicereport = function () {
    $scope.servicereportAddMode = $scope.servicereportEditMode = false;
console.info('$scope.servicereport:', $scope.servicereport);
    $scope.servicereport = angular.copy($scope.servicereportPlaceholder);
  };

  $scope.deleteServicereport = function (servicereport) {
    var id = servicereport.$id;
    console.info('DELETE SR CTRL:', id);
    Servicereport.delete(id);
  };

  $scope.editServicereport = function (servicereport) {
    var id = servicereport.$id;
    if (!$scope.servicereportEditMode) {
      $scope.servicereportIdCurrent = id;
      $scope.servicereport = Servicereport.find(id);
      console.info('EDIT $scope.servicereport:', id, $scope.servicereport);
      $scope.servicereportEditMode = true;
    } else {
      $scope.servicereportEditMode = false;
    }
  };

  $scope.printServicereport = function () {
    $scope.servicereportPrintMode = true;
  };

  $scope.resetServicereportSelected = function () {
    $scope.servicereportSelected = '';
  };

  $scope.typeof = function (val) {
    return typeof val;
  };

  $scope.match = function (str, pattern) {
    var regex = new RegExp(pattern, 'g');
    return str.match(regex);
  };

});

/*
app.controller('ServicereportsCtrl', function ($scope, $location, Servicereport) {

  if ($location.path() === '/servicereports') { // avoid overriding $scope.servicereports when listing specific user's servicereports
    $scope.servicereports = Servicereport.all;
  }
  var now = new Date();
  //var today = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss Z');
  //console.info('today:', today);

  $scope.servicereportPlaceholder = { customer: '', title: '', date: now, text: '', };
  $scope.servicereport = $scope.servicereportPlaceholder;

  $scope.submitServicereport = function () {
    //console.log('submitServicereport in ServicereportsCtrl');
    Servicereport.create($scope.servicereport).then(function () {
      $scope.servicereport = $scope.servicereportPlaceholder;
      //$location.path('/servicereports/' + servicereportId);
    });
  };

  $scope.deleteServicereport = function (servicereportId) {
    Servicereport.delete(servicereportId);
  };

});
*/