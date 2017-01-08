(function(){
	'use strict';
	angular.module('app')
		.controller('adminsController', Controller);
	Controller.$inject = ['$scope', '$cookies', 'adminService', '$state'];
	function Controller($scope, $cookies, adminService, $state){
		var vm = this;
		vm.admins = [];
		vm.areas = [
			{"name": "ZeeWeed"},
			{"name": "Membrane"},
			{"name": "Braid"},
			{"name": "F&M"},
			{"name": "%"}
		];

		vm.new = {};
		vm.new.shift = '%';
		vm.new.area = '%';
		vm.saveAdmin = saveAdmin;
		vm.pwvalid = pwvalid;

		function pwvalid(){
			if(vm.new.password!=vm.new.password2){
				vm.pserror = true;
			} else {
				vm.pserror = false;
			}
		}
		function saveAdmin(){
			if(vm.new.password!=vm.new.password2){
				return false;
			} else {
				delete vm.new.password2;
				$scope.newAdminForm.$setPristine();
				$scope.newAdminForm.$setUntouched();
				adminService.add(vm.new, vm.token).then(function(response){
					vm.new = {};
					$state.go('dashboard.admins', {}, {reload:true});
				});
			}
		}
		activate();
		////////////////////
		function activate(){
			vm.token = $cookies.getObject('user').token;
			adminService.query('', vm.token).then(function(response){
				vm.admins = response.data;
			});
		}
	}
})();
