"use strict";
var main = angular.module('hiremeapp.main', [
    'ui.router', 'angular-jwt',  'ngMaterial'
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
                templateUrl: "app/src/home/main.html"
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
        templateUrl: 'app/src/game/view/game.html'

    })

        .state('index.question', {
        url: "/play",
        templateUrl: "app/src/game/view/gameQuestion.html",
        controller: "QuestionController as ctrl",
        params: {user: null, filters: null, mode: null, questions: null, questionNr: null, selectedFriend: null, score: 0, enemyScore: 0},
        access: { requiredLogin: true }
        //onEnter: function($state, $stateParams){
        //    if(!$stateParams.filters) $state.go('index.game');
        //}
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
        templateUrl: "app/src/about/about-us.html",
        access: { requiredLogin: true }
    })

}).controller('RootController', ['userServices', 'AuthenticationService', '$scope', '$mdDialog', function(userServices, AuthenticationService, $scope, $mdDialog){
    var self = this;
    self.showUnsupportedBrowserAlert = function(ev) {
        $mdDialog.show({
            controller: AlertController,
            templateUrl: 'app/src/common/browserSupportAlert.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:false
        })
            .then(function(answer) {
        }, function() {
        });
    };

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

                AuthenticationService.updateUser(response.data.user);

            }, function errorCallback(response) {
                //TODO
            });

        }


        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        if(isSafari || isIE){
            self.showUnsupportedBrowserAlert();
        }


    });

    function AlertController($scope, $mdDialog) {
        var alert = this;
        $scope.hide = function() {
            $mdDialog.hide();
        };
    }
}]);
