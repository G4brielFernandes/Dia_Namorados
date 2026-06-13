var Music = {

    audio: null,

    init: function() {

        this.audio =
            document.getElementById(
                "bgMusic"
            );

        if(!this.audio){
            return;
        }

        this.audio.addEventListener(
            "loadedmetadata",
            () => {

                let savedTime =
                    localStorage.getItem(
                        "music_time"
                    );

                if(savedTime){

                    this.audio.currentTime =
                        parseFloat(savedTime);
                }

            }
        );

        document.addEventListener(
            "pointerdown",
            () => {

                this.tryPlay();

            },
            { once:true }
        );

        document.addEventListener(
            "touchstart",
            () => {

                this.tryPlay();

            },
            { once:true }
        );

        document.addEventListener(
            "click",
            () => {

                this.tryPlay();

            },
            { once:true }
        );

        setInterval(() => {

            if(
                this.audio &&
                !this.audio.paused
            ){

                localStorage.setItem(
                    "music_time",
                    this.audio.currentTime
                );

            }

        }, 1000);

    },

    tryPlay: function() {

        if(!this.audio){
            return;
        }

        this.audio.play()
            .catch(() => {});

    },

    saveTime: function() {

        if(this.audio){

            localStorage.setItem(
                "music_time",
                this.audio.currentTime
            );

        }

    }
};