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
          if(typeof area === 'undefined'){
            return $http.get('/api/list_technologies');
          }
          else {
            return $http.get('/api/list_technologies/' + area);
          }
        }
    };
})
.service('questionServices', function($http){
    return {
        question : function(questionData) {
            return $http.post('/api/get_question', questionData);
        }
    };
});
