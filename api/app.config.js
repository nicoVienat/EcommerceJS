'use strict';

angular.module('kinderApp')
.config(function($routeProvider){
	$routeProvider
	.when('/', {
		controller: 'HomeController',
		templateUrl:  'views/home.html'
	})
	.when('/article/:kinderId', {
		controller: 'ArticleController',
		templateUrl: 'views/article.html'
	})
	.when('/cart', {
		controller: 'CartController',
		templateUrl: 'views/cart.html'
	})
	.otherwise({
		redirectTo: '/'
	})
});