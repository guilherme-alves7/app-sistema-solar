paginaSelected = null; //index global da pagina atual do carousel
owl = null; //instancia global do carousel

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
                .when("/exercicios2", {
                    templateUrl: "content/exercicios/2.html",
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
                        { nome: "Movimento de Rotação", page: 4, elem: "#movimento-rotacao" },
                        { nome: "Movimento de Translação", page: 5, elem: "#movimento-translacao"},
                    ]
                },
                {
                    nome: "Os planetas do Sistema Solar",
                    page: 6,
                    elem: "#planetas-sistema-solar",
                    subitens: [
                        { nome: "Mercúrio", page: 6, elem: "#planeta-mercurio"},
                        { nome: "Vênus", page: 7, elem: "#planeta-venus"},
                        { nome: "Terra", page: 8, elem: "#planeta-terra"},
                        { nome: "Marte", page: 9, elem: "#planeta-marte"},
                        { nome: "Júpiter", page: 10, elem: "#planeta-jupiter"},
                        { nome: "Saturno", page: 11, elem: "#planeta-saturno"},
                        { nome: "Urano", page: 12, elem: "#planeta-urano"},
                        { nome: "Netuno", page: 13, elem: "#planeta-netuno"},
                        { nome: "Plutão, o planeta anão", page: 14, elem: "#planeta-plutao"}
                    ]
                }
            ];
            
            $scope.listaExercicios = [
                {
                    nome: "Lista de Exercícios 1", 
                    page:'/exercicios1',
                    exercicios: [
                        {gabarito: 'A', acertou: null, alternativa_resp: null},
                        {gabarito: 'C', acertou: null, alternativa_resp: null}
                    ]
                },
                {
                    nome: "Lista de Exercícios 2", 
                    page:'/exercicios2',
                    exercicios: [
                        {gabarito: 'B', acertou: null, alternativa_resp: null},
                        {gabarito: 'D', acertou: null, alternativa_resp: null}
                    ]
                }
            ];

            $scope.abrePagina = function(page, elem){ //abre a pagina de um item escolhido no sumario
                $('.drag-target').trigger('click'); //fecha o NavSide
                owl.goTo(page-1);  // vai para a pagina selecionada

                var coordenada_elem = $(elem).offset().top - 50;
                $('.conteudo-educacional').animate({ //rola pagina ate o elemento
                    scrollTop: coordenada_elem
                }, 1000);
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
            
            $scope.responderExerc = function(num_lista, respostas){
                var qnt_questoes = Object.keys(respostas).length;
                var index_lista = num_lista - 1;

                var array_respostas = [];
                for(var m = 0; m < qnt_questoes; m++){ //percorre respostas adicionando as em um array
                    //adiciona item no array
                    array_respostas.push({
                        resp: respostas[m]
                    });
                }

                //compara respostas com o gabarito
                for(var i = 0; i < array_respostas.length; i++){ //percorre array de respostas
                    if(array_respostas[i].resp === $scope.listaExercicios[index_lista].exercicios[i].gabarito){ //resposta correta
                        $scope.listaExercicios[index_lista].exercicios[i].acertou = true;
                    }
                    else{ //resposta errada
                        $scope.listaExercicios[index_lista].exercicios[i].acertou = false;
                    }
                    $scope.listaExercicios[index_lista].exercicios[i].alternativa_resp = array_respostas[i].resp; //salva a resposta do usuario
                }

                var $toastContent = $('<span>Respostas enviadas com sucesso <i class="material-icons">check_circle</i></span>');
                Materialize.toast($toastContent, 5000);
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
                    $(element).owlCarousel({
                        navigation: false,
                        paginationSpeed : 1000,
                        goToFirstSpeed : 2000,
                        singleItem : true,
                        autoHeight : true,
                        addClassActive: true,
                        pagination: true,
                        paginationNumbers: true,
                        afterMove : function(){ //ao trocar de pagina
                            //move o scroll para o topo
                            $('.conteudo-educacional').animate({
				scrollTop: 0
                            }, 1);

                            //salva o index da pagina atual
                            var pagina_slide = $(element).find('.active').index();
                            paginaSelected = pagina_slide;
                        }
                    });

                    owl = $(element).data('owlCarousel'); //salva a instancia do carousel em variavel global

                    if(paginaSelected !== null){ //se a pagina estiver definida, movo o slide para ela
                        setTimeout(function() {
                            owl.goTo(paginaSelected);  // vai para a pagina selecionada
                        }, 500);
                    }
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
        .directive("initModalImgs", function () {
            return {
                link : function(scope, element, attrs) {
                    //inicia modal
                    $(element).find('.grid-img').on('click', function(){
                        //substitui src da img no modal
                        var img = $(this).find('img').attr('src');
                        $('.modal-zoom-img').find('img').attr('src', img);
                        $('.modal-zoom-img').openModal();

                        //inicia pluggin de zoom no modal
                        $('.modal-zoom-img').find('.zoom-img').each(function () {
                            new RTP.PinchZoom($(this), {});
                        });
                    });
                }
            };
        })
        .directive("initModal", function () {
            return {
                link : function(scope, element, attrs) {
                    //inicia modal
                    $(element).find('.modal-trigger').leanModal();
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

        /*corrigir fonte de img:
         * Urano
         * Jupiter
         * Marte
         * Terra
        */
