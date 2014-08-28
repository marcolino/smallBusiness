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
          bottomHeight: bottomElementHeight
        };
      };
  
      scope.$watch(scope.getWindowHeight, function (newValue/*, oldValue*/) {
        var windowHeightNew = newValue.windowHeight; // full window current height
        var topHeight = newValue.topHeight; // top element height
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

app.directive('showDeviceClass', function ($window) {
  console.log('show');
  return {
    link: function (scope, element) {
      var window = angular.element($window);

      scope.getWindowWidth = function () {
        return window.width();
      };

      scope.$watch(scope.getWindowWidth, function (newValue) {
        var windowWidth = newValue;
        console.info('showDeviceClass() - window width:', windowWidth);
        var deviceClass = 'huge';
        if (windowWidth <= 1200) {
          deviceClass = 'wide';
        }
        if (windowWidth <= 992) {
          deviceClass = 'desktop';
        }
        if (windowWidth <= 768) {
          deviceClass = 'tablet';
        }
        if (windowWidth <= 480) {
          deviceClass = 'phone';
        }
        if (windowWidth <= 320) {
          deviceClass = 'custom';
        }
        console.info('showDeviceClass() - device class:', deviceClass);
        element.html(
          '<span style="color:darkgreen;font-style:italic;">' +
          'width: ' + windowWidth + 'px' +
          '&emsp;' +
          'device: ' + deviceClass +
          '&emsp;&emsp;' +

          '</span>'
        );
      }, true);
  
      window.bind('resize', function () {
        scope.$apply();
      });
    },
  };
});