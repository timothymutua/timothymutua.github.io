let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player("videoPlayer", {
        width: "100%",
        height: "450",

        playerVars: {
            listType: "playlist",
            list: "PLe4uLM1VB8ItC20Kc0ZzcGo3Sd0rpflkJ",
            autoplay: 1,
            loop: 1,
            rel: 0,
            playsinline: 1
        },

        events: {
            onReady: onPlayerReady,
            onError: onPlayerError,
            onStateChange: onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();

    // Shuffle after playlist loads
    setTimeout(() => {
        try {
            player.setShuffle(true);
        } catch (e) {}
    }, 1500);

    const pauseButton = document.getElementById("pauseButton");

    if (pauseButton) {
        pauseButton.addEventListener("click", () => {
            player.pauseVideo();
        });
    }
}

function onPlayerError(event) {
    console.log("YouTube Error:", event.data);

    // Skip unavailable videos
    if ([2, 5, 100, 101, 150].includes(event.data)) {
        console.log("Skipping unavailable video...");
        player.nextVideo();
    }
}

function onPlayerStateChange(event) {
    console.log("State:", event.data);
}