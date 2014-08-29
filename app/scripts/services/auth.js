'use strict';
 
app.factory('Auth', function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);

  var auth = $firebaseSimpleLogin(ref);

  var Auth = {
    register: function (user) {
      return auth.$createUser(user.email, user.password);
    },
    signedIn: function () {
      if (auth.user !== null) {
        //console.log('auth.user:', auth.user, '$rootScope.currentUser:', $rootScope.currentUser);
        return true;
      }
      return false;
    },
    currentUser: function () {
      if (auth.user !== null) {
        return $rootScope.currentUser;
      }
      return null;
    },
    login: function (user) {
      //return auth.$login('password', user);
      /**/
      return auth.$login('password', {
        email: user.email,
        password: user.password,
        rememberMe: true
      });
      /**/
    },
    logout: function () {
      auth.$logout();
    },
    removeUser: function (user) { // TODO: test this
      auth.$removeUser(user.email, user.password, function(error) { // password is password_hash ?
        if (error === null) {
          console.log('User removed successfully');
        } else {
          console.log('Error removing user:', error);
        }
        return error;
      });
    },
    sendPasswordResetEmail: function (email) { // TODO: test this
      if (!email) {
        console.log('Please specify your email');
      } else {
        console.info('auth:', auth);
        return auth.$sendPasswordResetEmail(email);
        /*
        auth.$sendPasswordResetEmail(email, function(error) {
          console.info('error:', error);
          if (error === null) {
            console.log('Password reset email sent successfully');
          } else {
            console.log('Error sending password reset email:', error);
          }
          return error;
        });
        */
      }
    }
  };

  $rootScope.signedIn = function () {
    return Auth.signedIn();
  };
 
  return Auth;
});