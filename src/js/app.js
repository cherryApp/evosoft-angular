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
