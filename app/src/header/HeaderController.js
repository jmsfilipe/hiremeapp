"use strict";
var game = angular.module('hiremeapp.header', [
    'ngMaterial'
])
.controller('HeaderController', ['$mdSidenav', 'AuthenticationService', function($mdSidenav, AuthenticationService){
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
    }

    var pusher = new Pusher('103852ed8f71511f0f4b', {
      cluster: 'eu',
      encrypted: true
    });

    var channel = pusher.subscribe(AuthenticationService.user._id);

    channel.bind('notification', function(data) {
      alert(data.message);
    });

}]);
