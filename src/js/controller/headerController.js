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
                href: '#',
                text: 'Dashboard',
                template: 'dashboard'
            },
            {
                href: '#user',
                text: 'User',
                template: 'user'
            },
            {
                href: '#admin',
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