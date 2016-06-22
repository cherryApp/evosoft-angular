evosoft.controller('bodyController', [
    '$scope',
    'userFactory',
    function($scope, userFactory) {
        $scope.job = 'programmer';
        $scope.$watch('job', function(newVal, oldVal){
           console.log(newVal, oldVal); 
        });
        
        userFactory.getUser()
            .then(function(user){
                $scope.user = user;
            });
        
        $scope.updateUser = function(user){
            userFactory.updateUser(user)
                .then(function(response){
                    console.log('User updated: ', response);
                });
        };
        
        
    }
]);