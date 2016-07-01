"use strict";
var users = angular.module('hiremeapp.landing', [
    'ngMaterial',
    'ngMessages'

])
.controller('LandingController', function(signupService,getUserService, $timeout, $log, $scope, $state, $stateParams){
    var self = this;

    self.user = {
        name: "",
        email: "",
        password: ""
    }

    self.signUp = function(form, userData){
        // Load all articles

        signupService.signUp(userData)
            .success(function(data) {
            $state.go('game', { "user": self.signupForm})
        })
            .error(function(data) {
            form.email.$setValidity("duplicated", false);
        });

    }







    // *********************************
    // Internal methods
    // *********************************



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
}])
.service('getUserService', function($http){
    return {
        getUser : function(userData) {
            return $http.get('/api/user', {
                params: userData});
        }
    };

})
.service('validateUserService', function($http){
    return {
        validateUser : function(userData) {
            return $http.get('/api/signup/validator', {
                params: userData});
        }
    };

})
.service('signupService', function($http){
    return {
        signUp : function(formData) {
            console.log(formData);
            return $http.post('/api/user/new', formData);
        }
    };

}).directive('emailCheck', function (validateUserService) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {

            $(elem).on('focusout', function () {

                validateUserService.validateUser({email: elem.val()})
                    .success(function(data) {

                        ctrl.$setValidity("duplicated", data.result);
                })
                    .error(function(data) {

                });

            });
        }
    }
}).directive('ngDisablePaste', function(){
    return {
        scope: {},
        link:function(scope,element){
            element.on('paste', function (event) {
                event.preventDefault();
            });
        }
    };
});