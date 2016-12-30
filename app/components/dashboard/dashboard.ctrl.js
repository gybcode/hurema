(function() {
	'use strict';

	angular
		.module('app')
		.controller('DashboardController', Controller);

	/* @ngInject */
	Controller.$inject = ['$cookies','$state', '$mdSidenav'];
	function Controller($cookies, $state, $mdSidenav) {
		var vm = this;

		vm.logout = logout;
		vm.toggleSidenav = toggleSidenav;
		activate();

		////////////////

		function logout(){
			$cookies.remove('user');
			$state.go('dashboard', {}, {reload:true});
		}

		function toggleSidenav(navID){
			console.log(navID);
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
