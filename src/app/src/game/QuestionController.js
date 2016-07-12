"use strict";
var question = angular.module('hiremeapp.question', [
    'ngMaterial'
])
.controller('QuestionController', function($timeout, $log, $scope, $state, $stateParams, $mdDialog, questionServices){
    var self = this;
    console.log($stateParams)
    if(!$stateParams.filters) $state.go('index.game');
    self.user = $stateParams.user;
    self.filters = $stateParams.filters;
    self.question = null;
    self.answers = null;
    self.explanation = null;

    self.showNext = false;
    self.disabledAnswers = false;

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
      self.disabledAnswers = false;
      mytimeout = $timeout(self.onTimeout,TIMER);
      $scope.$watch('counter', function(nv) {
          if(nv == 10){
            self.resetTimer();
            self.showNext = true;
            $('md-card').addClass("active");
          }
      });
      var _techs = [], _areas = [], _companies = [];
      for(var i = 0; i < filter.length; i++){
        switch(filter[i].type){
          case 'company':
            _companies.push(filter[i].content.name);
          break;
          case 'tech':
            _techs.push(filter[i].content.name);
          break;
          case 'area':
            _areas.push(filter[i].content.name);
          break;
        }
      }
      questionServices.question({
        technologies: _techs,
        areas: _areas,
        companies: _companies,
        level: 1}).then(function successCallback(response) {
          self.question = response.data.question;
          self.answers = response.data.answers;
          self.explanation = response.data.explanation;
      }, function errorCallback(response) {

      });
    };

    self.evaluateAnswer = function(answer, $event){

      console.log(answer)
      if(!self.disabledAnswers){
        self.resetTimer();
        if(answer.correct){
          $($event.currentTarget).addClass("active");
          self.showSuccessDialog();
        } else{
          self.showNext = true;
          $($event.currentTarget).addClass("active");
          $('md-card.correct').addClass("active");
          self.disabledAnswers = true;
        }
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
