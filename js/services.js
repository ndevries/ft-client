angular.module('app.services', [])

.factory('User', function() {
    var sdo = {
        auth: false
    };
    return sdo;
});