(function(){
	'use strict';
	angular.module('app')
	.controller('HcListController', Controller);
	Controller.$inject = ['$cookies', '$scope', 'userService'];
	function Controller($cookies, $scope, userService){
		var vm = this;
		vm.users = [];
		activate();
		///////////////
		function activate(){

			vm.qstring = 'filter=area,shift&operator=like,like&value=' + ($scope.user.data.area==null?'%':$scope.user.data.area) + ',' + ($scope.user.data.shift==null?'%':$scope.user.data.shift);
			vm.token = $scope.user.token;
			var uList = userService.query(vm.qstring, vm.token);
			uList.then(function(response){
				vm.users = response.data;
			});
		}
	}
})();
