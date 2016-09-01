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
    self.selectedFriend = $stateParams.selectedFriend;
    self.question = null;
    self.answers = null;
    self.explanation = null;
    self.showNext = false;
    self.disabledAnswers = false;
    var MAX_QUESTIONS = 5;

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
            $stateParams.questionNr++;
            $state.go('index.question', {score: $stateParams.score,
                                         questions: $stateParams.questions,
                                         mode: "multi",
                                         questionNr: $stateParams.questionNr}, { reload: true });
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

        $stateParams.questions = [];
        for(var i = 0; i < MAX_QUESTIONS; i++){
            questionServices.question({
                technologies: _techs,
                areas: _areas,
                companies: _companies,
                general: _general,
                level: 1}).then(function successCallback(response) {
                $stateParams.questions.push({
                    question: response.data.question,
                    answers: response.data.answers,
                    explanation: response.data.explanation,
                    id: response.data._id
                })

                self.question = $stateParams.questions[0].question;
                self.answers = $stateParams.questions[0].answers;
                self.explanation = $stateParams.questions[0].explanation;
            }, function errorCallback(response) {
                //TODO
            });
        }

        self.createTimer();
        self.ready = true;
    }

    self.showTheEndDialog = function(score){

        $mdDialog.show({
            controller: 'TheEndDialogController as dialog',
            templateUrl: "app/src/game/view/theEndDialog.html",
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            locals: {
                score: score
            }
        })
            .then(function(response) {

            $state.go('index.game');

        }, function errorCallback(response) {
            $state.go('index.game');
        });


    }

    self.showWinnerLoserDialog = function(score, friend){

        $mdDialog.show({
            controller: 'WinnerLoserDialogController as dialog',
            templateUrl: "app/src/game/view/winnerLoserDialog.html",
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            locals: {
                score: score.score,
                enemyScore: score.enemyScore,
                friend : friend
            }
        })
            .then(function(response) {

            $state.go('index.game');

        }, function errorCallback(response) {
            $state.go('index.game');
        });


    }

    self.evaluateAnswer = function(answer, $event){

        if(!self.disabledAnswers){
            self.resetTimer();
            self.showNext = true;
            if(answer.correct){
                userServices.updateScore();
                userServices.correctQuestionScore({question_id: questionId});
                self.correct = true;
                $stateParams.score++;
                console.log($stateParams.score)
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

            if($stateParams.questionNr == (MAX_QUESTIONS)){ //the end
                self.showTheEndDialog($stateParams.score);
                if(!$stateParams.enemyScore){
                    var pusher = new Pusher('5ae72eeb02c097ac4523', {
                        cluster: 'eu',
                        encrypted: true
                    });

                    var channel = pusher.subscribe("private-"+self.selectedFriend._id);
                    channel.bind('pusher:subscription_succeeded', function() {
                        var triggered = channel.trigger("client-game-request", { "enemyScore": $stateParams.score, "questions": $stateParams.questions, "user": AuthenticationService.user });
                    });
                } else{
                    self.showWinnerLoserDialog({enemyScore:$stateParams.enemyScore, score: $stateParams.score}, self.selectedFriend.name);
                }
            } else{

                self.question = $stateParams.questions[$stateParams.questionNr].question;
                self.answers = $stateParams.questions[$stateParams.questionNr].answers;
                self.explanation = $stateParams.questions[$stateParams.questionNr].explanation;
                self.createTimer();
                self.ready = true;
            }

        } else{
            self.showMultiplayerQuestion(self.filters);
        }
    }




    $scope.$on("$destroy", function(){
        self.resetTimer();
    });
})
.controller('TheEndDialogController', function($scope, $mdDialog, userServices, AuthenticationService, score){
    var self = this;

    var userId = AuthenticationService.user._id;

    self.score = score;
    self.stars = new Array(score);
    self.empty = new Array(5 - score);
    self.cancel = function() {
        $mdDialog.cancel();
    };
    self.save = function() {
        $mdDialog.hide(score);
    };

})
.controller('WinnerLoserDialogController', function($scope, $mdDialog, userServices, AuthenticationService, score, enemyScore, friend){
    var self = this;

    var userId = AuthenticationService.user._id;

    self.score = score;
    self.enemyScore = enemyScore;
    self.friend = friend;

    self.cancel = function() {
        $mdDialog.cancel();
    };
    self.save = function() {
        $mdDialog.hide(score);
    };

});
