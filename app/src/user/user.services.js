"use strict";
var module = angular.module('hiremeapp.user')
    .factory('UserService', function() {

})
    .service('userServices', function($http){
    return {
        getSelf : function(userData){
            return $http.get('/api/user/self');
        },
        getScore : function(userData){
            return $http.get('/api/user/get_score', {
                params: userData});
        },
        setSettings : function(userData){
            return $http.post('/api/user/settings', userData);
        },
        updateScore : function(userData){
            return $http.post('/api/user/update_score');
        },
        totalFriends : function(userData) {
            return $http.get('/api/user/total_friends', {
                params: userData});
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
            return $http.get('/api/user/list_friends',{
                params: userData});
        },
        listFriendRequests : function(userData) {
            return $http.get('/api/user/list_friend_requests');
        },
        search : function(userData) {
            return $http.get('/api/user/search', {
                params: userData});
        },
        all : function() {
            return $http.get('/api/users');
        },
        correctQuestionScore : function(data) {
            return $http.post('/api/user/correct_question', data);
        },
        listScores : function(data) {
            return $http.get('/api/user/list_scores/', {
                params: userData});
        },
        getNotifications : function(data) {
            return $http.post('/api/user/notifications/', data);
        },
        addNotification : function(data) {
            return $http.post('/api/user/add_notification/', data);
        },
        registerAsOnline: function(data){
            return $http.post('/api/user/register_as_online/');
        },
        friendsState: function(data){
            return $http.get('/api/user/friends_state/');
        }
    };
});
