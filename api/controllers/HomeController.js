'use strict';

angular.module('kinderApp')
.controller('HomeController', ['$scope', 'routing', 'localStorage', '$http', '$rootScope', function ($scope, routing, localStorage, $http, $rootScope) {

    localStorage.init();
    var cart = 'cart';

    $scope.itemsToDisplay = [];

    $http.get($rootScope.apiURL + '/kinders').then(function (res) {
        $scope.itemsToDisplay = res.data.data;
    }, function (error) {
        console.log(error);
    });

    $scope.goTo = function (reference) {
        routing.changeURL(reference);
    };

    $scope.get = function () {
        console.log(localStorage.get(cart));
    };

}]);