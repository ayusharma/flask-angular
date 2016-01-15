'use strict';
var baseURL = 'http://localhost:5000/'

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

.controller('MainCtrl',function($scope,MainService){

	$scope.main = {}
	
	MainService.getTables().then(function(res){
		$scope.main.database = res.data.name
		console.log(res.data)
	})
})

.directive('header', [function(){
	var directive = {
		restrict: 'EA',
		templateUrl: 'static/partials/header.html'
	}
	return directive;
}])

.factory('MainService', function($http) {
	var mainService = {};

	mainService.getTables = function() {

		var req = {
			method:'GET',
			url:baseURL+'db',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http(req).then(function(res){
			return res;
		});
	};


	// tableService.getTableData = function(table_name) {

	// 	var req = {
	// 		method:'POST',
	// 		url:baseURL + 'tabledata',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		data:{
	// 			'table_name':table_name
	// 		}
	// 	};
	// 	return $http(req).then(function(res){
	// 		return res;
	// 	});
	// };
	return mainService;
})
