"use strict";
var module = angular.module('hiremeapp.services', [

])
    .service('commonServices', function($http){
    return {
        addLocation : function(data) {
            return $http.post('/api/location/', data);
        },
    };
})
;
