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



});