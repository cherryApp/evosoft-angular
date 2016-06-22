evosoft.factory('userFactory', [
    '$http',
    '$q',
    function($http, $q){
        return {
           getUser: function(){
               var deferred = $q.defer();
               $http.get('/user')
                    .then(function(userData){
                        deferred.resolve(userData.data);
                    }, function(err){
                        deferred.reject(err);
                    });
               return deferred.promise;
           },
           updateUser: function(user){
               var deferred = $q.defer();
               $http.post('/user', user)
                    .then(function(userData){
                        deferred.resolve(userData.data);
                    }, function(err){
                        deferred.reject(err);
                    });
               return deferred.promise;
           }
        };
    }]);