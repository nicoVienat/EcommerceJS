'use strict';

angular.module('kinderApp')
.directive('footerBottom', [function () {
    return {
        templateUrl: 'views/footer.html',
        restrict: 'E'
    };
}]);