"use strict";
var main = angular.module('hiremeapp.main', [
    'ui.router', 'angular-jwt'
])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('landing', {
        url: "/",
        templateUrl: "app/src/landing/login.html",
        controller: "LoginController as lc",
        access: { requiredLogin: false }
    })
        .state('signup', {
        url: "/signup",
        templateUrl: "app/src/landing/signup.html",
        controller: "SignupController as sc",
        access: { requiredLogin: false }
    })
        .state('game.single', {
        url: "/game/single",
        templateUrl: "app/src/game/view/chooseAreaAndTech.html",
        controller: "ChooseAreaAndTechController",
        access: { requiredLogin: true }
    })
        .state('user', {
        url: "/user",
        templateUrl: "app/src/user/view/user.html",
        controller: "UserController as uc",
        access: { requiredLogin: true }
    })
        .state('index', {
        abstract: true,
        views: {
            '@' : {
                templateUrl: "app/src/home/view/main.html",
                //controller: 'IndexCtrl'
            },
            'top@index' : { templateUrl: 'app/src/header/header.html',},
            'sidebar@index' : { templateUrl: 'app/src/sidebar/sidebar.html',
                               controller: 'SidebarController'}
        },
    })
        .state('index.home', {
        access: { requiredLogin: false }, //TODO : change
        url: '/home',
        templateUrl: 'app/src/home/view/home.html'

    })        
        .state('index.game', {
        url: "/game",
        templateUrl: "app/src/game/view/chooseGameMode.html",
        controller: "GameController",
        params: {user: null},
        access: { requiredLogin: false } //TODO : change
    })

}).factory('AuthenticationService', function() {
    var auth = {
        isLogged: false
    }

    return auth;
}).config(function Config($httpProvider, jwtInterceptorProvider) {

    //    jwtInterceptorProvider.urlParam = 'x-access-token'

    jwtInterceptorProvider.tokenGetter = function() {
        return localStorage.getItem('JWT');
    }
    $httpProvider.interceptors.push('jwtInterceptor');
}).run(function($rootScope, $state, AuthenticationService) {
    $rootScope.$on('unauthenticated', function() {
        localStorage.setItem('JWT', undefined);
        $state.go('landing');
    });

    $rootScope.$on("$stateChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged) {
            event.preventDefault();
            $state.go('landing');
        }
    });

})




