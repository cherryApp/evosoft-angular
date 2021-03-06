var evosoft = angular.module('evosoft',
    [
        'currencyModule', 
        'ui.router' 
    ]
);

evosoft.config([ 
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function(
        $stateProvider, 
        $urlRouterProvider,
        $locationProvider
    ){
        // Remove # from url.
        $locationProvider.html5Mode(true);
            
        // Default state.
        $urlRouterProvider.otherwise("/");
        
        $stateProvider
            .state('dashboard', {
                url: "/",
                templateUrl: 'template/dashboard.html',
                controller: 'bodyController'
            })
            .state('user', {
                url: "/user",
                templateUrl: 'template/user.html',
                controller: 'bodyController'
            })
            .state('admin', {
                url: "/admin",
                templateUrl: 'template/admin.html',
                controller: 'bodyController'
            });
            
}]);

;
evosoft.service('bodyService', function(){
    return {
        currentPage: ''  
    };
});
;
evosoft.service('staffService', function(){
    return {
        city: [
            {value: 1, country: 1, name: 'München'},
            {value: 2, country: 1, name: 'Stuttgart'},
            {value: 3, country: 1, name: 'Berlin'},
            {value: 4, country: 2, name: 'Budapest'},
            {value: 5, country: 2, name: 'Szeged'},
            {value: 6, country: 2, name: 'Miskolc'}
        ],
        country: [
            {value: 1, name: 'Germany'},
            {value: 2, name: 'Hungary'}
        ],
        currentCountry: 0,
        getCity: function(){
            var currentCity = [];
            for (var k in this.city) {
                console.log(this.city[k].country, this.currentCountry);
                if (
                    parseInt(this.city[k].country) === parseInt(this.currentCountry)) {
                    currentCity.push(this.city[k]);
                }
            }
            return currentCity;
        }
    };
});
;
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
;
// <custom-select></custom-select>
evosoft.directive('customSelect', [function(){
    return {
        restrict: 'AE',
        templateUrl: 'template/directive/custom-select.html',
        transclude: false,
        scope: {
            label: '@label',
            model: '=model',
            inputName: '=inputName',
            error: '=error',
            source: '@source'
        },
        controller: [
            '$scope', 
            '$http', 
            'staffService', 
            function($scope, $http, staffService) {
                if ($scope.source === 'country') {
                    $scope.$watch('model', function(){
                        console.log('model', $scope.model );
                        staffService.currentCountry = $scope.model;
                    });
                } else {
                    $scope.$watch(function(){
                        return staffService.currentCountry;
                    }, function(newValue){
                        console.log('newValue', newValue);
                        $scope.options = staffService.getCity();
                    });
                }
                
                $scope.options = staffService[$scope.source];
        }]
    };
}]);
;
// <form-group></form-group>
evosoft.directive('formGroup', [function(){
    return {
        restrict: 'AE',
        templateUrl: 'template/directive/form-group.html',
        scope: {
            label: '@label',
            model: '=model',
            inputName: '=inputName',
            error: '=error'
        },
        link: function(scope, el, attr) {
            if(angular.isUndefined(scope.model)) {
                console.error('Error in form-group dircective: Model not exists');
            }
        },
        controller: ['$scope', '$http', function() {
            // console.log(arguments);
        }]
    };
}]);
;
evosoft.controller('bodyController', [
    '$scope',
    'userFactory',
    '$rootScope',
    'bodyService',
    '$state',
    function($scope, userFactory, $rootScope, bodyService, $state) {
        
        $scope.currentPage = 'template/dashboard.html';
        $scope.isDebug = false;
        
        $scope.userError = {};
        
        $scope.values = [
            {text: 'Hello', value: "world"}
        ];
        
        $scope.goState = function(stateName) {
            $state.transitionTo(stateName);
        };
        
        // User inputs.
        $scope.userFields = [
            {name: 'email', label: 'Email'},
            {name: 'name', label: 'Name'},
            {name: 'age', label: 'Age'},
            {name: 'salary', label: 'Salary'}
        ];
        
        $scope.$watch(function(){
            return bodyService.currentPage;
        }, function(newValue){
            if (newValue !== '') {
                $scope.currentPage = newValue;                
            }
        });
        
        $scope.$watchCollection('user', function(newVal, oldVal){
           console.log(newVal, oldVal); 
        });
        
        userFactory.getUser()
            .then(function(user){
                $scope.user = user;
            });
        
        $scope.updateUser = function(user){
            if(!$scope.validate(user)) 
                return;
            
            userFactory.updateUser(user)
                .then(function(response){
                    console.log('User updated: ', response);
                });
        };
        
        // Validate user data.
        $scope.validate = function(user) {
            $scope.userError = {};
            
            // Undefined or empty.
            for( let k in user ) {
                if (angular.isUndefined(user[k])){
                    $scope.userError[k] = `${k} is not defined`;
                } else if (user[k].toString() === '') {
                    $scope.userError[k] = `${k} is empty`;
                }
            }
            
            return Object.keys($scope.userError).length === 0;
        };
        
        
    }
]);
;
// Control header.
evosoft.controller('headerController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'bodyService',
    function($scope, $timeout, $rootScope, bodyService){
        $scope.projectName = 'Evosoft project';
        $timeout(()=>{
            $scope.projectName = 'Siemens admin';
        }, 5000);
        
        // Current page.
        $scope.currentPage = 'dashboard';
        
        // Menu points of header.
        $scope.menuPoints = [
            {
                state: 'dashboard',
                text: 'Dashboard',
                template: 'dashboard'
            },
            {
                state: 'user',
                text: 'User',
                template: 'user'
            },
            {
                state: 'admin',
                text: 'Admin',
                template: 'admin'
            }            
        ];
        
        // Page change.
        $scope.changePage = function($event, point){
            // $event.preventDefault();
            $scope.currentPage = `template/${point.template}.html`;
            // $rootScope.$broadcast('changePage', $scope.currentPage);
            bodyService.currentPage = $scope.currentPage;
        };
        
        
    }]); 