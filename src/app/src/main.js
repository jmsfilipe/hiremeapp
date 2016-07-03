"use strict";
var main = angular.module('hiremeapp.main', [
    'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('landing', {
        url: "",
        templateUrl: "app/src/landing/landing.html"
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
        templateUrl: "app/src/home/view/home.html"
    })
        .state('user', {
        url: "/user",
        templateUrl: "app/src/user/view/user.html",
        controller: "UserController"
    })
    ;
})
