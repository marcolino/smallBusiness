/* global app:true */
'use strict';

/**
 * @ngdoc overview
 * @name smallBusinessApp
 * @description
 * # smallBusinessApp
 *
 * Main module of the application.
 */
var app = angular.module('smallBusinessApp', [
    'ngAnimate', // TODO: learn how to use it (if we need it...)
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch', // TODO: learn how to use it (if we need it...)
    'firebase'
  ]);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/orders.html',
      controller: 'OrdersCtrl'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'AuthCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'AuthCtrl'
    })
    .when('/orders/:orderId', {
      templateUrl: 'views/showorder.html',
      controller: 'OrderViewCtrl'
    })
    .when('/contacts', {
      templateUrl: 'views/contacts.html',
      controller: 'ContactsCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .when('/users/:username', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
app.constant('FIREBASE_URL', 'https://smallbusiness.firebaseio.com/');

/*
  .config(function ($httpProvider) {
    $httpProvider.responseInterceptors.push('myHttpInterceptor');
    var spinnerFunction = function (data, headersGetter) {
      // todo start the spinner here
      $('#loading').show();
      return data;
    };
    $httpProvider.defaults.transformRequest.push(spinnerFunction);
  })
  // register the interceptor as a service, intercepts ALL angular ajax http calls
  .factory('myHttpInterceptor', function ($q, $window) {
    return function (promise) {
      return promise.then(function (response) {
        // hide the spinner on success
        $('#loading').hide();
        return response;
      }, function (response) {
        // hide the spinner on error
        $('#loading').hide();
        return $q.reject(response);
      });
    };
  })
*/

/*
app.run(function (stateFactory) {
  stateFactory.match = {};
  stateFactory.match.date = new Date();
  stateFactory.match.status = 'starting';
  stateFactory.teams = {};
});
*/

app.run(function () {
/*
  $('.nav a').on('click', function() {
    //$(".btn-navbar").click();
    $(".navbar-toggle").click();
  });
*/
});