var Music = {

    audio: null,

    init: function () {

        this.audio = document.getElementById("bgMusic");

        this.loadTime();

        this.startSync();

        this.tryPlay();

    },

    tryPlay: function () {

        if (!this.audio) return;

        this.audio.volume = 0.5;

        this.audio.play().catch(() => {});

    },

    loadTime: function () {

        let time = localStorage.getItem("music_time");

        if (time) {

            this.audio.currentTime = parseFloat(time);

        }
    },

    startSync: function () {

        setInterval(() => {

            if (!this.audio.paused) {

                localStorage.setItem(
                    "music_time",
                    this.audio.currentTime
                );

            }

        }, 500);

    }
};