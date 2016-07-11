"use strict";
var question = angular.module('hiremeapp.question', [
    'ngMaterial'
])
.controller('QuestionController', function($timeout, $log, $scope, $state, $stateParams, questionServices){
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

    self.showQuestion(self.filters);
});
