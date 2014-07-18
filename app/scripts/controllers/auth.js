'use strict';
 
app.controller('AuthCtrl', function ($scope, $location, Auth, User) {
  if (Auth.signedIn()) {
  	console.info('signedIn');
    $location.path('/');
  }
else { console.info('NOT signedIn'); }

  $scope.$on('$firebaseSimpleLogin:login', function () {
console.info('*************** $firebaseSimpleLogin:login did fire, redirecting to /');
    $location.path('/');
  });

  $scope.login = function () {
  	console.info('$scope.login() - $scope.user:', $scope.user);
    Auth.login($scope.user).then(function () {
      //$scope.user.md5_hash = '19b5c7e6c2772d88adcbd928daddc170'; // if not email auth mode...
      console.info('Auth.login() returned - $scope.user:', $scope.user);
      $location.path('/');
    }, function (error) {
      $scope.error = error.toString();
    });
  };

  $scope.register = function () {
    Auth.register($scope.user).then(function (authUser) {
      User.create(authUser, $scope.user.username);
      console.info('registered user:', authUser);
      $location.path('/');
    }, function (error) {
      $scope.error = error.toString();
    });
  };
});