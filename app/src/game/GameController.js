"use strict";
var game = angular.module('hiremeapp.game', [
    'ngMaterial',
    'ngAnimate'
])
.controller('GameController', function($timeout, $scope, $state, $stateParams, $mdDialog, questionServices, userServices, AuthenticationService){
    var self = this;
    self.user = $stateParams.user;
    self.filters = [];
    self.fabIsOpen = false;
    self.mode = 'single'; //0 single, 1 multi
    self.hasFriends = false;

    console.log(self.user);


    userServices.listFriends({user_id: AuthenticationService.user._id}).then(function successCallback(response) {

        if(response.data.friends.length > 0){
            self.hasFriends = true;
        } 

    }, function errorCallback(response) {
        //TODO
    });

    self.showTabDialog = function(ev) {
        $mdDialog.show({
            controller: 'RefineDialogController as dialog',
            templateUrl: "app/src/game/view/refineDialog.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
                items: self.filters
            }
        })
            .then(function(answer) {
            self.filters = answer;

        }, function() {
            //canceled
        });
    };

    self.start = function(){

        $state.go('index.question', {filters: self.filters}, {reload: true});
    }


    self.showAlertNoFriends = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Multiplayer')
            .textContent('Add some friends first! ')
            .ariaLabel('Multiplayer')
            .ok('Got it!')
            .targetEvent(ev)
        );
    };

    self.showDialogChooseFriend = function(ev){
        $mdDialog.show({
            controller: 'MultiplayerDialogController as dialog',
            templateUrl: "app/src/game/view/multiplayerDialog.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
                selectedFriend: self.selectedFriend
            }
        })
            .then(function(selectedFriend) {
            self.selectedFriend = selectedFriend;
            self.mode = 'multi';

            console.log(self.selectedFriend);

        }, function() {
            //canceled
        });

    }

    self.selectMultiplayer = function(ev) {

        userServices.listFriends({user_id: AuthenticationService.user._id}).then(function successCallback(response) {

            if(response.data.friends.length == 0){
                self.showAlertNoFriends(ev);
            } else self.showDialogChooseFriend(ev);

        }, function errorCallback(response) {
            //TODO
        });
    };

    self.selectSingleplayer = function(ev) {
        self.selectedFriend = undefined;
        self.mode = 'single';

    };
})
.controller('MultiplayerDialogController', function($scope, $mdDialog, refineServices, userServices, AuthenticationService, selectedFriend){
    var self = this;

    var userId = AuthenticationService.user._id;

    self.selected = selectedFriend;

    userServices.friendsState().then(function successCallback(response) {
        self.friendsList = response.data;
    }, function errorCallback(response) {
        //TODO

    });

    self.cancel = function() {
        $mdDialog.cancel();
    };
    self.save = function() {
        $mdDialog.hide(self.selected);
    };

})
.controller('RefineDialogController', function($scope, $mdDialog, refineServices, items){
    var self = this;
    self.selectedItems = items.slice();

    refineServices.companies().then(function successCallback(response) {
        self.companies = response.data;
    }, function errorCallback(response) {
        //TODO

    });

    refineServices.areas().then(function successCallback(response) {
        self.areas = response.data;
    }, function errorCallback(response) {
        //TODO
    });

    refineServices.technologies().then(function successCallback(response) {
        self.technologies = response.data;
    }, function errorCallback(response) {
        //TODO
    });

    refineServices.general().then(function successCallback(response) {
        self.general = response.data;
    }, function errorCallback(response) {
        //TODO
    });

    self.addToSelectedItems = function(type, item){
        if(self.selectedItems.indexOf(item) === -1)
            self.selectedItems.push(item);
    }

    self.cancel = function() {
        $mdDialog.cancel();
    };
    self.save = function() {
        $mdDialog.hide(self.selectedItems);
    };

});
