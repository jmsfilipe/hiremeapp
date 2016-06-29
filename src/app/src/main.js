"use strict";
var main = angular.module('hiremeapp.main', [
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
      url: "",
      templateUrl: "app/src/home/view/home.html"
    })
    .state('game', {
        url: "/game",
        templateUrl: "app/src/game/view/chooseGameMode.html"
    })
    .state('game.single', {
        url: "/game/single",
        templateUrl: "app/src/game/view/chooseAreaAndTech.html",
        controller: "ChooseAreaAndTechController"
    })
    ;
})
