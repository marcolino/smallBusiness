'use strict';

var POSITIVE_INTEGER_REGEXP = /^\d+$/;
var DURATION_REGEXP = /^\d+[:.]\d+$/;
app.directive('duration', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        var hh = -1;
        var mm = -1;
        if (POSITIVE_INTEGER_REGEXP.test(viewValue)) {
          hh = parseInt(viewValue);
          mm = 0;
        } else {
          if (DURATION_REGEXP.test(viewValue)) {
            var hhmm = viewValue.split(/\s*[:.]\s*/);
            hh = parseInt(hhmm[0]);
            mm = parseInt(hhmm[1]);
            if (mm >= 60) {
              hh = mm = -1;
            }
          }
        }
        var m = (hh * 60) + mm;
        if (m > 0) { // it is valid, set it and return viewValue
          ctrl.$setValidity('duration', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          ctrl.$setValidity('duration', false);
          return undefined;
        }
      });
    }
  };
});