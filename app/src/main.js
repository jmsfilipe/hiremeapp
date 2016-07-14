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
        access: { requiredLogin: false }, //TODO
        url: '/home',
        controller: "GameController as gm",
        params: {user: null},
        templateUrl: 'app/src/home/view/home.html'

    })

        .state('index.question', {
        url: "/play",
        templateUrl: "app/src/game/view/chooseQuestion.html",
        controller: "QuestionController as qc",
        params: {user: null, filters: null},
        access: { requiredLogin: false },
        onEnter: function($state, $stateParams){
            if(!$stateParams.filters) $state.go('index.home');
        }
        //TODO
    })
        .state('index.user', {
        url: "/user",
        templateUrl: "app/src/user/view/user.html",
        controller: "UserController as uc",
        access: { requiredLogin: true }
    })
        .state('index.settings', {
        url: "/user/settings",
        templateUrl: "app/src/user/view/settings.html",
        controller: "SettingsController as sc",
        access: { requiredLogin: true }
    })

}).controller('RootController', function(AuthenticationService, $state, $scope){
    var self = this;

    self.auth = AuthenticationService;

    $scope.$on('unauthenticated', function() {
        auth.logOut();
        $state.go('landing');
    });

    $scope.$on("$stateChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access.requiredLogin && !self.auth.isLogged) {
            event.preventDefault();
            $state.go('landing');
        }
    });
})
;
