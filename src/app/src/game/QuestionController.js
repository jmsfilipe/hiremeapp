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

    self.showNext = false;

    $scope.counter = 1;
    var mytimeout = 1;
    var TIMER = 1000;

    self.onTimeout = function(){
      $scope.counter++;
      mytimeout = $timeout(self.onTimeout,TIMER);
    }

    self.hitNext = function(){
      $state.reload();
    }

    self.resetTimer = function(){
      $timeout.cancel(mytimeout);
      $scope.counter = 1;
    }

    self.showQuestion = function(filter){
      self.showNext = false;
      mytimeout = $timeout(self.onTimeout,TIMER);
      $scope.$watch('counter', function(nv) {
        console.log(nv)
          if(nv == 10){
            self.resetTimer();
            self.showNext = true;
            $('md-card').addClass("active");
          }
      });
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
        $($event.currentTarget).addClass("active");
        self.showSuccessDialog();
      } else{
        $($event.currentTarget).addClass("active");
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
            self.resetTimer();
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
