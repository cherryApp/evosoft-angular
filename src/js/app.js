var evosoft = angular.module('evosoft', []);

// Control header.
evosoft.controller('headerController', [
    '$scope',
    '$timeout',
    function($scope, $timeout){
        $scope.projectName = 'Evosoft project';
        $timeout(()=>{
            $scope.projectName = 'Siemens admin';
        }, 5000);
    }]); 