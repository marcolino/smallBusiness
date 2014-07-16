'use strict';

/**
 * @ngdoc function
 * @name smallBusinessApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the smallBusinessApp
 */
angular.module('smallBusinessApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
