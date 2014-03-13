angular.module('app.controllers', [])

.controller('MainCtrl', function($scope, $http, $rootScope, $location) {

    $scope.client = 'FastTribe';

    $http.get('http://localhost:8080/api/v1/nugget_types?secret=key1').success(function(data, status) {
        $scope.items = data;
    }).error(function(data, status) {
        $scope.items = data;
    });

})

.controller('LoginCtrl', function($scope, $http, User, $location) {

    $scope.user = {};

    $scope.login = function() {

        $http.post('http://localhost:8080/api/v1/users/login?secret=key1', $scope.user, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function(data, status) {
            User.auth = true;
            $scope.message = data;
        }).error(function(data, status) {
            $scope.message = data;
        });

    }

})

.controller('HomeCtrl', function($scope, $http) {

    $http.get('http://localhost:8080/api/v1/users?secret=key1').success(function(data, status) {
        $scope.users = data;
    }).error(function(data, status) {
        $scope.users = data;
    });

})

.controller('NuggetCtrl', function($scope, $http, $routeParams) {

    $scope.page = $routeParams.slug;

    $http.get('http://localhost:8080/api/v1/users?secret=key1').success(function(data, status) {
        $scope.users = data;
    }).error(function(data, status) {
        $scope.users = data;
    });

});