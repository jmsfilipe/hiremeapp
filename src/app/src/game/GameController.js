"use strict";
var game = angular.module('hiremeapp.game', [
    'ngMaterial'
])
.controller('GameController', function($timeout, $log, $scope, $state, $stateParams, $mdDialog, questionServices){
    var self = this;
    self.user = $stateParams.user;
    self.filters = [];
    self.fabIsOpen = false;

    console.log(self.user);

    self.showTabDialog = function(ev) {
        $mdDialog.show({
            controller: 'DialogController as dialog',
            templateUrl: "app/src/game/refineDialog.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
                items: self.filters
            }
        })
            .then(function(answer) {
            self.filters = answer;
            $state.go('index.question', {filters: self.filters});
        }, function() {
            //canceled
        });
    };
})
.controller('DialogController', function($scope, $mdDialog, refineServices, items){
    var self = this;
    self.selectedItems = items.slice();

    refineServices.companies().then(function successCallback(response) {
        self.companies = response.data;
    }, function errorCallback(response) {

    });

    refineServices.areas().then(function successCallback(response) {
        self.areas = response.data;
    }, function errorCallback(response) {

    });

    refineServices.technologies().then(function successCallback(response) {
        self.technologies = response.data;
    }, function errorCallback(response) {

    });

    self.addToSelectedItems = function(type, item){
      switch(type){
        case 'company':
          if(self.selectedItems.indexOf(item) === -1)
              self.selectedItems.push({type: 'company', content: item});
        break;
        case 'tech':
          if(self.selectedItems.indexOf(item) === -1)
              self.selectedItems.push({type: 'tech', content: item});
        break;
        case 'area':
          if(self.selectedItems.indexOf(item) === -1)
              self.selectedItems.push({type: 'area', content: item});
        break;
      }
    }

    self.cancel = function() {
        $mdDialog.cancel();
    };
    self.save = function() {
        $mdDialog.hide(self.selectedItems);
    };

});
