/// <reference path="C:\Users\Henry\Dropbox\dev\AngularTest\AngularTest\Scripts/angular.js" />


(function () {
    var app = angular.module('myApp', ['ngRoute']);

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'GameOfFifteenController',
                templateUrl: '/app/views/gameoffifteen.html'
            })
            .when('/gameof15', {
                controller: 'GameOfFifteenController',
                templateUrl: '/app/views/gameoffifteen.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
}());