<template>
  <div class="browse-video-area">
    <div class='player-zone'>
      <video ref="videoPlayer" controls></video>
      <div class="player-zone-company-info">
        <p></p>
        <p>https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8</p>
      </div>
    </div>
    <div class='player-link-zone'>
      <span>Back to the company page</span>
      <span>Back to the HOME</span>
    </div>
  </div>  
</template>

<script>
import Hls from 'hls.js'

export default {
  computed: {
    ...mapGetters(['videos']),
    videoInfo() {
      return this.videos[0]
    },
    companyInfo() {
      if (this.activeCompanyId) {
        const compInfo = this.companyById(this.activeCompanyId)
        return `ID: ${compInfo.cid} / ${compInfo.name}`.toUpperCase()
      } else {
        return false
      }
    },
  },
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
        addSourceToVideo(video, 'https://p0.oc.kg:8081/video/c/hd3/Mortal_Engines_HD.mp4', 'video/mp4');
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
  .browse-video-area {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .player-zone {
      display: flex;
      flex-direction: row;
      padding: 20px;
      video {
        max-width: 870px;
        max-height: 500px;
      }
      .player-zone-company-info {
        padding: 0 40px ;
      }
    }
    .player-link-zone {
      padding: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;      
      width: 50%;
    }
  } 
  @media (max-width: 768px) {
      video {
        width: 350px;
        height: 250px;
      }
  } 
  @media (max-width: 400px) {
      video {
        width: 200px;
        height: 150px;
      }
  }   
</style>
