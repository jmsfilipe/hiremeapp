"use strict";
var game = angular.module('hiremeapp.game', [
  'ngMaterial'
])
.controller('GameController', function($timeout, $log, $scope, $state, $stateParams){
  var self = this;
    self.user = $stateParams.user;
    
    
    console.log(self.user);

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
