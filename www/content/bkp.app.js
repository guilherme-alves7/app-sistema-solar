paginaSelected = null;

angular.module('myApp', ['ngRoute', 'ajoslin.mobile-navigate'])
        .config(function ($routeProvider) {
            $routeProvider
                .when("/menu", {
                    templateUrl: "content/home.html",
                    reverse: true
                })
                .when("/one", {
                    templateUrl: "content/page1.html"
                })
                .when("/two", {
                    templateUrl: "content/page2.html",
                    transition: "modal" //this is overwritten by the go() in home.html
                })
                .when("/referencias", {
                    templateUrl: "content/referencias.html",
                    transition: "modal" //this is overwritten by the go() in home.html
                })
                .when("/sobre", {
                    templateUrl: "content/sobre.html",
                    transition: "modal" //this is overwritten by the go() in home.html
                })
                .when("/novo", {
                    templateUrl: "content/novo.html",
                    transition: "modal" //this is overwritten by the go() in home.html
                })
                .when("/lista", {
                    templateUrl: "content/lista.html",
                    transition: "modal" //this is overwritten by the go() in home.html
                })
                .when("/editar", {
                    templateUrl: "content/editar.html",
                    transition: "modal" //this is overwritten by the go() in home.html
                })
                .when("/popup", {
                    templateUrl: "content/popup.html",
                    transition: "modal"
                })
                .when("/monkey", {
                    templateUrl: "content/monkey.html"
                })
                .when("/backwards", {
                    templateUrl: "content/backwards.html",
                    reverse: true
                })
                .when("/exercicios1", {
                    templateUrl: "content/exercicios/1.html",
                    transition: "modal"
                })
                .when("/video1", {
                    templateUrl: "content/videos/1.html",
                    transition: "modal"
                })
                .when("/sol", {
                    templateUrl: "content/saiba_mais/sol.html",
                    transition: "modal"
                })
                .when("/marte", {
                    templateUrl: "content/saiba_mais/marte.html",
                    transition: "modal"
                })
                .when("/jupiter", {
                    templateUrl: "content/saiba_mais/jupiter.html",
                    transition: "modal"
                })
                .when("/", {
                    templateUrl: "content/home.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        })
        .run(function ($route, $http, $templateCache) {
            angular.forEach($route.routes, function (r) {
                if (r.templateUrl) {
                    $http.get(r.templateUrl, {cache: $templateCache});
                }
            });
        })
        .controller('MainCtrl', function ($scope, $navigate) {
            $scope.$navigate = $navigate;

            $scope.sumario = [
                {
                    nome: "Introdução",
                    page: 1,
                    elem: "#introducao",
                    subitens: [
                        { nome: "Origem", page: 1, elem: "#origem" }
                    ]
                },
                {
                    nome: "Componentes do Sistema Solar",
                    page: 2,
                    elem: "#componentes-sistema-solar",
                    subitens: [
                        { nome: "O Sol", page: 2, elem: "#sol" },
                        { nome: "Composição do Sol", page: 2, elem: "#composicao-sol" },
                        { nome: "Planetas", page: 3, elem: "#planetas" },
                        { nome: "Inclinação dos Planetas", page: 3, elem: "#inclinacao-planetas" },
                        { nome: "Movimento de Rotação", page: 3, elem: "#movimento-rotacao" },
                        { nome: "Movimento de Translação", page: 4, elem: "#movimento-translacao"},
                    ]
                },
                {
                    nome: "Os planetas do Sistema Solar",
                    page: 5,
                    elem: "#planetas-sistema-solar",
                    subitens: [
                        { nome: "Mercúrio", page: 5, elem: "#planeta-mercurio"},
                        { nome: "Vênus", page: 6, elem: "#planeta-venus"},
                        { nome: "Terra", page: 6, elem: "#planeta-terra"},
                        { nome: "Marte", page: 7, elem: "#planeta-marte"},
                        { nome: "Júpiter", page: 7, elem: "#planeta-jupiter"},
                        { nome: "Saturno", page: 8, elem: "#planeta-saturno"},
                        { nome: "Urano", page: 8, elem: "#planeta-urano"},
                        { nome: "Netuno", page: 9, elem: "#planeta-netuno"},
                        { nome: "Plutão, o planeta anão", page: 9, elem: "#planeta-plutao"}
                    ]
                }
            ];

            $scope.listaExercicios = [
                {nome: "Lista de Exercícios 1", page:'/exercicios1'}
            ];

            $scope.abrePagina = function(page, elem){
                $('.drag-target').trigger('click'); //fecha o NavSide
                $('#m-scooch-example-3').scooch('move', page); //move a pagina do slide
                
                $('.conteudo-educacional').animate({ //rola pagina ate o elemento
                    scrollTop: $(elem).offset().top
                }, 3000);
            };

            $scope.abrePaginaExercicio = function(page){
                $('.drag-target').trigger('click'); //fecha o NavSide
                $navigate.go(page); //redireciona para tela do exercicio
            };

            $scope.clientes = [
                {nome: 'Guilherme', telefone: '(19) 36333-333'},
                {nome: 'João', telefone: '(19) 3633-3333'}
            ];

            $scope.clienteSelected = null;

            $scope.adicionaCliente = function (cliente) {
                //adiciona item no array
                $scope.clientes.push({
                                    nome: cliente.nome, telefone: cliente.telefone
                                });

                //limpa inputs
                cliente.nome = '';
                cliente.telefone = '';
                $navigate.go('/lista', 'slide', true);//retorna para listagem

                var $toastContent = $('<span>Cliente adicionado com sucesso <i class="material-icons">check_circle</i></span>');
                Materialize.toast($toastContent, 5000);
            };

            $scope.deleteCliente = function(index){
                $scope.clientes.splice(index, 1);

                var $toastContent = $('<span>Cliente deletado com sucesso <i class="material-icons">check_circle</i></span>');
                Materialize.toast($toastContent, 5000);
            };

            $scope.selectCliente = function(index){
                $scope.clienteSelected = $scope.clientes[index]; //seleciona o cliente a ser editado
                $navigate.go('/editar', 'slide'); //redireciona para tela de editar
            };

            $scope.editaCliente = function(){
                $scope.clienteSelected = null; //limpa cliente selecionado
                $navigate.go('/lista', 'slide', true);//retorna para listagem

                var $toastContent = $('<span>Cliente editado com sucesso <i class="material-icons">check_circle</i></span>');
                Materialize.toast($toastContent, 5000);
            };

            $scope.gabarito = [
                {alternativa: 'A'},
                {alternativa: 'C'}
            ];
            $scope.statusRespostas = [
                {acertou:null},
                {acertou:null}
            ];
            $scope.responderExerc = function(respostas){
                //sava objeto em array
                var array_respostas = [
                    {resp: respostas.exerc1},
                    {resp: respostas.exerc2}
                ];

                //compara respostas com o gabarito
                for(var i = 0; i < array_respostas.length; i++){
                    if(array_respostas[i].resp === $scope.gabarito[i].alternativa){ //resposta correta
                        $scope.statusRespostas[i].acertou = true;
                    }
                    else{ //resposta errada
                        $scope.statusRespostas[i].acertou = false;
                    }
                }

                var $toastContent = $('<span>Respostas enviadas com sucesso <i class="material-icons">check_circle</i></span>');
                Materialize.toast($toastContent, 5000);
            };

            $scope.limpaStatusRespostas = function(){ //esta função é chamada quando se fecha o modal dos exercicios
                for(var i = 0; i < $scope.statusRespostas.length; i++){
                    $scope.statusRespostas[i].acertou = null;
                }
            };
        })
        .directive('ngTap', function () {
            var isTouchDevice = !!("ontouchstart" in window);
            return function (scope, elm, attrs) {
                if (isTouchDevice) {
                    var tapping = false;
                    elm.bind('touchstart', function () {
                        tapping = true;
                    });
                    elm.bind('touchmove', function () {
                        tapping = false;
                    });
                    elm.bind('touchend', function () {
                        tapping && scope.$apply(attrs.ngTap);
                    });
                } else {
                    elm.bind('click', function () {
                        scope.$apply(attrs.ngTap);
                    });
                }
            };
        })
        .directive("initSlide", function () {
            return {
                link : function(scope, element, attrs) {
                    //inicia o slide
                    if(paginaSelected === null){ //se a pagina na esitiver definida, inicio na primeira pagina
                        $(element).scooch();
                    }
                    else{ //se a pagina estiver definida inicio nela
                        $(element).scooch('move', paginaSelected);
                    }
                    //$(element).css('height', '100%');

                    //salva numero da pagina quando ela é trocada
                    $(element).find('.m-scooch-inner').attrchange({
                            trackValues: true,
                            callback: function (event) {
                                setTimeout(function() { //aguarda um tempo antes de pegar o valor da pagina ativa
                                    var pagina_slide = $(element).find('.m-scooch-pagination').find('.m-active').attr('data-m-slide');
                                    paginaSelected = pagina_slide;
                                }, 1000);
                            }
                    });
                }
            };
        })
        .directive("initSideNav", function () {
            return {
                link : function(scope, element, attrs) {
                    //inicia o sidenav
                    $(element).sideNav();
                    $(element).delegate($('#btn-open-side-menu'), "click", function(){
                        $(element).parent().parent().parent().find('.side-nav').slideToggle( "1500", "swing" );

                        $('#sidenav-overlay').click(function(){
                            $(element).parent().parent().parent().find('.side-nav').slideUp( "1500", "swing" );
                        });
                        $('.drag-target').click(function(){
                            $(element).parent().parent().parent().find('.side-nav').slideUp( "1500", "swing" );
                        });
                    });
                }
            };
        })
        .directive("initZoomImage", function () {
            return {
                link : function(scope, element, attrs) {
                    //inicia o pluggin de zoom em imagem
                    $(element).each(function () {
                        new RTP.PinchZoom($(this), {});
                    });
                }
            };
        })
        .directive("maskTelCel", function () {
            return {
                link : function(scope, element, attrs) {
                    var options = {
                        onKeyPress: function(val, e, field, options) {
                            putMask();
                        }
                    };

                    $(element).mask('(00) 00000-0000', options);

                    function putMask() {
                        var mask;
                        var cleanVal = element[0].value.replace(/\D/g, '');//pega o valor sem mascara
                        if(cleanVal.length > 10) {//verifica a quantidade de digitos.
                            mask = "(00) 00000-0000";
                        } else {
                            mask = "(00) 0000-00009";
                        }
                        $(element).mask(mask, options);//aplica a mascara novamente
                    }
                }
            };
        });