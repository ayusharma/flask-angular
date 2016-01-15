'use strict';

angular.module('rootconf',['ui.router'])
.config(['$stateProvider','$urlRouterProvider','$httpProvider',function($stateProvider,$urlRouterProvider,$httpProvider){


	$httpProvider.defaults.withCredentials = false;

	$stateProvider

	.state('index', {
		url:'/',
		templateUrl: 'static/partials/main.html',
		controller:'MainCtrl',
	})
	
	$urlRouterProvider.otherwise('/');
}])

.controller('MainCtrl',function(){
	
})
.directive('header', [function(){
	var directive = {
		restrict: 'EA',
		templateUrl: 'static/partials/header.html'
	}
	return directive;
}])
