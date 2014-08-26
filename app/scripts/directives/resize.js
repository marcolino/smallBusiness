'use strict';

app.directive('resize', function ($window) {
  return function (scope, element) {
    var w = angular.element($window);
    scope.getWindowDimensions = function () {
      return { 'h': w.height(), 'w': w.width() };
    };
    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
      scope.windowHeight = newValue.h;
      scope.windowWidth = newValue.w;
      console.info('windowHeight:', scope.windowHeight);

      scope.style = function () {
        return { 
          'height': (newValue.h - 100) + 'px',
          'width': (newValue.w - 100) + 'px' 
        };
      };

    }, true);

    w.bind('resize', function () {
      scope.$apply();
    });
  }
})