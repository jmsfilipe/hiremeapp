"use strict";
var main = angular.module('hiremeapp.main', [
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('game', {
        url: "/game",
        templateUrl: "src/game/view/chooseGameMode.html"
    })
    .state('users', {
        url: "/users",
        templateUrl: "src/users/view/contactSheet.html"
    })
    .state('home', {
        url: "/home",
        templateUrl: "src/users/view/oldHome.html"
    })
    ;
})
