angular.module('app', [
    'ngRoute',
    'app.controllers',
    'app.services',
    'chieffancypants.loadingBar',
    'ui.bootstrap'
])

.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
})

.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    })
    .when('/test', {
        templateUrl: 'views/test.html',
        controller: 'MainCtrl'
    })
    .when('/404', {
        templateUrl: 'views/404.html'
    })
    .otherwise({redirectTo: '/404'});
});