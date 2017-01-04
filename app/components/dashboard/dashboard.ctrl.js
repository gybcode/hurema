(function() {
	'use strict';
	angular
		.module('app')
		.controller('DashboardController', Controller);

	/* @ngInject */
	Controller.$inject = ['$cookies','$state', '$mdSidenav', '$mdMedia', '$scope'];
	function Controller($cookies, $state, $mdSidenav, $mdMedia, $scope) {
		var vm = this;

		vm.logout = logout;
		vm.toggleSidenav = toggleSidenav;
		vm.media = $mdMedia;
		activate();
		////////////////

		function logout(){
			$cookies.remove('user');
			$state.go('dashboard.home', {}, {reload:true});
		}

		function toggleSidenav(navID){
			$mdSidenav(navID).toggle();
		}

		function activate() {
			if($cookies.getObject('user'))
				$scope.user = $cookies.getObject('user');
			else 
				$state.go('authenticate');
		}
	}
})();
