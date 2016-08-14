"use strict";
angular.module('hiremeapp.auth')
.directive('emailCheck', ['signupServices', function (signupServices) {
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
}]).directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {

            var firstPassword = '#' + attrs.pwCheck;
            $(elem).add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    ctrl.$setValidity('pwmatch',  elem.val()===$(firstPassword).val());
                });
            });
        }
    }
}]).directive('accountCheck', ['loginServices', function (loginServices) {
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
                    //TODO
                });
            });
        }
    }
}]);