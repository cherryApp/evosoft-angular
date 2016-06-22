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