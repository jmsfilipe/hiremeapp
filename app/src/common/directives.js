"use strict";
var users = angular.module('hiremeapp.directives', [
    'ngMaterial',
    'ngMessages'

]).directive('ngChangeValidate', function (loginServices, $parse) {
    return {
        require: '^form',
        restrict: 'A',
        priority: 1,
        scope: {
            'ngChangeValidate' : '&'
        },
        link: function (scope, elem, attrs, ctrl) {
            console.log(ctrl);

            var ngMessages = (scope.$eval(attrs.ngChangeValidate) instanceof Array) ? scope.$eval(attrs.ngChangeValidate) 
            : [attrs.ngChangeValidate];

            $(elem).on('keyup', function () {

                for (var index in ngMessages)
                    ctrl[ngMessages[index]].$setValidity('invalid', true);
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