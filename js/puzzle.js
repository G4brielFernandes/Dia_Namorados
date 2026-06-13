var App_Puzzle = {

    pieces: [],
    selectedPiece: null,

    init: function () {

        this.createPuzzle();

        this.bindEvents();
    },

    bindEvents: function () {

        var self = this;

        $("#btnShuffle").on("click", function () {

            self.shufflePieces();

        });

        $(document).on("click", ".piece", function () {

            self.selectPiece($(this));

        });

        $("#btnHistory").on("click", function () {

            self.goHistory();

        });
    },
    createPuzzle: function () {

        var board = $("#puzzleBoard");

        board.empty();

        this.pieces = [];

        for (var i = 0; i < 9; i++) {

            this.pieces.push(i);

        }

        this.shufflePieces();

    },

    shufflePieces: function () {

        for (let i = this.pieces.length - 1; i > 0; i--) {

            const j = Math.floor(
                Math.random() * (i + 1)
            );

            [this.pieces[i], this.pieces[j]] =
            [this.pieces[j], this.pieces[i]];
        }

        if (
            this.pieces.join(",") ===
            "0,1,2,3,4,5,6,7,8"
        ) {

            this.shufflePieces();
            return;
        }

        this.renderPuzzle();
    },

   renderPuzzle: function () {

        var board = $("#puzzleBoard");

        board.empty();

        for (var i = 0; i < this.pieces.length; i++) {

            var value = this.pieces[i];

            var row = Math.floor(value / 3);
            var col = value % 3;

            var piece = $("<div>");

            piece.addClass("piece");

            // posição visual
            piece.attr("data-pos", i);

            // valor real da peça (ESSENCIAL)
            piece.attr("data-value", value);

            piece.css(
                "background-position",
                (-col * 110) + "px " + (-row * 110) + "px"
            );

            board.append(piece);
        }
    },

    selectPiece: function (element) {

        if (this.selectedPiece === null) {

            this.selectedPiece = element;
            element.addClass("selected");
            return;
        }

        // posição das peças na tela
        var firstIndex = parseInt(this.selectedPiece.attr("data-pos"));
        var secondIndex = parseInt(element.attr("data-pos"));

        // troca no array REAL
        var temp = this.pieces[firstIndex];
        this.pieces[firstIndex] = this.pieces[secondIndex];
        this.pieces[secondIndex] = temp;

        this.selectedPiece.removeClass("selected");
        this.selectedPiece = null;

        this.renderPuzzle();
        this.checkWin();
    },

    checkWin: function () {
        var certo = [0, 1, 2, 3, 4, 5, 8, 7, 6]
        var certo2 = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        for (var i = 0; i < this.pieces.length; i++) {
            if (String(this.pieces[i]) != String(certo[i]) && String(this.pieces[i]) != String(certo2[i])){
                return
            } 
        }
        localStorage.setItem("puzzle_completo", "true");
        $("#successOverlay").removeClass("hidden");

        $("body").addClass("shake");

        this.startHeartsRain();
        setTimeout(function () {

            $("#successOverlay").addClass("fade-out");

            setTimeout(function () {
                Music.saveTime();
                window.location.href = "historia.html";

            }, 100);

        }, 100);
    },
    startHeartsRain: function() {
        for (let i = 0; i < 30; i++) {
            let heart = $("<div class='heart-rain'>❤️</div>");
            let left = Math.random() * 100;
            let duration = 2 + Math.random() * 3;
            heart.css({
                left: left + "vw",
                animationDuration: duration + "s"
            });

            $("body").append(heart);

            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }
    },
    goHistory: function () {

        Music.saveTime();

        $("#fadeScreen")
            .addClass("fade-active");

        setTimeout(function () {

            window.location.href =
                "historia.html";

        }, 1500);
    }
};

$(document).ready(function () {

    document.addEventListener(
        "pointerdown",
        function () {
            Music.tryPlay();
        },
        { once: true }
    );

    App_Puzzle.init();

});