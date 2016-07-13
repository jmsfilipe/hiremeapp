"use strict";
var game = angular.module('hiremeapp.header', [
    'ngMaterial'
])
.controller('HeaderController', function($mdSidenav){
    var self = this;
    var originatorEv;
    self.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };



    self.toggleSidebar = function() {
        $mdSidenav('left').toggle();
    }

});
