angular.module('app.controllers', [])

.controller('MainCtrl', function() {

    //

})

.controller('HomeCtrl', function($scope, $http) {

    $http.get('http://localhost:8080/api/v1/users?secret=key1').success(function(data, status) {
        $scope.users = data;
    }).error(function(data, status) {
        $scope.users = data;
    });

});