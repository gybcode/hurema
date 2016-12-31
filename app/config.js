(function() {
	'use strict';

	angular
		.module('app')
		.config(Config);

	/* @ngInject */
	Config.$inject = ['$urlRouterProvider', '$stateProvider', '$locationProvider', '$mdThemingProvider'];
	function Config($urlRouterProvider, $stateProvider, $locationProvider, $mdThemingProvider) {
		//$locationProvider.html5Mode(true);
		// theming
		$mdThemingProvider.theme('myCustom')
			.primaryPalette('grey', {
				'hue-1': '900',
				'hue-2': '300',
				'hue-3': '50'
			})
		.accentPalette('light-green', {
			'hue-1': '900',
			'hue-2': '300',
			'hue-3': 'A700'
		});
		$mdThemingProvider.setDefaultTheme('myCustom');
		// routing
		$urlRouterProvider.otherwise('/home');
		$stateProvider.
			state('dashboard', {
				templateUrl: './components/dashboard/dashboard.html',
				controller: 'DashboardController',
				controllerAs: 'vm'
			})
			.state('dashboard.home', {
				url:'/home',
				templateUrl: './components/home/home.html',
				controller: 'HomeController',
				controllerAs: 'vm'
			});
		$stateProvider.
			state('authenticate', {
				url:'/login',
				templateUrl: './components/auth/auth.html',
				controller: 'AuthController',
				controllerAs: 'vm'
			});
	}
})();
