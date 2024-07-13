var player;

function onYouTubeIframeAPIReady() {
player = new YT.Player('videoPlayer', {
events: {
'onReady': onPlayerReady
}
});
}

function onPlayerReady(event) {
var pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', function() {
player.pauseVideo();
});
}

function pauseVideo() {
player.pauseVideo();
}
function onPlayerReady(event) {
event.target.playVideo();
setTimeout(setShuffleFunction, 1000);           
}
function setShuffleFunction(){
player.setShuffle(true);
}
