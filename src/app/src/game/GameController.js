"use strict";
var game = angular.module('hiremeapp.game', [
  'ngMaterial'
])
.controller('GameController', function(){
  var self = this;

  self.toggleList   = toggleUsersList;

  function toggleUsersList() {
    $mdSidenav('left').toggle();
  }
})
.controller('ChooseAreaAndTechController', function(){
  var self = this;

  self.toggleList   = toggleUsersList;

  function toggleUsersList() {
    $mdSidenav('left').toggle();
  }
});
