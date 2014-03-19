angular.module('app', [
    'ngRoute',
    'ngAnimate',
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
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })
    .when('/logout', {
        template: '',
        controller: 'LogoutCtrl'
    })
    .when('/users', {
        templateUrl: 'views/users/index.html',
        controller: 'UserCtrl'
    })
    .when('/users/create', {
        templateUrl: 'views/users/create.html',
        controller: 'UserCreateCtrl'
    })
    .when('/users/:id', {
        templateUrl: 'views/users/show.html',
        controller: 'UserShowCtrl'
    })
    .when('/users/:id/edit', {
        templateUrl: 'views/users/edit.html',
        controller: 'UserEditCtrl'
    })
    .when('/nuggets/:id', {
        templateUrl: 'views/nuggets/index.html',
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