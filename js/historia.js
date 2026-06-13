var App_Historia = {
    audio: null,
    container: null,

    init: function () {
        this.audio = document.getElementById("bgMusic");
        this.container = document.getElementById("loreContainer");
        
        // Tenta tocar a música (pode ser bloqueado pelo navegador até o primeiro clique)
        // this.startMusic();
        this.observeSections();
        this.bindEvents();
        this.updateProgress();
        let startX = 0;

        this.container.addEventListener("touchstart", function(e){
            startX = e.touches[0].clientX;
        });

        this.container.addEventListener("touchend", function(e){

            let endX = e.changedTouches[0].clientX;
            let diff = startX - endX;

            if(Math.abs(diff) > 50){

                self.container.scrollLeft += diff * 2;

            }

        });
        // Necessário para iniciar a música após a primeira interação do usuário, caso o navegador bloqueie o autoplay
        document.addEventListener(
            "touchstart",
            function(){

                Music.tryPlay();

            },
            { once:true }
        );
    },

    bindEvents: function () {
        var self = this;

        // Transforma a rolagem do mouse (vertical) em rolagem horizontal
        this.container.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                self.container.scrollLeft += e.deltaY * 1.5; // Ajuste a velocidade do scroll aqui
            }
        });

        // Atualiza a barra de progresso ao rolar
        $(this.container).on("scroll", function () {
            self.updateProgress();
        });

        // Evento do Botão de Quiz
        $("#btnQuiz").on("click", function () {
            self.goQuiz();
        });
    },

    startMusic: function () {
        try {
            if (this.audio && this.audio.paused) {
                this.audio.volume = 0.4;
                this.audio.play();
            }
        } catch (e) {
            console.log("Autoplay bloqueado pelo navegador. Aguardando interação do usuário.");
        }
    },

    observeSections: function () {
        // Adiciona a classe 'active' ao card que está no centro da tela para ativar as animações
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass("active");
                    } else {
                        $(entry.target).removeClass("active"); // Retira pra refazer o efeito de zoom quando voltar
                    }
                });
            },
            {
                root: document.getElementById("loreContainer"),
                threshold: 0.6 // Dispara quando 60% do card estiver visível
            }
        );

        $(".chapter").each(function () {
            observer.observe(this);
        });
    },

    updateProgress: function () {
        var scrollLeft = $(this.container).scrollLeft();
        var maxScroll = this.container.scrollWidth - this.container.clientWidth;
        var progress = (scrollLeft / maxScroll) * 100;
        
        // Evita divisão por zero se a tela for muito larga
        if(maxScroll === 0) progress = 100; 

        $("#progressFill").css("width", progress + "%");
    },

    goQuiz: function () {
        localStorage.setItem("historia_lida", "true");
        $("#fadeScreen").addClass("fade-active");

        var self = this;
        var fade = setInterval(function () {
            if (self.audio && self.audio.volume > 0.05) {
                self.audio.volume -= 0.05;
            } else {
                clearInterval(fade);
                if (self.audio) self.audio.pause();
            }
        }, 100);

        setTimeout(function () {
            Music.saveTime();
            window.location.href = "quiz.html";
        }, 1500);
    }
};

$(document).ready(function () {
    App_Historia.init();
});