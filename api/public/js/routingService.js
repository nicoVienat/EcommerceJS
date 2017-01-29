'use strict';

angular.module('kinderApp')
.service('routing', ['$location', function ($location) {

    this.changeURL = function (path) {
        if (path === 'cart') {
            $location.path('/cart');
        }
        else if (path === 'home') {
            $location.path('/');
        }
        else {
            $location.path('/article/' + path);
        }
    };

}]);
