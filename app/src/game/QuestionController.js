"use strict";
var question = angular.module('hiremeapp.question', [
    'ngMaterial'
])
.controller('QuestionController', function($translate, $timeout, $log, $scope, $state, $stateParams, $mdDialog, AuthenticationService, questionServices, userServices, $interval){

    var self = this;
    var userId = AuthenticationService.user._id;
    var questionId;

    console.log(AuthenticationService.user)

    self.user = $stateParams.user;
    self.filters = $stateParams.filters;
    self.question = null;
    self.answers = null;
    self.explanation = null;

    self.showNext = false;
    self.disabledAnswers = false;

    if($translate.use() === "en"){
        self.lang = 0;
    } else{
        self.lang = 1;
    }

    self.counter = 1;
    self.ready = false;




    var createTimer = function(){

        self.counter = 1;

        // Iterate every 100ms, non-stop and increment
        // the Determinate loader.
        self.timer = $interval(function() {
            self.counter += 1;
            console.log(self.counter);
            if (self.counter == 100) {
                self.resetTimer();
                self.showNext = true;
                $('md-card.correct').addClass("active")
                $('md-card.incorrect').addClass("active time-up");
            }
        }, 200);


    }

    self.hitNext = function(){
        $state.reload();
    }

    self.resetTimer = function(){

        $interval.cancel(self.timer)

        self.timer = undefined;
    }

    self.showQuestion = function(filter){
        self.false = true;
        self.showNext = false;
        self.disabledAnswers = false;

        createTimer();

        var _techs = [], _areas = [], _companies = [], _general = [];
        for(var i = 0; i < filter.length; i++){
            switch(filter[i].type){
                case 'Company':
                    _companies.push(filter[i].name);
                    break;
                case 'Technology':
                    _techs.push(filter[i].name);
                    break;
                case 'Area':
                    _areas.push(filter[i].name);
                    break;
                case 'General':
                    _general.push(filter[i].name);
                    break;
            }
        }
        questionServices.question({
            technologies: _techs,
            areas: _areas,
            companies: _companies,
            general: _general,
            level: 1}).then(function successCallback(response) {
            self.question = response.data.question;
            self.answers = response.data.answers;
            self.explanation = response.data.explanation;
            self.ready = true;
            questionId = response.data._id;
        }, function errorCallback(response) {
            //TODO
        });
    };

    self.evaluateAnswer = function(answer, $event){

        console.log(answer)
        if(!self.disabledAnswers){
            self.resetTimer();
            self.showNext = true;
            if(answer.correct){
                userServices.updateScore();
                userServices.correctQuestionScore({question_id: questionId});
                self.correct = true;
            } else{
                self.showNext = true;
                $('md-card.correct').addClass("active");
                self.disabledAnswers = true;
            }
            $($event.currentTarget).addClass("active");
        }
    }

    self.showQuestion(self.filters);


    $scope.$on("$destroy", function(){
        self.resetTimer();
    });
});
