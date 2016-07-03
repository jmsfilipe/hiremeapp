"use strict";
var main = angular.module('hiremeapp.main', [
    'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('landing', {
        url: "/",
        templateUrl: "app/src/landing/login.html",
        controller: "LoginController as lc"
    })
        .state('signup', {
        url: "/signup",
        templateUrl: "app/src/landing/signup.html",
        controller: "SignupController as sc"
    })
        .state('game', {
        url: "/game",
        templateUrl: "app/src/game/view/chooseGameMode.html",
        controller: "GameController",
        params: {user: null}
    })
        .state('game.single', {
        url: "/game/single",
        templateUrl: "app/src/game/view/chooseAreaAndTech.html",
        controller: "ChooseAreaAndTechController"
    })
        .state('home', {
        url: "/home",
        templateUrl: "app/src/home/view/home.html",
        params: {user: null}
    })
        .state('user', {
        url: "/user",
        templateUrl: "app/src/user/view/user.html",
        controller: "UserController"
    })
    ;
});


