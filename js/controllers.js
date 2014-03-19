angular.module('app.controllers', [])

.controller('HeaderCtrl', function($scope, $location, Header) {

    $scope.client = Header.title();
    $scope.header = Header.get();
    $scope.nav    = Header.links();

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.change = function(page) {
        Header.setCurrent(page);
    };

})

.controller('LoginCtrl', function($scope, $location, Auth, Header, Chunk) {

    $scope.user = {};
    $scope.user.email = localStorage['email'];

    $scope.login = function() {

        Auth.attempt($scope.user)
            .success(function(data) {
                $scope.message = '';
                Auth.check = true;
                Auth.get = data;
                Header.setTitle(Auth.get.client.name);
                Chunk.get()
                    .success(function(data) {
                        Header.setLinks(data);
                        Header.show();
                    })
                    .error(function(data) {
                        Header.show();
                    });
                localStorage['email'] = $scope.user.email;
                $location.path('/');
                $scope.user.password = '';
            })
            .error(function(data) {
                $scope.message = data;
                $scope.user.password = '';
            });

    };

})

.controller('LogoutCtrl', function($location, Auth, Header) {

    Header.reset();
    Auth.check = false;
    Auth.get = {};
    $location.path('/login');

})

.controller('DashboardCtrl', function($scope) {

    //

})

.controller('UserCtrl', function($scope, User) {

    User.get()
        .success(function(data) {
            $scope.users = data;
        });

    $scope.remove = function(id) {

        User.destroy(id)
            .success(function(data) {
                $scope.message = data;
            })
            .error(function(data) {
                $scope.message = data;
            });

    };

})

.controller('UserCreateCtrl', function($scope, User) {

    $scope.user = {};

    $scope.create = function() {

        if ($scope.user.password == $scope.confirm) {
            $scope.error = '';
            User.save($scope.user)
                .success(function(data) {
                    $scope.errors = '';
                    $scope.success = 'User added.';
                    $scope.user = {};
                    $scope.confirm = '';
                })
                .error(function(data) {
                    $scope.success = '';
                    $scope.errors = data;
                });
        } else {
            $scope.errors = '';
            $scope.success = '';
            $scope.error = 'Passwords must match.';
        }

    };

})

.controller('UserEditCtrl', function($scope, $routeParams, User, Role) {

    Role.get()
        .success(function(data) {
            $scope.roles = data;
        })

    User.show($routeParams.id)
        .success(function(data) {
            $scope.user = data;
        });

    $scope.create = function() {

        if ($scope.user.password == $scope.confirm) {
            $scope.error = '';
            User.save($scope.user)
                .success(function(data) {
                    $scope.errors = '';
                    $scope.success = 'User added.';
                    $scope.user = {};
                    $scope.confirm = '';
                })
                .error(function(data) {
                    $scope.success = '';
                    $scope.errors = data;
                });
        } else {
            $scope.error = 'Passwords must match.';
        }

    };

})

.controller('UserShowCtrl', function($scope, $routeParams, User) {

    //

})

.controller('NuggetCtrl', function($scope, $routeParams, $location, Nugget, Header) {

    $scope.page = Header.current().page;

    Nugget.get($routeParams.id)
        .success(function(data) {
            $scope.nuggets = data;
        })
        .error(function(data) {
            $location.path('/404');
        });

})

.controller('TestCtrl', function($scope, Auth) {

    $scope.test = Auth.check;

});
