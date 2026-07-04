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
            playlist: "PLe4uLM1VB8ItC20Kc0ZzcGo3Sd0rpflkJ", // Required for looping
            rel: 0,
            playsinline: 1
        },

        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();

    // Shuffle once the playlist has loaded
    setTimeout(() => {
        try {
            player.setShuffle(true);
            player.playVideo();
        } catch (e) {
            console.log("Shuffle not available:", e);
        }
    }, 1500);

    const pauseButton = document.getElementById("pauseButton");
    if (pauseButton) {
        pauseButton.addEventListener("click", () => {
            player.pauseVideo();
        });
    }
}

function onPlayerStateChange(event) {
    // If video ends, automatically play the next shuffled video
    if (event.data === YT.PlayerState.ENDED) {
        player.nextVideo();
    }
}

function onPlayerError(event) {
    console.log("YouTube Error:", event.data);

    // Skip blocked/private/deleted videos
    if ([2, 5, 100, 101, 150].includes(event.data)) {
        player.nextVideo();
    }
}

function pauseVideo() {
    if (player) {
        player.pauseVideo();
    }
}