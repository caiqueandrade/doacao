angular.module('doacao').controller('BodyController', BodyController);

function BodyController($scope, $transitions){

    $transitions.onStart({}, function($transition$){
        var to = $transition$.$to();
        $scope.currentState = to.name;
    });
}
