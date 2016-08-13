"use strict";
var users = angular.module('hiremeapp.signup', [
    'ngMaterial',
    'ngMessages',
    'hiremeapp.auth.directives'

])
.controller('SignupController', function(signupServices, $timeout, $log, $scope, $state, $stateParams){
    var self = this;

    self.user = {
        name: "",
        email: "",
        password: ""
    }

    self.signUp = function(form, userData){

        signupServices.signUp(userData).then(function successCallback(response) {
            if(response.data.success){
                AuthenticationService.logIn(response.data.user, response.data.jwt) ;
                $state.go('index.home', { "user": response.data.user});
            }
            else switch(response.data.code){
                case 'DuplicatedUser':
                    form.email.$setValidity("duplicated", false);
                    break;
                default:
                    break;
            }
        }, function errorCallback(response) {
            //TODO
        });
    }


    // *********************************
    // Internal methods
    // *********************************



});