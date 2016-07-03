"use strict";
var game = angular.module('hiremeapp.user', [
  'ngMaterial'
])
.controller('UserController', function($mdSidenav){
  var self = this;

  self.toggleList   = toggleUsersList;

  function toggleUsersList() {
    $mdSidenav('left').toggle();
  }
});
