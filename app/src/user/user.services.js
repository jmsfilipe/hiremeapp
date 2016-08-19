"use strict";
var module = angular.module('hiremeapp.user')
.factory('UserService', function() {

})
.service('userServices', function($http){
    return {
        getScore : function(userData){
          return $http.post('/api/user/get_score', userData);
        },
        setSettings : function(userData){
          return $http.post('/api/user/settings', userData);
        },
        updateScore : function(userData){
          return $http.post('/api/user/update_score', userData);
        },
        totalFriends : function(userData) {
            return $http.post('/api/user/total_friends', userData);
        },
        addFriend : function(userData) {
            return $http.post('/api/user/add_friend', userData);
        },
        addFriendRequest : function(userData) {
            return $http.post('/api/user/add_friend_request', userData);
        },
        removeFriendRequest : function(userData) {
            return $http.post('/api/user/remove_friend_request', userData);
        },
        listFriends : function(userData) {
            return $http.post('/api/user/list_friends', userData);
        },
        listFriendRequests : function(userData) {
            return $http.post('/api/user/list_friend_requests', userData);
        },
        search : function(userData) {
            return $http.post('/api/user/search', userData);
        },
        all : function() {
            return $http.get('/api/users');
        },
        correctQuestionScore : function(data) {
            return $http.post('/api/user/correct_question', data);
        },
        listScores : function(data) {
            return $http.post('/api/user/list_scores/', data);
        },
        getNotifications : function(data) {
            return $http.post('/api/user/notifications/', data);
        },
        addNotification : function(data) {
            return $http.post('/api/user/add_notification/', data);
        },
        registerAsOnline: function(data){
          return $http.post('/api/user/register_as_online/', data);
        },
        friendsState: function(data){
          return $http.post('/api/user/friends_state/', data);
        }
    };
});
