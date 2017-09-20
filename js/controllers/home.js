angular.module('doacao').controller('HomeController', HomeController);

function HomeController($scope, $http, $interval){
    $scope.buscar = buscar;
    $scope.buscarSucesso = buscarSucesso;
    $scope.cep;
    var cardsDoSlider = [
        {
            "imagem": "css/images/004.jpg",
            "titulo": "Corrida",
            "subTitulo": "Corrida em Prol da Associação Bênção de Paz",
            "pontuacao": "400"
        },
        {
            "imagem": "css/images/002.jpg",
            "titulo": "Voluntariado",
            "subTitulo": "Ajude Famílias Inteiras Sendo Voluntário da Teto!",
            "pontuacao": "800"
        },
        {
            "imagem": "css/images/003.jpg",
            "titulo": "Doações",
            "subTitulo": "Faça a Diferença na Vida das Crianças. Doe Agora Online!",
            "pontuacao": "400"
        },
        {
            "imagem": "css/images/001.jpg",
            "titulo": "Campanhas",
            "subTitulo": "Corrida em Prol da Associação Bênção de Paz",
            "pontuacao": "400"
        },
        {
            "imagem": "css/images/001.jpg",
            "titulo": "Campanhas",
            "subTitulo": "Corrida em Prol da Associação Bênção de Paz",
            "pontuacao": "400"
        },
        {
            "imagem": "css/images/004.jpg",
            "titulo": "Corrida",
            "subTitulo": "Corrida em Prol da Associação Bênção de Paz",
            "pontuacao": "400"
        },
        {
            "imagem": "css/images/002.jpg",
            "titulo": "Voluntariado",
            "subTitulo": "Ajude Famílias Inteiras Sendo Voluntário da Teto!",
            "pontuacao": "800"
        },
        {
            "imagem": "css/images/003.jpg",
            "titulo": "Doações",
            "subTitulo": "Faça a Diferença na Vida das Crianças. Doe Agora Online!",
            "pontuacao": "400"
        },
        {
            "imagem": "css/images/003.jpg",
            "titulo": "Doações",
            "subTitulo": "Faça a Diferença na Vida das Crianças. Doe Agora Online!",
            "pontuacao": "400"
        },
        {
            "imagem": "css/images/001.jpg",
            "titulo": "Campanhas",
            "subTitulo": "Corrida em Prol da Associação Bênção de Paz",
            "pontuacao": "400"
        },
        {
            "imagem": "css/images/004.jpg",
            "titulo": "Corrida",
            "subTitulo": "Corrida em Prol da Associação Bênção de Paz",
            "pontuacao": "400"
        },
        {
            "imagem": "css/images/002.jpg",
            "titulo": "Voluntariado",
            "subTitulo": "Ajude Famílias Inteiras Sendo Voluntário da Teto!",
            "pontuacao": "800"
        }
    ];

    function buscar(){
        var chaveGeocoding = 'AIzaSyAYRQ_bjjljKcoaLeSnYXcj0grJsX9xMXc';

        var parametros = {
            method: 'GET',
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.cep + '&key=' + chaveGeocoding
        }

        $http(parametros).then(buscarSucesso, buscarErro);
    }

    function buscarSucesso(resposta){
        if ($scope.cep.length == 8){
            $scope.latitude = resposta.data.results[0].geometry.location.lat;
            $scope.longitude = resposta.data.results[0].geometry.location.lng;
            console.log('Sucesso');
            console.log($scope.latitude);
            console.log($scope.longitude);
            console.log($scope.cep);

            mapa.setCenter({lat: $scope.latitude, lng: $scope.longitude});
            marker[0].setPosition({lat: $scope.latitude, lng: $scope.longitude});
            marker[0].setMap(mapa);
            mapa.setZoom(15);

        }
        else {
            console.log('CEP inválido.');
        }
    }

    function buscarErro(){
        console.log('Erro');
    }

    $interval($scope.acessarApi = function(){
        $http.get('http://174.138.68.160:3000/hemocentros').then(function(resposta){
            for(var i in resposta.data){
                var hemocentroLat = Number(resposta.data[i].lat);
                var hemocentroLng = Number(resposta.data[i].lng);

                new google.maps.Marker({
                    position: {lat: hemocentroLat, lng: hemocentroLng},
                    map: mapa,
                });
            }
        })
    }, 500);


    var linhaSlider = -1;
    var qtLinha = 4;

    function trocarSlider(){
        linhaSlider++;
        var posicaoInicial = linhaSlider * qtLinha;

        if(posicaoInicial >= cardsDoSlider.length){
            linhaSlider = 0;
            posicaoInicial = 0;
        }

        $scope.cardsCalendario = cardsDoSlider.slice(posicaoInicial, posicaoInicial + qtLinha);
    }

    $interval(trocarSlider, 3000);
    trocarSlider();
}
