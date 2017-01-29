'use strict';

angular.module('kinderApp')
.directive('headerTop', [function () {
    return {
        templateUrl: 'views/header.html',
        restrict: 'E',
        controller: ['$scope', 'routing', 'localStorage', function ($scope, routing, localStorage) {
            var cart = 'cart';
            $scope.itemsInCart = localStorage.get(cart);
            $scope.numberOfItems = localStorage.getNumberOfItems();
            $scope.goTo = function (reference) {
                routing.changeURL(reference);
            }
        }]
    };
}]);