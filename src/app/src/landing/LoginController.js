"use strict";
var users = angular.module('hiremeapp.landing', [
    'ngMaterial',
    'ngMessages'

])
.controller('LoginController', function(loginServices, $timeout, $log, $scope, $state, $stateParams){
    var self = this;

    self.user = {
        email: "",
        pw: ""
    }

    self.signIn = function(form, userData){
        // Load all articles

        loginServices.getUser(userData)
            .then(function successCallback(response) {

            switch(response.status){
                case 204:
                    form.email.$setValidity("invalid", false);
                    break;
                case 200:
                    $state.go('home', { "user": self.signupForm});
                    break;
                default:
                    break;
            }
        }, function errorCallback(response) {
            switch(response.status){
                case 401:
                    form.password.$setValidity("invalid", false);
                    break;
                default:
                    break;
            }
        });




    }



    // *********************************
    // Internal methods
    // *********************************



}).directive('accountCheck', function (loginServices) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {

            $(elem).on('focusout', function () {

                loginServices.validateAccount({email: elem.val()})
                    .then(function successCallback(response) {


                    ctrl.$setValidity("registered", response.data.valid);

                }, function errorCallback(response) {

                });



            });
        }
    }
})
.service('loginServices', function($http){
    return {
        getUser : function(userData) {
            return $http.get('/api/user', {
                params: userData});
        },
        validateAccount : function(userData) {
            return $http.get('/api/login/validator', {
                params: userData});
        }
    };

});