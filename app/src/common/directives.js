"use strict";
var users = angular.module('hiremeapp.directives', [
    'ngMaterial',
    'ngMessages'

]).directive('resetOnChange', function (loginServices) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {

            var toReset = (scope.$eval(attrs.resetOnChange) instanceof Array) 
            ? scope.$eval(attrs.resetOnChange) 
            : [attrs.resetOnChange];

            $(elem).on('keyup', function () {

                loginServices.validateAccount({email: elem.val()})
                    .then(function successCallback(response) {


                    for(var x in toReset)
                        ctrl.$setValidity(toReset[x], true);

                }, function errorCallback(response) {

                });



            });
        }
    }
}).directive('ngDisablePaste', function(){
    return {
        scope: {},
        link:function(scope,element){
            element.on('paste', function (event) {
                event.preventDefault();
            });
        }
    };
});