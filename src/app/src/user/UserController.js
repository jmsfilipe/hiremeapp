"use strict";
var game = angular.module('hiremeapp.user', [
    'ngMaterial'
])
.controller('UserController', function($mdDialog, $state, userServices, AuthenticationService){
    var self = this;

    self.totalFriends = 0;
    self.friendsList = [];

    var userId = AuthenticationService.user._id;

    userServices.totalFriends({user_id: userId}).then(function successCallback(response) {
        self.totalFriends = response.data.total_friends;
    }, function errorCallback(response) {

    });

    userServices.listFriends({user_id: userId}).then(function successCallback(response) {
      self.friendsList = response.data.friends;
    }, function errorCallback(response) {

    });

    self.showFriendsDialog = function(ev){

      userServices.listFriends({user_id: userId}).then(function successCallback(response) {
        self.friendsList = response.data.friends;

        $mdDialog.show({
            controller: 'FriendsDialogController as dialog',
            templateUrl: "app/src/user/friendsDialog.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
                friends: self.friendsList
            }
        })
            .then(function() {
              userServices.listFriends({user_id: userId}).then(function successCallback(response) {
                self.friendsList = response.data.friends;
              }, function errorCallback(response) {

              });
        }, function() {
            //canceled
        });

      }, function errorCallback(response) {

      });


    }

})
.controller('FriendsDialogController', function($scope, $mdDialog, userServices, AuthenticationService){
    var self = this;

    $scope.searchInput = "";
    self.friendsList = [];
    var userId = AuthenticationService.user._id;

    $scope.$watch('searchInput', function() {
      userServices.search({term: $scope.searchInput, user_id: userId}).then(function successCallback(response) {
        self.friendsList = response.data;
      }, function errorCallback(response) {

      });
   });

   self.addFriend = function(friend, ev){
     userServices.addFriend({user_id: userId, user_to_add_id: friend._id}).then(function successCallback(response) {

     }, function errorCallback(response) {

     });
   }

    self.close = function() {
        $mdDialog.hide();
    };

});
