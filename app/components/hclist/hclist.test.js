describe('HcListController', function(){
	beforeEach(angular.mock.module('app'));
	var $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));
	describe('controller', function(){
		var $scope, controller;
		beforeEach(function(){
			$scope = {};
			controller = $controller('HcListController', {$scope: $scope});
		});
		it('should exist', function(){
			expect(controller).toBeDefined();
		});
	});

});
