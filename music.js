var Music = {

    init: function(){

        var audio =
            document.getElementById(
                "bgMusic"
            );

        if(!audio) return;

        let savedTime =
            localStorage.getItem(
                "music_time"
            );

        if(savedTime){

            audio.currentTime =
                parseFloat(savedTime);

        }

        document.body.addEventListener(
            "click",
            function(){

                audio.play();

            },
            { once:true }
        );

        setInterval(function(){

            if(!audio.paused){

                localStorage.setItem(
                    "music_time",
                    audio.currentTime
                );

            }

        }, 1000);

    },

    saveTime: function(){

        var audio =
            document.getElementById(
                "bgMusic"
            );

        if(audio){

            localStorage.setItem(
                "music_time",
                audio.currentTime
            );

        }

    }

};