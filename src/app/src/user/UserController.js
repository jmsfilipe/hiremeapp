"use strict";
var game = angular.module('hiremeapp.user', [
    'ngMaterial'
])
.controller('UserController', function($mdSidenav, userServices){
    var self = this;

    self.toggleList   = toggleUsersList;


    self.getAll = function(){
        // Load all articles

        userServices.all()
            .then(function successCallback(response) {
        }, function errorCallback(response) {
           
        });




    }

    function toggleUsersList() {
        $mdSidenav('left').toggle();
    }
}).service('userServices', function($http){
    return {
        all : function() {
            return $http.get('/api/users');
        }
    };

});;
