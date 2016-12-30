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
			.primaryPalette('grey')
			.accentPalette('light-green');
		$mdThemingProvider.setDefaultTheme('myCustom');
		// routing
		$urlRouterProvider.otherwise('/');
		$stateProvider.
			state('dashboard', {
				url: '/',
				templateUrl: './components/dashboard/dashboard.html',
				controller: 'DashboardController',
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
