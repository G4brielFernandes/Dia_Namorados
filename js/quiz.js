var App_Quiz = {

    currentQuestion: 0,

    hearts: 5,

    questions: [

        {
            question: "Onde foi nosso primeiro encontro?",
            answers: [
                "Cinema",
                "Praia",
                "Parque",
                "Bebelu no Shopping"
            ],
            correct: 3
        },

        {
            question: "Onde aconteceu nosso primeiro beijo?",
            answers: [
                "Na praia",
                "No shopping",
                "No Bebelu",
                "No carro"
            ],
            correct: 1
        },

        {
            question: "Qual foi nossa primeira viagem?",
            answers: [
                "Serra",
                "Interior",
                "Praia",
                "Hotel"
            ],
            correct: 2
        },

        {
            question: "Onde aconteceu o pedido de namoro?",
            answers: [
                "Shopping",
                "Praia",
                "Restaurante",
                "Cinema"
            ],
            correct: 1
        },

        {
            question: "Qual a data que começou nossa história?",
            answers: [
                "08/12/2024",
                "08/11/2024",
                "12/08/2024",
                "10/12/2024"
            ],
            correct: 0
        }

    ],

    init: function () {

        // this.startMusic();

        this.renderQuestion();
    },

    startMusic: function () {

        var audio =
            document.getElementById("bgMusic");

        try {

            audio.volume = 0.5;

            audio.play();

        } catch (e) {

            console.log(e);
        }
    },

    renderQuestion: function () {

        var q =
            this.questions[
                this.currentQuestion
            ];

        $("#questionTitle")
            .text(q.question);

        $("#answersContainer")
            .empty();

        for (
            var i = 0;
            i < q.answers.length;
            i++
        ) {

            $("#answersContainer")
                .append(
                    `
                    <button
                        class="answer-btn"
                        onclick="App_Quiz.checkAnswer(${i})">
                        ${q.answers[i]}
                    </button>
                    `
                );
        }

        this.updateProgress();
    },

    checkAnswer: function (index) {

        var q =
            this.questions[
                this.currentQuestion
            ];

        if (index === q.correct) {

            this.currentQuestion++;

            if (
                this.currentQuestion >=
                this.questions.length
            ) {

                this.finishQuiz();

                return;
            }

            setTimeout(() => {

                this.renderQuestion();

            }, 500);

        } else {

            this.hearts--;

            this.updateHearts();

            if (this.hearts <= 0) {

                alert(
                    "Você perdeu todas as vidas ❤️"
                );

                location.reload();
            }
        }
    },

    updateHearts: function () {

        var html = "";

        for (
            var i = 0;
            i < this.hearts;
            i++
        ) {

            html += "❤️ ";
        }

        $("#heartsContainer")
            .html(html);
    },

    updateProgress: function () {

        var progress =
            (
                this.currentQuestion /
                this.questions.length
            ) * 100;

        $("#progressBar")
            .css(
                "width",
                progress + "%"
            );
    },

    finishQuiz: function () {

        localStorage.setItem(
            "quiz_completo",
            "true"
        );

        $(".quiz-container")
            .hide();

        $("#successScreen")
            .removeClass("hidden");

        var percent = 0;

        var interval =
            setInterval(function () {

                percent++;

                $("#loadingBar")
                    .css(
                        "width",
                        percent + "%"
                    );

                if (percent >= 100) {

                    clearInterval(interval);

                    $("#fadeScreen")
                        .addClass(
                            "fade-active"
                        );

                    setTimeout(function () {
                        Music.saveTime();

                        window.location.href =
                            "historia.html";
                        window.location.href =
                            "final.html";

                    }, 1000);
                }

            }, 50);
    }
};

$(document).ready(function () {
    document.body.addEventListener('click', () => this.startMusic(), { once: true });

    App_Quiz.init();

});