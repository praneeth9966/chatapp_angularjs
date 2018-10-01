var chatApp = angular.module('chatApp', ['ui.router','btford.socket-io']);

chatApp.config(function ($stateProvider, $urlRouterProvider) {
   
    $urlRouterProvider.otherwise('/Registration');// by default it will go to registration state
                                                  //if any state is not present                                                                        
    $stateProvider
         // REGISTRATION STATES AND NESTED VIEWS ========================================
        .state('Registration', {
            url: '/Registration',
            templateUrl: 'template/Registration.html',
            controller: 'registrationCntrl'
        })
         // LOGIN STATES AND NESTED VIEWS ========================================
        .state('login', {
            url: '/login',
            templateUrl: 'template/login.html',
            controller: 'loginCntrl'
        })
         // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'template/home.html',
            controller: 'homeCntrl'
        })        
});

chatApp.service('SocketService',['socketFactory',function SocketService(socketFactory){
    return socketFactory({
        ioSocket:io.connect('http://localhost:8080')
    });
}]);