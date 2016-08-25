"use strict";
var articles = angular.module('hiremeapp.sidebar', [
    'ngMaterial'
])
.controller('SidebarController', function(articleService, $mdSidenav, $mdBottomSheet, $timeout, $log, $scope){
    var self = this;

    self.articles        = [ ];
    self.toggleList   = toggleArticlesList;

    // Load all articles
    articleService
        .loadAllArticles()
        .then( function( articles ) {
        self.articles = articles.data;
    });

    // *********************************
    // Internal methods
    // *********************************

    /**
   * Hide or Show the 'left' sideNav area
   */
    function toggleArticlesList() {
        $mdSidenav('left').toggle();
    }

})
.service('articleService', function($http){
    return {
        loadAllArticles : function() {
            return $http.get("/api/list_articles");
        }
    };

});
