'use strict';
 
app.controller('ServicereportsCtrl', function ($scope, $location, Servicereport) {

  if ($location.path() === '/servicereports') { // avoid overriding $scope.servicereports when listing specific user's servicereports
    $scope.servicereports = Servicereport.all;
  }
  var now = new Date();
  console.info('now:', now);
  //var today = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss Z');
  //console.info('today:', today);

  $scope.servicereportPlaceholder = { customer: '', title: '', date: now, text: '', };
  $scope.servicereport = $scope.servicereportPlaceholder;

  $scope.submitServicereport = function () {
    //console.log('submitServicereport in ServicereportsCtrl');
    Servicereport.create($scope.servicereport).then(function (/*servicereportId*/) { /*ref*/
      $scope.servicereport = $scope.servicereportPlaceholder;
      //$location.path('/servicereports/' + /*ref.name()*/servicereportId);
    });
  };

  $scope.deleteServicereport = function (servicereportId) {
    Servicereport.delete(servicereportId);
  };

});