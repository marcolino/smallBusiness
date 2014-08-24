'use strict';

app.directive('checkUserName', function(User) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, model) {
      var USERNAME_REGEXP = /^[^.$\[\]#\/\s]+$/;
      model.$parsers.unshift(function(viewValue) {
        if (USERNAME_REGEXP.test(viewValue)) {
          if (User.findByUsername(viewValue).$getIndex().length === 0) {
            model.$setValidity('taken', true);
            model.$setValidity('invalid', true);
            return viewValue;
          } else {
            model.$setValidity('taken', false);
            model.$setValidity('invalid', true);
            return undefined;
          }
        } else {
          model.$setValidity('taken', true);
          model.$setValidity('invalid', viewValue === '');
          return undefined;
        }
      });
    }
  };
});

app.directive('checkDuration', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      var POSITIVE_INTEGER_REGEXP = /^\d+$/;
      var DURATION_REGEXP = /^\d+[:.]\d+$/;
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

app.directive('checkCustomerName', function(/*Customer*/) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, model) {
      var CUSTOMERNAME_REGEXP = /^[^.$\[\]#\/\s]+$/;
      model.$parsers.unshift(function(viewValue) {
        if (CUSTOMERNAME_REGEXP.test(viewValue)) {
/*
          if (Customer.findByUsername(viewValue).$getIndex().length === 0) {
*/
            model.$setValidity('taken', true);
            model.$setValidity('invalid', true);
            return viewValue;
/*
          } else {
            model.$setValidity('taken', false);
            model.$setValidity('invalid', true);
            return undefined;
          }
*/
        } else {
          model.$setValidity('taken', true);
          model.$setValidity('invalid', false);
          return undefined;
        }
      });
    }
  };
});

app.directive('checkEmail', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, model) {
      var EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      model.$parsers.unshift(function(viewValue) {
        if (EMAIL_REGEXP.test(viewValue)) {
          model.$setValidity('invalid', true);
          return viewValue;
        } else {
          model.$setValidity('invalid', false);
          return undefined;
        }
      });
    }
  };
});

app.directive('checkPhone', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, model) {
      var PHONE_REGEXP = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
      //var PHONE_REGEXP = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
      model.$parsers.unshift(function(viewValue) {
        if (PHONE_REGEXP.test(viewValue)) {
          model.$setValidity('invalid', true);
          return viewValue;
        } else {
          model.$setValidity('invalid', false);
          return undefined;
        }
      });
    }
  };
});

app.directive('checkCfOrPiva', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, model) {
      var CF_LENGTH = 16;
      var PIVA_LENGTH = 11;
      model.$parsers.unshift(function(viewValue) {
        var error = null;
        var valid, i, c, s;
        if (!viewValue || (viewValue.length !== CF_LENGTH && viewValue.length !== PIVA_LENGTH)) { // can't tell if this was a CF or PIVA
          error = 'norCfNorPiva';
        } else {
          if (viewValue.length === CF_LENGTH) { // user is probably inserting a CF
            viewValue = viewValue.toUpperCase();
            valid = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            for (i = 0; i < 16; i++) {
              if (valid.indexOf(viewValue.charAt(i)) === -1) {
                error = 'cfinvalidchar';
                break;
              }
            }
            if (!error) { // validity check of chars passed
              var set1 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
              var set2 = 'ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ';
              var seteven = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
              var setodd = 'BAKPLCQDREVOSFTGUHMINJWZYX';
              s = 0;
              for (i = 1; i <= 13; i += 2) {
                s += seteven.indexOf(set2.charAt(set1.indexOf(viewValue.charAt(i))));
              }
              for (i = 0; i <= 14; i += 2) {
                s += setodd.indexOf(set2.charAt(set1.indexOf(viewValue.charAt(i))));
              }
              if (s % 26 !== viewValue.charCodeAt(15) - 'A'.charCodeAt(0)) {
                error = 'cfcrcwrong';
              }
            }
          }
          if (viewValue.length === PIVA_LENGTH) { // user is probably inserting a PIVA
            valid = '0123456789';
            for (i = 0; i < 11; i++) {
              if (valid.indexOf(viewValue.charAt(i)) === -1) {
                error = 'pivainvalidchar';
                break;
              }
            }
            s = 0;
            for (i = 0; i <= 9; i += 2) {
              s += viewValue.charCodeAt(i) - '0'.charCodeAt(0);
            }
            for (i = 1; i <= 9; i += 2) {
              c = 2 * (viewValue.charCodeAt(i) - '0'.charCodeAt(0));
              if (c > 9) {
                c = c - 9;
              }
              s += c;
            }
            if ((10 - s % 10) % 10 !== viewValue.charCodeAt(10) - '0'.charCodeAt(0)) {
              error = 'pivacrcwrong';
            }
          }
        }
        if (error) {
          model.$setValidity(error, false);
          return undefined;
        } else {
          model.$setValidity('norCfNorPiva', true);
          model.$setValidity('cfinvalidchar', true);
          model.$setValidity('cfcrcwrong', true);
          model.$setValidity('pivainvalidchar', true);
          model.$setValidity('pivacrcwrong', true);
          return viewValue;
        }
      });
    }
  };
});