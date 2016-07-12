"use strict";
var question = angular.module('hiremeapp.question', [
    'ngMaterial'
])
.controller('QuestionController', function($timeout, $log, $scope, $state, $stateParams, $mdDialog, questionServices){
    var self = this;
    self.user = $stateParams.user;
    self.filters = [];
    self.question = null;
    self.answers = null;
    self.explanation = null;

    self.showQuestion = function(filter){
      questionServices.question('web','javascript',1).then(function successCallback(response) {
          self.question = response.data.question;
          self.answers = response.data.answers;
          self.explanation = response.data.explanation;
          console.log(self);
      }, function errorCallback(response) {

      });
    };

    self.evaluateAnswer = function(answer, $event){
      if(answer.correct){
        $($event.currentTarget).css("background-color", "green");
        self.showSuccessDialog();
      } else{
        $($event.currentTarget).css("background-color", "red");
      }
    }

    self.showSuccessDialog = function(ev) {

        $mdDialog.show({
            controller: 'SuccessDialogController as dialog',
            templateUrl: "app/src/game/successDialog.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        })
            .then(function(answer) {
              console.log("ANOTHER")
            self.showQuestion(self.filters);
        }, function() {
            //canceled
        });
    };

    self.showQuestion(self.filters);
})
.controller('SuccessDialogController', function($scope, $mdDialog){
    var self = this;

    self.cancel = function() {
        $mdDialog.cancel();
    };
    self.save = function() {
        $mdDialog.hide();
    };
});
