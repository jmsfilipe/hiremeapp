"use strict";
var game = angular.module('hiremeapp.header', [
    'ngMaterial'
])
.controller('HeaderController', ['$mdSidenav', 'AuthenticationService', '$state', function($mdSidenav, AuthenticationService,$state){
    var self = this;
    var originatorEv;
    self.openMenu = function($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
    };

    self.toggleSidebar = function() {
        $mdSidenav('left').toggle();
    }

    self.signOut = function(){
        AuthenticationService.logOut();
        $state.go('landing');
    }

}]);
