"use strict";
var module = angular.module('hiremeapp.user')
.factory('UserService', function() {

})
.service('userServices', function($http){
    return {
        totalFriends : function(userData) {
            return $http.post('/api/user/total_friends', userData);
        },
        addFriend : function(userData) {
            return $http.get('/api/user/add_friend', userData);
        },
        all : function() {
            return $http.get('/api/users');
        }
    };
});
