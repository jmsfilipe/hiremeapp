"use strict";
var module = angular.module('hiremeapp.auth', ['angular-jwt'])
.factory('AuthenticationService', function() {

    
    var logOut = function(){
        auth.isLogged = false;
        localStorage.setItem('JWT', undefined);
        auth.user = null;
    }
    
    var logIn = function(user, jwt){
        auth.isLogged = true;
        localStorage.setItem('JWT', jwt);
        auth.user = user;
    }
    
        var auth = {
        isLogged: false,
        user: null,
        logOut: logOut,
        logIn: logIn
    }

    return auth;
}).config(function Config($httpProvider, jwtInterceptorProvider) {

    jwtInterceptorProvider.tokenGetter = function() {
        return localStorage.getItem('JWT');
    }
    $httpProvider.interceptors.push('jwtInterceptor');
})
.service('loginServices', function($http){
    return {
        authenticate : function(userData) {
            return $http.post('/api/authenticate', userData);
        },
        validateAccount : function(userData) {
            return $http.get('/api/login/validator', {
                params: userData});
        }
    };
}).service('signupServices', function($http){
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

});

