"use strict";
var game = angular.module('hiremeapp.user', [
    'ngMaterial'
])
.controller('UserController', function($mdDialog, userServices){
    var self = this;

    self.totalFriends = 0;

    userServices.totalFriends({user_id: '111'}).then(function successCallback(response) {
        self.totalFriends = response.data.total_friends;
    }, function errorCallback(response) {

    });

    self.showFriendsDialog = function(ev){
      $mdDialog.show({
          controller: 'FriendsDialogController as dialog',
          templateUrl: "app/src/user/friendsDialog.html",
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
      })
          .then(function(answer) {
          self.filters = answer;
          $state.go('index.question', {filters: self.filters});
      }, function() {
          //canceled
      });
    }

})
.controller('FriendsDialogController', function($scope, $mdDialog){
    var self = this;

    self.cancel = function() {
        $mdDialog.cancel();
    };
    self.save = function() {
        $mdDialog.hide();
    };

});
