(function(){
	'use strict';
	angular.module('app').
	factory('adminService', adminService);
	adminService.$inject = ['$http'];
	function adminService($http){
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
				//url: 'http://3.228.180.15/api/admins/'+id + '?token=' + token,
				url: 'http://localhost:8080/api/admins/' + id,
				headers: {'Content-Type':'application/json', 'x-access-token':token}
			};
			return $http(req).then(function(response){
				return response;
			}).catch(function(err){
				console.log(err);
			});
		}

		function add(data,token){
			var req = {
				method: 'POST',
				url: 'http://localhost:8080/api/admins',
				headers: {'Content-Type': 'application/json', 'x-access-token': token},
				data: data
			};
			return $http(req).then(function(response){
				return response;
			}).catch(function(err){
				console.log(err);
			});
		}

		function put(data,token){
			var req = {
				method: 'PUT',
				url: 'http://localhost:8080/api/admins/' + data.id,
				headers: {'Content-Type': 'application/json', 'x-access-token': token},
				data: data
			};
			return $http(req).then(function(response){
				return response;
			}).catch(function(err){
				console.log(err);
			});
		}

		function del(id,token){}

		function query(qstring,token){
			var req = {
				method: 'GET',
				//url: 'http://3.228.180.15/api/admins/?' + qstring,// + '&token=' + token,
				url: 'http://localhost:8080/api/admins/?' + qstring,
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
