(function() {
	'use strict';

	angular
		.module('app')
		.controller('AuthController', Controller);

	/* @ngInject */
	Controller.$inject = ['$cookies', 'authService', '$state'];
	function Controller($cookies, authService, $state) {
		var vm = this;
		vm.auth = login;
		vm.message = '';
		function login(data){
			authService.authenticate(data).then(function(response){
				if(response.success == true){
					$state.go('dashboard');
				} else {
					vm.message = response.message;
				}
			});
		}
	}
})();
