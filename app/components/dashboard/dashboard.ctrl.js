(function() {
	'use strict';

	angular
		.module('app')
		.controller('DashboardController', Controller);

	/* @ngInject */
	Controller.$inject = ['$cookies','$state', '$mdSidenav', '$mdMedia'];
	function Controller($cookies, $state, $mdSidenav, $mdMedia) {
		var vm = this;

		vm.logout = logout;
		vm.toggleSidenav = toggleSidenav;
		vm.media = $mdMedia;
		activate();
		////////////////

		function logout(){
			$cookies.remove('user');
			$state.go('dashboard', {}, {reload:true});
		}

		function toggleSidenav(navID){
			$mdSidenav(navID).toggle();
		}

		function activate() {
			if($cookies.getObject('user'))
				vm.user = $cookies.getObject('user');
			else 
				$state.go('authenticate');
		}
	}
})();
