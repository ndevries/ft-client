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

    var active = {
        page: ''
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

        current: function() {
            return active;
        },

        setCurrent: function(newCurrent) {
            active.page = newCurrent;
        },

        reset: function() {
            nav.links    = [];
            client.name  = '';
            page.current = '';
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

        return $http.get(Config.url + 'users?client=' + Auth.get.client.id);

    };

    this.show = function(id) {
        return $http.get(Config.url + 'users/' + id + '?client=' + Auth.get.client.id);
    };

    this.save = function(user) {
        return $http({
            method: 'POST',
            url: Config.url + 'users?client=' + Auth.get.client.id,
            headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
            data: user
        });
    };

    this.destroy = function(id) {
        return $http.delete(Config.url + 'users/' + id + '?client=' + Auth.get.client.id);
    };

})

.service('Nugget', function($http, Auth, Config) {

    this.get = function(id) {

        return $http.get(Config.url + 'chunks/' + id + '?client=' + Auth.get.client.id);

    };

})

.service('Chunk', function($http, Auth, Config) {

    this.get = function() {

        return $http.get(Config.url + 'chunks?client=' + Auth.get.client.id);

    };

})

.service('Role', function($http, Auth, Config) {

    this.get = function() {

        return $http.get(Config.url + 'roles?client=' + Auth.get.client.id);

    };

});