angular.module('app.services', [])

.service('API', function() {

    //

})

.factory('Header', function() {

    var header = {
        state: false
    };

    var client = {
        name: ''
    };

    var nav = {
        links: []
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
        },

        title: function() {
            return client;
        },

        setTitle: function(newTitle) {
            client.name = newTitle;
        },

        links: function() {
            return nav;
        },

        setLinks: function(newLinks) {
            nav.links = newLinks;
        },

        reset: function() {
            nav.links    = [];
            client.name  = '';
            header.state = false;
        }

    }

})

.service('Auth', function($http) {

    this.attempt = function(user) {

        return $http({
            method: 'POST',
            url: 'http://localhost:8080/api/login',
            headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
            data: user
        });

    };

    this.check = false;

    this.get = {};

})

.service('User', function($http, Auth) {

    this.get = function(type) {

        return $http.get('http://localhost:8080/api/users?secret=' + Auth.get.client.secret);

    };


    this.save = function(user) {
        return $http({
            method: 'POST',
            url: 'http://localhost:8080/api/users?secret=key1',
            headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
            data: user
        });
    };

    this.destroy = function(id) {
        return $http.delete('http://localhost:8080/api/users/' + id + '?secret=' + Auth.get.client.secret);
    };

})

.service('Nugget', function($http, Auth) {

    this.get = function(type) {

        return $http.get('http://localhost:8080/api/nugget_types/' + type + '?secret=' + Auth.get.client.secret);

    };

})

.service('NuggetType', function($http, Auth) {

    this.get = function() {

        return $http.get('http://localhost:8080/api/nugget_types?secret=' + Auth.get.client.secret);

    };

});