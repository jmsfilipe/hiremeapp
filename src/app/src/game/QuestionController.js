"use strict";
var question = angular.module('hiremeapp.question', [
    'ngMaterial'
])
.controller('QuestionController', function($timeout, $log, $scope, $state, $stateParams, $mdDialog, AuthenticationService, questionServices, userServices, $interval){
    var self = this;
    var userId = AuthenticationService.user._id;
    console.log($stateParams)
    if(!$stateParams.filters) $state.go('index.home');
    self.user = $stateParams.user;
    self.filters = $stateParams.filters;
    self.question = null;
    self.answers = null;
    self.explanation = null;

    self.showNext = false;
    self.disabledAnswers = false;


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
                $('md-card').addClass("active");
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
            self.ready = true;
        }, function errorCallback(response) {

        });
    };

    self.evaluateAnswer = function(answer, $event){

        console.log(answer)
        if(!self.disabledAnswers){
            self.resetTimer();
                  self.showNext = true;
            if(answer.correct){
                $($event.currentTarget).addClass("active");
                userServices.updateScore({user_id: userId});
               // self.showSuccessDialog();
          
                self.correct = true;
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
