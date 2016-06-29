"use strict";
var users = angular.module('hiremeapp.landing', [
    'ngMaterial',
    'ngMessages'

])
.controller('LandingController', function( $timeout, $log, $scope){
    var self = this;


    self.user = {
        name: "",
        email: "",
        password: ""
    }

    self.signUp = function(user){
        console.log(user);
    }




    // *********************************
    // Internal methods
    // *********************************



}).directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {

            var firstPassword = '#' + attrs.pwCheck;
            $(elem).add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val()===$(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        }
    }
}]).directive('ngDisablePaste', function(){
    return {
        scope: {},
        link:function(scope,element){
            element.on('paste', function (event) {
                event.preventDefault();
            });
        }
    };
});;