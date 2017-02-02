'use strict';

angular.module('kinderApp')
.controller('CartController', ['$scope', '$rootScope', 'localStorage', '$http', function ($scope, $rootScope, localStorage, $http) {
    var cart = 'cart';
    $scope.cart = localStorage.get(cart);
    $scope.form = {};
    $scope.form.titulary = "Nico";
    $scope.form.number = 8522435151611278;
    $scope.form.expiryMonth = "01";
    $scope.form.expiryYear = "2013";
    $scope.form.cryptogram = '946';

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
        var cartPaiement = {
            paiement: $scope.form,
            cart: $scope.cart
        };

        $http.post($rootScope.apiURL + '/paiement', cartPaiement).then(function (res) {
            $scope.validOrder = res.data.valid;
            if (res.data.valid) {
                $('.alert-success').show();
            }
            else {
                $scope.checkoutErrorMessage = res.data.message;
                $('.alert-danger').show();
            }
        }, function (err) {
            console.log('Erreur : ' + err);
        });
    };

}]);