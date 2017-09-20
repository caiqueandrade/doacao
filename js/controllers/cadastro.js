angular.module('doacao').controller('CadastroController', CadastroController);

function CadastroController($scope, $firebaseAuth, $firebaseArray, $state, $window){
    var auth = $firebaseAuth();
    var ref = firebase.database().ref('usuarios');
    var usuarios = $firebaseArray(ref);

    $scope.dados = {};
    $scope.cadastrar = cadastrar;
    $scope.cadastrarSucesso = cadastrarSucesso;
    $scope.scroll = scroll;

    function cadastrar(){
        auth.$createUserWithEmailAndPassword($scope.dados.email, $scope.dados.senha).then(cadastrarSucesso);
    }

    function cadastrarSucesso(){
        $scope.dados.nascimento = $scope.dados.nascimento.getDate().toString() + '/' + ($scope.dados.nascimento.getMonth() + 1).toString() + '/' + $scope.dados.nascimento.getFullYear().toString();
        console.log($scope.dados);
        usuarios.$add($scope.dados);
        $scope.alerta = true;
        $state.go('home');
    };

    function scroll(element){
        jump(element, {
            duration: 200
        });
    }
}

function jump(target, options) {
    var start = window.pageYOffset;

    var opt = {
      duration: options.duration,
      offset: options.offset || 0,
      callback: options.callback,
      easing: options.easing || easeInOutQuad
    };

    var distance = typeof target === 'string' ?
        opt.offset + document.querySelector(target).getBoundingClientRect().top :
        target
    ;

    var duration = typeof opt.duration === 'function'
          ? opt.duration(distance)
          : opt.duration
    ;

    var
        timeStart = null,
        timeElapsed
    ;

    requestAnimationFrame(loop);

    function loop(time) {
        if (timeStart === null)
            timeStart = time;

        timeElapsed = time - timeStart;

        window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

        if (timeElapsed < duration)
            requestAnimationFrame(loop)
        else
            end();
    }

    function end() {
        window.scrollTo(0, start + distance);

        typeof opt.callback === 'function' && opt.callback();
        timeStart = null;
    }

    function easeInOutQuad(t, b, c, d)  {
        t /= d / 2
        if(t < 1) return c / 2 * t * t + b
        t--
        return -c / 2 * (t * (t - 2) - 1) + b
    }

}
