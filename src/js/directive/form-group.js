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