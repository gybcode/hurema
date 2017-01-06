describe('AuthController', function(){
	beforeEach(module('app'));
	var $controller, $authService;
	beforeEach(inject(function(_$controller_, _authService_){
		$controller = _$controller_;
		$authService = _authService_;
	}));
	describe('controller', function(){
		var $scope, controller, authService;
		beforeEach(function(){
			$scope = {};
			authService = $authService;
			controller = $controller('AuthController', {$scope: $scope, authService:authService});
		});
		it('should exist', function(){
			expect(controller).toBeDefined();
		});
		it('should have function', function(){
			expect(controller.auth).toBeDefined();
		});
	});
});

