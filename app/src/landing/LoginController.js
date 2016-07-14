"use strict";
var users = angular.module('hiremeapp.landing', [
    'ngMaterial',
    'ngMessages',
    'hiremeapp.auth.directives'

])
.controller('LoginController', function(loginServices, $timeout, $log, $scope, $state, $stateParams,  AuthenticationService){
    var self = this;

    self.user = {
        email: "teste@mail.com",
        password: "123a<"
    }




    self.signIn = function(form, userData){
        // Load all articles

        loginServices.authenticate(userData)
            .then(function successCallback(response) {

            switch(response.status){
                case 200:
                    if(response.data.success){
                        AuthenticationService.logIn(response.data.user, response.data.jwt) ;
                        $state.go('index.home', { "user": self.signupForm});
                    }
                    else
                        form.password.$setValidity("invalid", false);

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



});