"use strict";
var main = angular.module('hiremeapp.main', [
    'ui.router', 'angular-jwt'
])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('landing', {
        url: "/",
        templateUrl: "app/src/landing/landing.html",
        controller: "LoginController as ctrl",
        access: { requiredLogin: false }
    })
        .state('signin', {
        url: "/signin",
        templateUrl: "app/src/auth/login.html",
        controller: "LoginController as ctrl",
        access: { requiredLogin: false }
    })
        .state('signup', {
        url: "/signup",
        templateUrl: "app/src/auth/signup.html",
        controller: "SignupController as ctrl",
        access: { requiredLogin: false }
    })
        .state('index', {
        abstract: true,
        views: {
            '@' : {
                templateUrl: "app/src/home/view/main.html"
            },
            'top@index' : { templateUrl: 'app/src/header/header.html',
                           controller: 'HeaderController as header'
                          },
            'sidebar@index' : { templateUrl: 'app/src/sidebar/sidebar.html',
                               controller: 'SidebarController as sidebar'
                              }
        },
    })
        .state('index.game', {
        access: { requiredLogin: true },
        url: '/home',
        controller: "GameController as ctrl",
        params: {user: null},
        templateUrl: 'app/src/game/view/home.html'

    })

        .state('index.question', {
        url: "/play",
        templateUrl: "app/src/game/view/chooseQuestion.html",
        controller: "QuestionController as ctrl",
        params: {user: null, filters: null},
        access: { requiredLogin: true },
        onEnter: function($state, $stateParams){
            if(!$stateParams.filters) $state.go('index.game');
        }
    })
        .state('index.user', {
        url: "/user",
        templateUrl: "app/src/user/view/user.html",
        controller: "UserController as ctrl",
        access: { requiredLogin: true }
    })   
        .state('index.friend', {
        url: "/friend/:userId",
        templateUrl: "app/src/user/view/user.html",
        controller: "UserController as ctrl",
        params: {user: null},
        access: { requiredLogin: true },
        onEnter: function($state, $stateParams){
            //  if(!$stateParams.user) $state.go('index.game');
        }
    })
        .state('index.settings', {
        url: "/user/settings",
        templateUrl: "app/src/user/view/settings.html",
        controller: "SettingsController as ctrl",
        access: { requiredLogin: true }
    })
        .state('index.about-us', {
        url: "/about-us",
        templateUrl: "app/src/home/view/about-us.html",
        controller: "SettingsController as ctrl",
        access: { requiredLogin: true }
    })

}).controller('RootController', ['userServices', 'AuthenticationService', '$scope', function(userServices, AuthenticationService, $scope){
    var self = this;
    self.auth = AuthenticationService;

    $scope.$on('unauthenticated', function() {
        self.auth.logOut();
    });

    $scope.$on("$stateChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access.requiredLogin && !self.auth.isLogged) {
            event.preventDefault();
            self.auth.logOut();
        } else if(self.auth.isLogged){
            userServices.registerAsOnline();

            userServices.getSelf().then(function successCallback(response) {

                self.auth.updateUser(response.user);

            }, function errorCallback(response) {
                //TODO
            });
            
        }
    });
}]);
