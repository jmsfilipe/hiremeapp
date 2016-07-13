"use strict";
var game = angular.module('hiremeapp.user', [
    'ngMaterial'
])
.controller('UserController', function($mdDialog, userServices, AuthenticationService){
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
            .then(function(answer) {

        }, function() {
            //canceled
        });

      }, function errorCallback(response) {

      });


    }

})
.controller('FriendsDialogController', function($scope, $mdDialog, userServices){
    var self = this;

    $scope.searchInput = "";
    self.friendsList = [];

    $scope.$watch('searchInput', function() {
      userServices.search({term: $scope.searchInput}).then(function successCallback(response) {
        self.friendsList = response.data;
      }, function errorCallback(response) {

      });
   });


    self.cancel = function() {
        $mdDialog.cancel();
    };
    self.save = function() {
        $mdDialog.hide();
    };

});
