"use strict";
var module = angular.module('hiremeapp.auth', [
    'angular-jwt', 
    'ngMaterial',
    'ngMessages'
]).config(function Config($httpProvider, jwtInterceptorProvider) {

    jwtInterceptorProvider.tokenGetter = function() {
        return localStorage.getItem('JWT');
    }
    $httpProvider.interceptors.push('jwtInterceptor');
})
;