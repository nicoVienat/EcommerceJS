// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'controllers', 'services'])

.run(function ($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
    $rootScope.apiURL = 'http://localhost:1337/api';
})

 .config(function ($stateProvider, $urlRouterProvider) {

     $stateProvider
     .state('tab', {
         url: '/tab',
         abstract: true,
         templateUrl: 'views/tabs.html',
         controller: 'IndexController'
     })

     .state('tab.home', {
         url: '/home',
         views: {
             homeContainer: {
                 templateUrl: 'views/home.html',
                 controller: 'HomeController'
             }
         }
     })
     .state('tab.cart', {
         url: '/cart',
         views: {
             cartContainer: {
                 templateUrl: 'views/cart.html',
                 controller: 'CartController'
             }
         }
     })
     .state('tab.article', {     
         url: '/article/:kinder_id',
         views: {
             homeContainer: {
                 templateUrl: 'views/article.html',
                 controller: 'ArticleController'
             }
         }

     })
     
     $urlRouterProvider.otherwise('/tab/home');
 })