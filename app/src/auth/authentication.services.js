"use strict";
angular.module('hiremeapp.auth')
    .factory('AuthenticationService', ['$state', function($state) {

        var logOut = function(){
            auth.isLogged = false;
            localStorage.setItem('JWT', undefined);
            auth.user = null;
            $state.go('signin');
        }
        var logIn = function(user, jwt){
            auth.isLogged = true;
            localStorage.setItem('JWT', jwt);
            auth.user = user;
            $state.go('index.game', { "user": user});
        }
        var updateUser = function(user){
            auth.user = user;
        }

        var auth = {
            isLogged: false,
            user: null,
            logOut: logOut,
            logIn: logIn,
            updateUser : updateUser
        }

        return auth;
    }]).service('loginServices', function($http){
    return {
        authenticate : function(userData) {
            return $http.post('/api/authenticate', userData);
        },
        validateAccount : function(userData) {
            return $http.get('/api/login/validator', {
                params: userData});
        }
    };
}).service('signupServices', ['$http', function($http){
    return {
        signUp : function(formData) {
            console.log(formData);
            return $http.post('/api/user/new', formData);
        },
        validateUser : function(userData) {
            return $http.get('/api/signup/validator', {
                params: userData});
        }
    };

}]);

