'use strict';

var app = angular.module('kinderApp', ['ngRoute'])
.run(function($rootScope) {
    $rootScope.apiURL = 'http://localhost:1337/api';
})