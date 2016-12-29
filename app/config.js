(function() {
	'use strict';

	angular
		.module('app')
		.config(Config);

	/* @ngInject */
	Config.$inject = ['$urlRouterProvider', '$stateProvider', '$locationProvider'];
	function Config($urlRouterProvider, $stateProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');
		$stateProvider.
			state('dashboard', {
				url: '/',
				templateUrl: './app/components/dashboard/dashboard.html',
				controller: 'DashboardController',
				controllerAs: 'vm'
			});
	}
})();

