var app = angular.module("learnEviveApp", ["ngRoute"]);
app.config(function($routeProvider) {
	var mainViewConfig = {
		templateUrl : './views/main.html',
		controller: 'homeCtrl',
	};
    $routeProvider
    .when("/", mainViewConfig )
});

app.controller('homeCtrl',function($scope){
	$scope.data = {};
	$scope.name = 'evive';
	$scope.data = window.homeData;
	$scope.navbar = {
		url:"./templates/navbar.html"
	};
});
