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
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })
    .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UserCtrl'
    })
    .when('/nuggets/:slug', {
        templateUrl: 'views/nuggets.html',
        controller: 'NuggetCtrl'
    })
    .when('/test', {
        templateUrl: 'views/test.html',
        controller: 'TestCtrl'
    })
    .when('/404', {
        templateUrl: 'views/404.html'
    })
    .otherwise({redirectTo: '/404'});

})

.run(function($location, $rootScope, Auth) {

    $rootScope.$on('$routeChangeStart', function(event, next, current) {

        if (!Auth.check) {
            $location.path('/login');
        }

    });

});