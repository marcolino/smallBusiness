'use strict';

app.directive('autoFocus', function($timeout) {
  console.info('autoFocus is running...');
  return {
    scope: {
      trigger: '@autoFocus'
    },
    link: function(scope, element) {
      scope.$watch('trigger',
        function(value) {
        if (value === 'true') {
          $timeout(function() {
            console.log('autoFocus:', element[0].id);
            element[0].focus();
          });
        }
      });
    }
  };
});

/*
app.directive('focus', function($timeout) {
  return {
    scope : {
      trigger: '@focus'
    },
    link: function(scope, element) {
      scope.$watch('trigger', function(value) {
        if (value === 'true') {
          $timeout(function() {
            console.log('giving focus to element', element[0].id);
            element[0].focus();
          });
        }
      });
    }
  };
});
*/