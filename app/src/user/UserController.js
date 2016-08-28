"use strict";
var game = angular.module('hiremeapp.user', [
    'ngMaterial'
])
.controller('UserController', function($mdDialog, $state, $stateParams, userServices, AuthenticationService){
    var self = this;

    self.user = $stateParams.user? $stateParams.user : AuthenticationService.user;
    self.allowEdit = !$stateParams.user || $stateParams.user._id == AuthenticationService.user._id ;

    self.goToFriendPage = function(friend){
        $state.go('index.friend', {user: friend, userId: friend.email});
    }

    var userId = self.user._id;
    userServices.listFriends({user_id: userId}).then(function successCallback(response) {
        self.user.friends = response.data.friends;
    }, function errorCallback(response) {
        //TODO
    });


    self.getColorClass = function(score){
        if(score < 6){
            return "intern";
        } else if(score < 20){
            return "junior";
        } else{
            return "senior";
        }
    }


    self.showFriendsDialog = function(ev){

        userServices.listFriends({user_id: userId}).then(function successCallback(response) {
            self.user.friends = response.data.friends;

            $mdDialog.show({
                controller: 'FriendsDialogController as dialog',
                templateUrl: "app/src/user/view/friendsDialog.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: {
                    friends: self.user.friends
                }
            })
                .then(function() {
                userServices.listFriends({user_id: userId}).then(function successCallback(response) {
                    self.user.friends = response.data.friends;
                }, function errorCallback(response) {
                    //TODO
                });
            }, function() {

            });

        }, function errorCallback(response) {

        });


    }

})
.controller('FriendsDialogController', function($scope, $mdDialog, userServices, AuthenticationService, friends){
    var self = this;

    var pusher = new Pusher('5ae72eeb02c097ac4523', {
        cluster: 'eu',
        encrypted: true
    });
    self.searchInput = '';
    self.friendsList = friends;

    var userId = AuthenticationService.user._id;
    var userName = AuthenticationService.user.name;

    $scope.$watch(function () {return self.searchInput}, function() {
        userServices.search({term: self.searchInput, user_id: userId}).then(function successCallback(response) {
            self.friendsList = response.data;
        }, function errorCallback(response) {
            //TODO
        });
    });

    self.askFriend = function(friend, ev){

        if(!friend.pending){
            userServices.addFriendRequest({user_to_add_id: friend._id});

            friend.pending = true;

            var channel = pusher.subscribe("private-"+friend._id);
            channel.bind('pusher:subscription_succeeded', function() {
                var triggered = channel.trigger("client-friend-request", { "name": userName, "_id": userId });
            });

        }

    }

    self.close = function() {
        $mdDialog.hide();
    };

})

.controller('SettingsController', function($translate, $scope, $mdDialog, $state, userServices, AuthenticationService){
    var self = this;

    self.language = $translate.use();

    self.changeLanguage = function (langKey) {
        self.language = langKey;
    };

    var userId = AuthenticationService.user._id;
    self.user = AuthenticationService.user;

    self.updateSettings = function(){
        $translate.use(self.language);
        userServices.setSettings({password: self.user.password, email: self.user.email, gender: self.user.gender}).then(function successCallback(response) {
            $state.go("index.game");
        }, function errorCallback(response) {
            //TODO
        });
    }

});
