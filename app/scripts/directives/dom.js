'use strict';

/**
  * Resize element height based on window height and a bottom, fixed element height;
  * The bottom element's id must be passed as attribute's value.
  * The element behaves as a vertical spring.
  */
/* global $:false */

app.directive('spring', function ($window) {
  return {
    link: function (scope, element, attrs) {
      var bottomElement = $('body').find('#' + attrs.spring)[0];
      if (typeof bottomElement === 'undefined') {
        return; // bottom element not found, return immediately
      }
      var window = angular.element($window);
      var bottomElementPadding = 3;
      var bottomElementHeight = bottomElementPadding + bottomElement.clientHeight;
  
      scope.getWindowHeight = function () {
        return {
          windowHeight: window.innerHeight(),
          topHeight: element[0].offsetTop, // this element offset from top
          elementHeight: element[0].clientHeight,
          bottomHeight: bottomElementHeight
        };
      };
  
      scope.$watch(scope.getWindowHeight, function (newValue/*, oldValue*/) {
        var windowHeightNew = newValue.windowHeight; // full window current height
        var topHeight = newValue.topHeight; // top element height
      //var thisHeight = newValue.elementHeight; // this element height
        var bottomHeight = newValue.bottomHeight; // bottom elements height
        var thisHeightNew = windowHeightNew - (topHeight + bottomHeight); // this element recalculated height
        element.css({ 'height': thisHeightNew });
      }, true);
  
      window.bind('resize', function () {
        scope.$apply();
      });
    }
  };
});