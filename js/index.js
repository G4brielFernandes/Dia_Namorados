var App_Index = {

    audio: null,

    init: function () {

        this.audio = document.getElementById("bgMusic");

        this.bindEvents();

        this.resetProgress();
    },
    
    bindEvents: function () {

        var self = this;
        $("#btnStart").on("click", function () {

                 localStorage.setItem(
                "music_allowed",
                "true"
            );

            var audio =
                document.getElementById(
                    "bgMusic"
                );
            audio.play();
            self.startJourney();
        });
        
    },

    startJourney: function () {
        localStorage.setItem(
            "jornada_iniciada",
            "true"
        );
        $("#fadeScreen").addClass("fade-active");

        setTimeout(function () {
            window.location.href = "puzzle.html";
        }, 1500);
    },

    resetProgress: function () {

        if (!localStorage.getItem("primeiro_acesso")) {

            localStorage.clear();

            localStorage.setItem(
                "primeiro_acesso",
                "true"
            );
        }
    }
};

$(document).ready(function () {

    App_Index.init();

});