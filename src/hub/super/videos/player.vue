<template>
  <div>
    <span>Player</span>
    <video ref="videoPlayer" controls autoplay ></video>
  </div>
</template>
<script>
import Hls from 'hls.js'

export default {
 mounted() {
   let video = this.$refs.videoPlayer;
   if(Hls.isSupported()) {
     console.log("hello hls.js!");
    var hls = new Hls();
    hls.loadSource('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
    })
  } else {
      addSourceToVideo(video, 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8', 'video/mp4');
      video.play();
    }

    function addSourceToVideo(element, src, type) {
      var source = document.createElement('source');
      source.src = src;
      source.type = type;
      element.appendChild(source);
    }
 } 
}
</script>
<style lang="scss">

</style>
>
