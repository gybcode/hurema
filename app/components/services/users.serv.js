(function(){
	'use strict';
	angular.module('app').
	factory('userService', userService);
	userService.$inject = ['$http'];
	function userService($http){
		var service = {
			get: get,
			add: add,
			put: put,
			del: del,
			query: query
		};
		return service;
		////////////////////
		
		function get(id,token){
			var req = {
				method: 'GET',
				//url: 'http://3.228.180.15/api/users/'+id + '?token=' + token,
				url: 'http://localhost:8080/api/users/' + id,
				headers: {'Content-Type':'application/json', 'x-access-token':token}
			};
			return $http(req).then(function(response){
				return response;
			}).catch(function(err){
				console.log(err);
			});
		}

		function add(data,token){}

		function put(data,token){}

		function del(id,token){}

		function query(qstring,token){
			var req = {
				method: 'GET',
				//url: 'http://3.228.180.15/api/users/?' + qstring,// + '&token=' + token,
				url: 'http://localhost:8080/api/users/?' + qstring,
				headers: {'Content-Type':'application/json', 'x-access-token':token}
			};						
			return $http(req).then(function(response){
				return response;
			}).catch(function(err){
				console.log(err);
			});
		}
	}
})();
