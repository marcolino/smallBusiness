'use strict';
 
app.factory('Auth', function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);

  var auth = $firebaseSimpleLogin(ref);

  var Auth = {
    register: function (user) {
      return auth.$createUser(user.email, user.password);
    },
    signedIn: function () {
      console.info('Service auth - signedIn()');
      if (auth.user !== null) {
        //$rootScope.currentUser = auth.user;
        console.log('auth.user:', auth.user);
        console.log('$rootScope.currentUser:', $rootScope.currentUser);
        return true;
      }
      return false;
      //return auth.user !== null;
    },
    login: function (user) {
      return auth.$login('password', {
        email: user.email,
        password: user.password,
        rememberMe: true
      });
    },
    logout: function () {
      auth.$logout();
    }
  };

  $rootScope.signedIn = function () {
    return Auth.signedIn();
  };
 
  return Auth;
});