"use strict";
var game = angular.module('hiremeapp.game', [
    'ngMaterial',
    'ngAnimate'
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

        }, function() {
            //canceled
        });
    };

    self.start = function(){

        $state.go('index.question', {filters: self.filters});
    }
    
    self.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.body))
        .clickOutsideToClose(true)
        .title('Multiplayer')
        .textContent('Sorry, this feature is not yet available. Coming soon! ')
        .ariaLabel('Multiplayer')
        .ok('Got it!')
        .targetEvent(ev)
    );
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

    refineServices.general().then(function successCallback(response) {
        self.general = response.data;
    }, function errorCallback(response) {

    });

    self.addToSelectedItems = function(type, item){
        switch(type){
            case 'company':
                item.type = 'company';
                if(self.selectedItems.indexOf(item) === -1)
                    self.selectedItems.push(item);
                break;
            case 'tech':
                item.type = 'tech';
               if(self.selectedItems.indexOf(item) === -1)
                    self.selectedItems.push(item);
                break;
            case 'area':
                item.type = 'area';
             if(self.selectedItems.indexOf(item) === -1)
                    self.selectedItems.push(item);
                break;
            case 'general':
                item.type = 'general';
             if(self.selectedItems.indexOf(item) === -1)
                    self.selectedItems.push(item);
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
