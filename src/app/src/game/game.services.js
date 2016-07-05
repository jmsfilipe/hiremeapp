"use strict";
var module = angular.module('hiremeapp.game')
.factory('GameService', function() {

})
.service('refineServices', function($http){
    return {
        areas : function() {
            return $http.get('/api/list_areas');
        },
        companies : function() {
            return $http.get('/api/list_companies');
        },
        technologies : function(area) {
            return $http.get('/api/list_technologies/' + area);
        }
    };
});
