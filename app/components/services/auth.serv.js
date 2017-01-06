(function() {
	'use strict';

	angular
		.module('app')
		.service('authService', Service);

	/* @ngInject */
	Service.$inject = ['$http', '$cookies'];
	function Service($http, $cookies) {
		this.authenticate = authenticate;

		function authenticate(data){
			var req = {
				method: 'POST',
				headers: {'Content-Type':'application/json'},
				url: 'http://3.228.180.15/api/authenticate',
				data: data // needs to be object {username: username, password: password}
			};
			return $http(req).then(function(response){
				if(response.data.success == true){
					$cookies.putObject('user', {'data':response.data.user,'token':response.data.token});
					return response.data;
				} else {
					return response.data;
				}
			}).catch(function(error){
				return error.data;
			});
		}	
	}
})();
