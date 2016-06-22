'use strict';

var evosoft = angular.module('evosoft', []);

// Control header.
evosoft.controller('headerController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.projectName = 'Evosoft project';
    $timeout(function () {
        $scope.projectName = 'Siemens admin';
    }, 5000);
}]);;evosoft.factory('userFactory', ['$http', '$q', function ($http, $q) {
    return {
        getUser: function getUser() {
            var deferred = $q.defer();
            $http.get('/user').then(function (userData) {
                deferred.resolve(userData.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        updateUser: function updateUser(user) {
            var deferred = $q.defer();
            $http.post('/user', user).then(function (userData) {
                deferred.resolve(userData.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    };
}]);;evosoft.controller('bodyController', ['$scope', 'userFactory', function ($scope, userFactory) {
    $scope.job = 'programmer';
    $scope.$watch('job', function (newVal, oldVal) {
        console.log(newVal, oldVal);
    });

    userFactory.getUser().then(function (user) {
        $scope.user = user;
    });

    $scope.updateUser = function (user) {
        userFactory.updateUser(user).then(function (response) {
            console.log('User updated: ', response);
        });
    };
}]);
//# sourceMappingURL=babel.js.map
