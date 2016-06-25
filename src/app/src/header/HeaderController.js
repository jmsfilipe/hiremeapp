"use strict";
var game = angular.module('hiremeapp.header', [
  'ngMaterial'
])
.controller('HeaderController', function($mdSidenav){
  var self = this;

  self.toggleList   = toggleUsersList;

  function toggleUsersList() {
    $mdSidenav('left').toggle();
  }
});
