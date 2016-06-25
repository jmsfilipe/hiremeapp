"use strict";
var main = angular.module('hiremeapp.main', [
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
      url: "",
      templateUrl: "src/home/view/home.html"
    })
    .state('game', {
        url: "/game",
        templateUrl: "src/game/view/chooseGameMode.html"
    })
    ;
})
