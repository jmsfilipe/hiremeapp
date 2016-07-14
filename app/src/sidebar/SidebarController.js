"use strict";
var articles = angular.module('hiremeapp.sidebar', [
  'ngMaterial'
])
.controller('SidebarController', function(articleService, $mdSidenav, $mdBottomSheet, $timeout, $log, $scope){
  var self = this;

  self.selected     = null;
  self.articles        = [ ];
  self.selectArticle   = selectArticle;
  self.toggleList   = toggleArticlesList;
  self.makeContact  = makeContact;

  // Load all articles

  articleService
        .loadAllArticles()
        .then( function( articles ) {
          console.log(articles)
          self.articles    = [].concat(articles.data);
          self.selected = articles[0];
          console.log(self.articles)
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

  /**
   * Select the current avatars
   * @param menuId
   */
  function selectArticle ( article ) {
    self.selected = angular.isNumber(article) ? $scope.articles[article] : article;
  }

  /**
   * Show the Contact view in the bottom sheet
   */
  function makeContact(selectedArticle) {

      $mdBottomSheet.show({
        controllerAs  : "vm",
        templateUrl   : './src/users/view/contactSheet.html',
        controller    : [ '$mdBottomSheet', ContactSheetController],
        parent        : angular.element(document.getElementById('content'))
      }).then(function(clickedItem) {
        $log.debug( clickedItem.name + ' clicked!');
      });

      /**
       * User ContactSheet controller
       */
      function ContactSheetController( $mdBottomSheet ) {
        this.article = selectedArticle;
        this.items = [
          { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
          { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
          { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
          { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
        ];
        this.contactArticle = function(action) {
          // The actually contact process has not been implemented...
          // so just hide the bottomSheet

          $mdBottomSheet.hide(action);
        };
      }
  }
})
.service('articleService', function($http){
  return {
    loadAllArticles : function() {
      return $http.get("/api/list_articles");
    }
  };

});
