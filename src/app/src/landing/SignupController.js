"use strict";
var users = angular.module('hiremeapp.signup', [
    'ngMaterial',
    'ngMessages'

])
.controller('SignupController', function(signupServices, $timeout, $log, $scope, $state, $stateParams){
    var self = this;

    self.user = {
        name: "",
        email: "",
        password: ""
    }

    self.signUp = function(form, userData){
        // Load all articles

        signupServices.signUp(userData)
            .success(function(data) {
            $state.go('game', { "user": self.signupForm});
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
.service('signupServices', function($http){
    return {
        signUp : function(formData) {
            console.log(formData);
            return $http.post('/api/user/new', formData);
        },
        validateUser : function(userData) {
            return $http.get('/api/signup/validator', {
                params: userData});
        }
    };

}).directive('emailCheck', function (signupServices) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {

            $(elem).on('focusout', function () {

                signupServices.validateUser({email: elem.val()})
                    .then(function successCallback(response) {


                    ctrl.$setValidity("duplicated", response.data.valid);

                }, function errorCallback(response) {

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