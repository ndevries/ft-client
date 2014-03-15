angular.module('app.controllers', [])

.controller('MainCtrl', function($scope) {

    //

})

.controller('HeaderCtrl', function($scope, $http, Header, NuggetType) {

    $scope.client = 'FastTribe';

    $scope.header = Header.get();

    NuggetType.get()
        .success(function(data) {
            $scope.items = data;
        });

})

.controller('LoginCtrl', function($scope, $http, $location, Auth, Header) {

    $scope.user = {};

    $scope.login = function() {

        Auth.attempt($scope.user)
            .success(function(data) {
                $scope.message = '';
                Auth.check = true;
                $location.path('/');
            })
            .error(function(data) {
                $scope.message = data;
            });

    };


})

.controller('HomeCtrl', function($scope, $http, Header) {

    Header.show();

})

.controller('NuggetCtrl', function($scope, $http, $routeParams, Nugget) {

    $scope.page = $routeParams.slug;

    Nugget.get($scope.page)
        .success(function(data) {
            $scope.nuggets = data;
        });

})

.controller('TestCtrl', function($scope, Auth) {

    $scope.test = Auth.check;

});
