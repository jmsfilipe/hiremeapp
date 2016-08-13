"use strict";
angular.module('hiremeapp.auth')
.controller('LoginController', ['loginServices', '$state', 'AuthenticationService', function(loginServices, $state,  AuthenticationService){
    var self = this;

    //mock user
    self.user = {
        email: "teste@mail.com",
        password: "123a<"
    }

    self.signIn = function(form, userData){
        loginServices.authenticate(userData).then(function successCallback(response) {

            if(response.data.success){
                AuthenticationService.logIn(response.data.user, response.data.jwt) ;
                $state.go('index.game', { "user": response.data.user});
            }
            else switch(response.data.code){
                case 'InvalidUser':
                    form.email.$setValidity("registered", false);
                    break;
                case 'AuthenticationFailed':
                    form.password.$setValidity("invalid", false);
                    break;
                default:
                    break;
            }
        }, function errorCallback(response) {
            //TODO
        });
    }

    // *********************************
    // Internal methods
    // *********************************

}]);