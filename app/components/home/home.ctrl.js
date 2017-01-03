(function() {
	'use strict';

	angular
		.module('app')
		.controller('HomeController', Controller);

	/* @ngInject */
	Controller.$inject = ['$cookies'];
	function Controller($cookies) {
		var vm = this;

		activate();

		////////////////

		function activate() {
		}
	}
})();

