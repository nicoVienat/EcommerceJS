'use strict';

angular.module('kinderApp')
.controller('ArticleController', ['$scope', '$http', '$routeParams', 'localStorage', '$rootScope', function ($scope, $http, $routeParams, localStorage, $rootScope) {
    $http.get($rootScope.apiURL + '/kinders/' + $routeParams.kinderId).then(
        function (response) {
            $scope.article = response.data.data[0];
            console.log($scope.article);
        },
        function (error) {
            console.log(error);
        }
    );

    $scope.addToCart = function () {
        localStorage.set($scope.article);
        $scope.numberOfItems = localStorage.getNumberOfItems();
    };
}]);