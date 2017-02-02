'use strict';

angular.module('kinderApp')
.controller('CartController', ['$scope', '$rootScope', 'localStorage', '$http', function ($scope, $rootScope, localStorage, $http) {
    var cart = 'cart';
    $scope.cart = localStorage.get(cart);
    $scope.validOrder = -1;
    $scope.paiement = {};
    $scope.paiement.titulary = "Nico";
    $scope.paiement.number = 8522435151611278;
    $scope.paiement.expiryMonth = "01";
    $scope.paiement.expiryYear = "2013";
    $scope.paiement.cryptogram = '946';

    $scope.priceOfItems = localStorage.getPriceTotal();

    $scope.deleteItem = function (reference) {
        localStorage.remove(reference);
        $scope.cart = localStorage.get(cart);
        $scope.numberOfItems = localStorage.getNumberOfItems();
    };

    $scope.refreshCart = function (reference, qty) {
        localStorage.refresh(reference, qty);
        $scope.numberOfItems = localStorage.getNumberOfItems();
    };

    $scope.set = function (item, qty) {
        item.qty = item.qty + qty;
        localStorage.set(item);
        localStorage.refresh(item.reference, item.qty);
        $scope.cart = localStorage.get(cart);
        $scope.numberOfItems = localStorage.getNumberOfItems();
        $scope.priceOfItems = localStorage.getPriceTotal();
    }


    $scope.pay = function () {
        $http.post($rootScope.apiURL + '/paiement', $scope.paiement).then(function (res) {
            console.log(res);
            console.log(res.data.valid);
            if (res.data.valid) {
                localStorage.newCart();
                $scope.validOrder = 1;
            }
             else {
                $scope.validOrder = 0;
                $scope.checkoutErrorMessage = res.data.message;
            }
        }, function (err) {
            $scope.validOrder = 0;
            $scope.checkoutErrorMessage = err;
            console.log('Erreur : ' + err);
        });
    };

}]);