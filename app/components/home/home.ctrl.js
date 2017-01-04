(function() {
	'use strict';

	angular
		.module('app')
		.controller('HomeController', Controller);

	/* @ngInject */
	Controller.$inject = ['$cookies', '$scope'];
	function Controller($cookies, $scope) {
		var vm = this;

		activate();

		////////////////

		function activate() {
		}
	}
})();

