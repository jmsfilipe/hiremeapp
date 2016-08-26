"use strict";
var question = angular.module('hiremeapp.question', [
    'ngMaterial'
])
.controller('QuestionController', function($translate, $timeout, $log, $scope, $state, $stateParams, $mdDialog, AuthenticationService, questionServices, userServices, $interval){

    var self = this;
    var userId = AuthenticationService.user._id;
    var questionId;

    self.user = $stateParams.user;
    self.filters = $stateParams.filters;
    self.mode = $stateParams.mode;
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


    self.createTimer = function(){

        self.counter = 1;

        // Iterate every 100ms, non-stop and increment
        // the Determinate loader.
        self.timer = $interval(function() {
            self.counter += 1;
            if (self.counter == 100) {
                self.resetTimer();
                self.showNext = true;
                $('md-card.correct').addClass("active")
                $('md-card.incorrect').addClass("active time-up");
            }
        }, 200);


    }

    self.hitNext = function(){
        if(self.mode == "single"){
            $state.reload();
        } else{
            self.questionNr++;
            $state.go('index.question', {questions: self.questions,
                                         mode: "multi",
                                         questionNr: self.questionNr}, { reload: true });
        }
    }

    self.resetTimer = function(){

        $interval.cancel(self.timer)
        self.timer = undefined;
    }

    self.showQuestion = function(filter){
        self.false = true;
        self.showNext = false;
        self.disabledAnswers = false;

        self.createTimer();

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

    self.showMultiplayerQuestion = function(filter){
        var MAX_QUESTIONS = 5;
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

        self.questions = [];
        for(var i = 0; i < MAX_QUESTIONS; i++){
            questionServices.question({
                technologies: _techs,
                areas: _areas,
                companies: _companies,
                general: _general,
                level: 1}).then(function successCallback(response) {
                    self.questionNr = 0;
                    self.questions.push({
                        question: response.data.question,
                        answers: response.data.answers,
                        explanation: response.data.explanation,
                        id: response.data._id
                    })

                    self.question = self.questions[self.questionNr].question;
                    self.answers = self.questions[self.questionNr].answers;
                    self.explanation = self.questions[self.questionNr].explanation;
                }, function errorCallback(response) {
                    //TODO
                });
        }

        self.createTimer();
        self.ready = true;
    }


    self.evaluateAnswer = function(answer, $event){

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

    if(self.mode == "single"){
        self.showQuestion(self.filters);
    } else{
        if($stateParams.questions){
            self.question = $stateParams.questions[$stateParams.questionNr].question;
            self.answers = $stateParams.questions[$stateParams.questionNr].answers;
            self.explanation = $stateParams.questions[$stateParams.questionNr].explanation;
            self.createTimer();
            self.ready = true;
        } else{
            self.showMultiplayerQuestion(self.filters);
        }
    }

    $scope.$on("$destroy", function(){
        self.resetTimer();
    });
});
