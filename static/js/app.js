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

	function loaddata(){
		MainService.getTables().then(function(res){
			$scope.main.database = res.data.name;
			$scope.main.tabledata = res.data.table_data;
			console.log($scope.main.tabledata);
		})
	}
	loaddata();

	$scope.post = function(){
		MainService.insert($scope.main.personname,$scope.main.personcity).then(function(res){
			loaddata();
			console.log(res);
		})
	}

	$scope.delete = function  (del) {
		var r = confirm("Do you want to delete person with ID"+del);
	    if (r == true) {
	    	MainService.delete(del).then(function(res){
				loaddata();
				console.log(res);
			})    
	    } else {
	       
	    }
	}

	$scope.put = function  () {
    	MainService.put($scope.main.keyterm,$scope.main.putvalue,$scope.main.putid).then(function(res){
			loaddata();
			console.log(res);
		})    
	}
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


	mainService.insert = function(name,city) {

		var req = {
			method:'POST',
			url:baseURL + 'db',
			headers: {
				'Content-Type': 'application/json'
			},
			data:{
				'name':name,
				'city':city
			}
		};
		return $http(req).then(function(res){
			return res;
		});
	};

	mainService.delete = function(id) {

		var req = {
			method:'DELETE',
			url:baseURL + 'db',
			headers: {
				'Content-Type': 'application/json'
			},
			data:{
				'id':id,
			}
		};
		return $http(req).then(function(res){
			return res;
		});
	};

	mainService.put = function(keyterm,value,id) {

		var req = {
			method:'PUT',
			url:baseURL + 'db',
			headers: {
				'Content-Type': 'application/json'
			},
			data:{
				'id':id,
				'keyterm':keyterm,
				'value':value
			}
		};
		return $http(req).then(function(res){
			return res;
		});
	};
	return mainService;
})
