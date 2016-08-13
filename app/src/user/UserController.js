"use strict";
var game = angular.module('hiremeapp.user', [
    'ngMaterial'
])
.controller('UserController', function($mdDialog, $state, userServices, AuthenticationService){
    var self = this;

    self.totalFriends = 0;
    self.friendsList = [];
    self.score = 0;
    self.user = AuthenticationService.user;

    var userId = AuthenticationService.user._id;
    self.userName = AuthenticationService.user.name;



    userServices.listFriends({user_id: userId}).then(function successCallback(response) {
        self.friendsList = response.data.friends;
        self.totalFriends = response.data.friends.length;
        console.log(response.data.friends.length);
    }, function errorCallback(response) {
        //TODO
    });

    userServices.getScore({user_id: userId}).then(function successCallback(response) {
        self.score = response.data.score;
    }, function errorCallback(response) {
        //TODO
    });

    userServices.listScores({user_id: userId}).then(function successCallback(response) {
        self.scores = response.data;
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
                    self.totalFriends = response.data.friends.length;
                }, function errorCallback(response) {
                    //TODO
                });
            }, function() {

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
            //TODO
        });
    });

    self.addFriend = function(friend, ev){
        userServices.addFriend({user_id: userId, user_to_add_id: friend._id}).then(function successCallback(response) {
            userServices.search({term: $scope.searchInput, user_id: userId}).then(function successCallback(response) {
                self.friendsList = response.data;
            }, function errorCallback(response) {
                //TODO
            });
        }, function errorCallback(response) {
            //TODO
        });
    }

    self.close = function() {
        $mdDialog.hide();
    };

})

.controller('SettingsController', function($translate, $scope, $mdDialog, $state, userServices, AuthenticationService){
    var self = this;

    self.user = {
        email: "",
        password: "",
        gender: ""
    }

    self.language = $translate.use();

    self.changeLanguage = function (langKey) {
        self.language = langKey;
    };

    var userId = AuthenticationService.user._id;
    self.user.email = AuthenticationService.user.email;
    self.user.gender = AuthenticationService.user.gender;

    self.updateSettings = function(){
        $translate.use(self.language);
        var pwd = "";
        if(self.user.password == ""){
            pwd = AuthenticationService.user.password;
        } else{
            pwd = self.user.password;
        }
        userServices.setSettings({user_id: userId, password: pwd, email: self.user.email, gender: self.user.gender}).then(function successCallback(response) {
            $state.go("index.home");
        }, function errorCallback(response) {
            //TODO
        });
    }

});
