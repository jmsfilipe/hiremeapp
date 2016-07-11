"use strict";
var game = angular.module('hiremeapp.game', [
    'ngMaterial'
])
.controller('GameController', function($timeout, $log, $scope, $state, $stateParams, $mdDialog){
    var self = this;
    self.user = $stateParams.user;
    self.filters = [];

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
})
.controller('ChooseAreaAndTechController', function(){
    var self = this;

    self.toggleList   = toggleUsersList;

    function toggleUsersList() {
        $mdSidenav('left').toggle();
    }
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

    self.addToSelectedItems = function(item){
        if(self.selectedItems.indexOf(item) === -1)
            self.selectedItems.push(item);
    }

    self.cancel = function() {
        $mdDialog.cancel();
    };
    self.save = function() {
        $mdDialog.hide(self.selectedItems);
    };

});
