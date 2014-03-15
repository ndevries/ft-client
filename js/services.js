angular.module('app.services', [])

.service('API', function() {

    //

})

.factory('Header', function() {

    var header = {
        state: false
    };

    return {

        get: function() {
            return header;
        },

        show: function() {
            header.state = true;
        },

        hide: function() {
            header.state = false;
        }

    }

})

.service('Auth', function($http) {

    this.attempt = function(user) {

        return $http({
            method: 'POST',
            url: 'http://localhost:8080/api/login',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
            data: user
        });

    };

    this.check = false;

})

.service('Nugget', function($http) {

    this.get = function(type) {

        return $http.get('http://localhost:8080/api/nugget_types/' + type + '?secret=key1');

    };

})

.service('NuggetType', function($http) {

    this.get = function() {

        return $http.get('http://localhost:8080/api/nugget_types?secret=key1');

    };

});