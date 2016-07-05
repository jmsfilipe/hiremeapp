"use strict";
var game = angular.module('hiremeapp.game', [
    'ngMaterial'
])
.controller('GameController', function($timeout, $log, $scope, $state, $stateParams, $mdDialog){
    var self = this;
    self.user = $stateParams.user;


    console.log(self.user);

    self.showTabDialog = function(ev) {
        $mdDialog.show({
            controller: 'DialogController as dialog',
            templateUrl: "app/src/game/refineDialog.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        })
            .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
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
.controller('DialogController', function($scope, $mdDialog){
        var self = this;
    this.companies = ['Google', 'Bimk', 'Helpr', 'LandingJobs', 'INM', 'Talkdesk', 'Uniplaces', 'Cooc', 'xixi'];
    
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
});

