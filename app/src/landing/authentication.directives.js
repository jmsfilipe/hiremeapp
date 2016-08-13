"use strict";
var users = angular.module('hiremeapp.auth.directives', [
    'ngMaterial',
    'ngMessages'

])
.directive('emailCheck', function (signupServices) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {

            $(elem).on('focusout', function () {
                signupServices.validateUser({email: elem.val()})
                    .then(function successCallback(response) {
                    ctrl.$setValidity("duplicated", response.data.valid);
                }, function errorCallback(response) {
                    //TODO
                });
            });
        }
    }
}).directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {

            var firstPassword = '#' + attrs.pwCheck;
            $(elem).add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val()===$(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        }
    }
}]).directive('accountCheck', function (loginServices) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {

            $(elem).on('focusout', function () {
                if(!elem.val()) {
                    ctrl.$setValidity("registered", true);
                    return;
                }

                //validate email input
                loginServices.validateAccount({email: elem.val()})
                    .then(function successCallback(response) {
                    ctrl.$setValidity("registered", response.data.valid);

                }, function errorCallback(response) {
                    //canceled
                });
            });
        }
    }
});