var App_Final = {

    text:
    "❤️ EU TE AMO PRINCESA ❤️",

    index: 0,

    init: function () {

        // this.startMusic();

        this.typeWriter();

        this.createHearts();
        document.body.addEventListener('click', () => this.startMusic(), { once: true });

        this.bindEvents();
    },

    bindEvents: function () {

        $("#btnLetter").on(
            "click",
            function () {

                $("#letterModal")
                    .css(
                        "display",
                        "flex"
                    );
            }
        );

        $("#closeModal").on(
            "click",
            function () {

                $("#letterModal")
                    .hide();
            }
        );
    },

    startMusic: function () {

        try {

            var audio =
                document.getElementById(
                    "bgMusic"
                );

            audio.volume = 0.5;

            audio.play();

        } catch(e) {

            console.log(e);
        }
    },

    typeWriter: function () {

        var self = this;

        if (
            self.index <
            self.text.length
        ) {

            $("#loveMessage").append(
                self.text.charAt(
                    self.index
                )
            );

            self.index++;

            setTimeout(
                function () {

                    self.typeWriter();

                },
                150
            );
        }
    },

    createHearts: function () {

        setInterval(function () {

            var heart =
                $("<div>");

            heart.addClass("heart");

            heart.html("❤️");

            heart.css({

                left:
                Math.random() * 100 + "%",

                top:"-20px",

                animationDuration:
                (Math.random() * 4 + 4)
                + "s"
            });

            $("body")
                .append(heart);

            setTimeout(
                function () {

                    heart.remove();

                },
                8000
            );

        }, 300);
    }
};

$(document).ready(function () {

    App_Final.init();

});