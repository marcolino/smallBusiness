'use strict';
 
app.controller('AuthCtrl', function ($scope, $location, Auth, User) {
  if (Auth.signedIn()) {
  	//console.info('signedIn');
    $location.path('/');
  }

  $scope.$on('$firebaseSimpleLogin:login', function () {
    //console.info('*** $firebaseSimpleLogin:login did fire, redirecting to /');
    $location.path('/');
  });

  $scope.login = function () {
  	//console.info('$scope.login() - $scope.user:', $scope.user);
    if ($scope.user) {
      Auth.login($scope.user).then(function () {
        //console.info('Auth.login() returned - $scope.user:', $scope.user);
        $location.path('/');
      }, function (error) {
        $scope.error = error.toString();
      });
    } else {
      $scope.error = 'Please specify a user name and a password';
    }
  };

  $scope.register = function () {
    Auth.register($scope.user).then(function (authUser) {
      User.create(authUser, $scope.user.username);
      //console.info('registered user:', authUser);
      $location.path('/');
    }, function (error) {
      $scope.error = error.toString();
    });
  };

  $scope.sendPasswordResetEmail = function (email) {
    Auth.sendPasswordResetEmail(email, function(error) {
      if (error === null) {
        console.info('Password reset email sent successfully');
      } else {
        console.info('Error sending password reset email:', error);
      }
    });
  };

});