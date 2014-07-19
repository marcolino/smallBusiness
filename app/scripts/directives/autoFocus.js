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
        if (value === "true") {
          $timeout(function() {
            element[0].focus();
          });
        }
      });
    }
  };
});