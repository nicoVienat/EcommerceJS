angular.module('controllers', [])

    .controller('IndexController', function ($scope) {

    })

    .controller('HomeController', function ($scope, localStorage, $http, $rootScope) {

        localStorage.init();
        var cart = 'cart';

        $scope.itemsToDisplay = [];

        $http.get($rootScope.apiURL + '/kinders').then(function (res) {
            $scope.itemsToDisplay = res.data.data;
        }, function (error) {
            console.log(error);
        });

        $scope.get = function () {
            console.log(localStorage.get(cart));
        };

    })

    .controller('CartController', function ($scope, $rootScope, localStorage, $http, $ionicPopup) {
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.cart = localStorage.get('cart');
            $scope.numberOfItems = localStorage.getNumberOfItems();
            $scope.priceOfItems = localStorage.getPriceTotal();
            $scope.validOrder = -1;
        }, function (err) {
            console.log('Erreur : ' + err);
        });

        $scope.doRefresh = function () {
            $scope.cart = localStorage.get('cart');
            $scope.numberOfItems = localStorage.getNumberOfItems();
            $scope.priceOfItems = localStorage.getPriceTotal();
            $scope.validOrder = -1;
            $scope.$broadcast('scroll.refreshComplete');
        };

        var cart = 'cart';
        $scope.cart = localStorage.get(cart);
        $scope.validOrder = -1;
        $scope.paiement = {};
        $scope.paiement.titulary = "Nico";
        $scope.paiement.number = 8522435151611278;
        $scope.paiement.expiryMonth = "01";
        $scope.paiement.expiryYear = "2013";
        $scope.paiement.cryptogram = '946';

        $scope.numberOfItems = localStorage.getNumberOfItems();
        $scope.priceOfItems = localStorage.getPriceTotal();
        
        $scope.deleteItem = function (reference) {
            localStorage.remove(reference);
            $scope.cart = localStorage.get(cart);
            $scope.numberOfItems = localStorage.getNumberOfItems();
            $scope.priceOfItems = localStorage.getPriceTotal();
        };

        $scope.refreshCart = function (reference, qty) {
            localStorage.refresh(reference, qty);
            $scope.numberOfItems = localStorage.getNumberOfItems();
            $scope.priceOfItems = localStorage.getPriceTotal();
        };

        $scope.pay = function () {

            var confirmPopup = $ionicPopup.confirm({
                title: 'Confirmation commande',
                template: 'Voulez-vous valider ce panier ?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log($scope.paiement);
                    $http.post($rootScope.apiURL + '/paiement', $scope.paiement).then(function (res) {
                        if (res.data.valid) {
                            localStorage.newCart();
                            $scope.validOrder = 1;
                        }
                        else {
                            $scope.validOrder = 0;
                            $scope.checkoutErrorMessage = res.data.message;
                        }
                    }), function (err) {
                        $scope.validOrder = 0;
                        $scope.checkoutErrorMessage = err;
                        console.log('Erreur : ' + err);
                    }
                }
            });
        }
   })

    .controller('ArticleController', function ($scope, $http, $stateParams, localStorage, $rootScope) {
        $http.get($rootScope.apiURL + '/kinders/' + $stateParams.kinder_id).then(
            function (response) {
                $scope.article = response.data.data[0];
            },
            function (error) {
                console.log(error);
            }
        );

        $scope.addToCart = function () {
            localStorage.set($scope.article);
            $scope.numberOfItems = localStorage.getNumberOfItems();
        };
    });









