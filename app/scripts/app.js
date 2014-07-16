'use strict';
/* global app:true */

/**
 * @ngdoc overview
 * @name smallBusinessApp
 * @description
 * # smallBusinessApp
 *
 * Main module of the application.
 */
var app = angular.module('smallBusinessApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/orders.html',
        controller: 'OrdersCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
