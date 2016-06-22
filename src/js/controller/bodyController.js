evosoft.controller('bodyController', [
    '$scope',
    'userFactory',
    '$rootScope',
    'bodyService',
    function($scope, userFactory, $rootScope, bodyService) {
        
        $scope.currentPage = 'template/dashboard.html';
        $scope.isDebug = false;
        
        $scope.userError = {};
        
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