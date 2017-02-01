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

    .controller('CartController', function ($scope, $rootScope, localStorage, $http) {
       var cart = 'cart';
       $scope.cart = localStorage.get(cart);
       $scope.form = {};
       $scope.form.titulary = "Nico";
       $scope.form.number = 8522435151611278;
       $scope.form.expiryMonth = "01";
       $scope.form.expiryYear = "2013";
       $scope.form.cryptogram = '946';

       $scope.deleteItem = function (reference) {
           localStorage.remove(reference);
           $scope.cart = localStorage.get(cart);
           $scope.numberOfItems = localStorage.getNumberOfItems();
       };

       $scope.refreshCart = function (reference, qty) {
           localStorage.refresh(reference, qty);
           $scope.numberOfItems = localStorage.getNumberOfItems();
       };

       $scope.pay = function () {
           console.log('tesst');
           $http.post($rootScope.apiURL + '/paiement', $scope.form).then(function (res) {
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









