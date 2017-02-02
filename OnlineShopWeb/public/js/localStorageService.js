'use strict';

angular.module('kinderApp')
.service('localStorage', ['$q', function ($q) {


    this.init = function () {
        if (this.get() === null) {
            var LS = [];
            localStorage.setItem('cart', JSON.stringify(LS));
        }
    };

    this.newCart = function () {
        var localstorage = [];
        localStorage.setItem('cart', JSON.stringify(localstorage));
    };

    this.get = function () {
        return JSON.parse(localStorage.getItem('cart'));
    };

    this.set = function (item) {
        var defer = $q.defer();
        var currentCart = this.get();
        var added = false;
        if (currentCart != null) {
            for (var i = 0; i < currentCart.length; i++) {
                if (currentCart[i].kinderId == item.kinderId) {
                    currentCart[i].qty++;
                    added = true;
                }
            }
            if (!added) {
                var itemToAdd = item;
                itemToAdd.qty = 1;
                currentCart.push(itemToAdd);
            }
        }
        else {
            currentCart = [];
            var itemToAdd = item;
            itemToAdd.qty = 1;
            currentCart.push(itemToAdd);
        }
        localStorage.setItem('cart', JSON.stringify(currentCart));
        defer.resolve();
        return defer.promise;
    };

    this.getNumberOfItems = function () {
        var items = JSON.parse(localStorage.getItem('cart'));
        var numberOfItems = 0;
        items.forEach(function (item) {
            numberOfItems += item.qty;
        });
        return numberOfItems;
    };

    this.getPriceTotal = function () {
        var items = JSON.parse(localStorage.getItem('cart'));
        var priceTotal = 0;
        items.forEach(function (item) {
            priceTotal += (item.price * item.qty);
        });
        return priceTotal;
    };

    this.remove = function (kinderId) {
        var defer = $q.defer();
        var currentCart = this.get();
        if (currentCart != null) {
            for (var i = 0; i < currentCart.length; i++) {
                if (currentCart[i].kinderId == kinderId) {
                    currentCart.splice(i, 1);
                    localStorage.setItem('cart', JSON.stringify(currentCart));
                    return;
                }
            }
        }
        defer.resolve();
        return defer.promise;
    };

    this.refresh = function (kinderId, qty) {
        var defer = $q.defer();
        var currentCart = this.get();
        if (currentCart != null) {
            for (var i = 0; i < currentCart.length; i++) {
                if (currentCart[i].kinderId == kinderId) {
                    currentCart[i].qty = qty;
                    localStorage.setItem('cart', JSON.stringify(currentCart));
                    return;
                }
            }
        }
        defer.resolve();
        return defer.promise;
    };
}]);
