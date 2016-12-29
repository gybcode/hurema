(function() {
	'use strict';

	angular
		.module('app')
		.controller('DashboardController', Controller);

	/* @ngInject */
	Controller.$inject = ['$cookies'];
	function Controller($cookies) {
		var vm = this;
		vm.len = 0;
		vm.f = function(){
			vm.len = vm.string.length;
		}
		activate();

		////////////////

		function activate() {
		}
	}
})();

