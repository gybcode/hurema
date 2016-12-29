describe('DashboardController', function(){
	beforeEach(angular.mock.module('app'));
	var $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));
	describe('$scope.f', function(){
		var $scope, controller;
		beforeEach(function(){
			$scope = {};
			controller = $controller('DashboardController', {$scope: $scope});
		});
		it('should exist', function(){
			expect(controller.f).toBeDefined();
		});
		it('gets the length of the word TEST fail', function(){
			controller.string = 'TEST';
			controller.f();
			expect(controller.len).toEqual(4);
		});
		it('gets the length wrong', function(){
			controller.string = 'SAJT';
			controller.f();
			expect(controller.len).toEqual(4);
		});
	});

});
