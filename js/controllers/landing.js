angular.module('doacao').controller('LandingController', LandingController);

function LandingController($scope, $firebaseAuth, $firebaseArray, $state, $interval){
    $scope.redirecionarCadastro = function(){
        $state.go('cadastro');
    };

    $scope.redirecionarLogin = function(){
        $state.go('login');
    };

    var contador = 0;
    $interval(function(){
        contador += 10;

        if(contador > 1450){
            contador = 0;
        }

        $scope.contador = contador.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }, 100);
}
