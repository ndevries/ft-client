angular.module('app.services', [])

.service('Config', function() {

    this.url = 'http://localhost:8080/';

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

.service('Auth', function($http, Config) {

    this.attempt = function(user) {

        return $http({
            method: 'POST',
            url: Config.url + 'login',
            headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
            data: user
        });

    };

    this.check = false;

    this.get = {};

})

.service('User', function($http, Auth, Config) {

    this.get = function(type) {

        return $http.get(Config.url + 'users?secret=' + Auth.get.client.secret);

    };

    this.show = function(id) {
        return $http.get(Config.url + 'users/' + id + '?secret=' + Auth.get.client.secret);
    };

    this.save = function(user) {
        return $http({
            method: 'POST',
            url: Config.url + 'users?secret=' + Auth.get.client.secret,
            headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
            data: user
        });
    };

    this.destroy = function(id) {
        return $http.delete(Config.url + 'users/' + id + '?secret=' + Auth.get.client.secret);
    };

})

.service('Nugget', function($http, Auth, Config) {

    this.get = function(type) {

        return $http.get(Config.url + 'nugget_types/' + type + '?secret=' + Auth.get.client.secret);

    };

})

.service('NuggetType', function($http, Auth, Config) {

    this.get = function() {

        return $http.get(Config.url + 'nugget_types?secret=' + Auth.get.client.secret);

    };

})

.service('Role', function($http, Auth, Config) {

    this.get = function() {

        return $http.get(Config.url + 'roles?secret=' + Auth.get.client.secret);

    };

});