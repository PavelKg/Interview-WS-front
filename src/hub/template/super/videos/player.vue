<template>
  <div class="browse-video-area">
    <div class="zone-company-info">
      <p>{{companyInfo}}</p>
      <p>{{fileInfo}}</p>
    </div>
    <div class='player-zone'>
      <video ref="videoPlayer" controls></video>
    </div>
    <div class='player-link-zone'>
      <a href='#' @click="activateContent(videoCompanyId, 'root.subItems.company.subItems.info')">Back to the company page</a>
      <a href='#' @click="activateContent(0, 'root.subItems.home')">Back to the HOME</a>
    </div>
  </div>  
</template>

<script>
import Hls from 'hls.js'
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['activeVideoInfo']),
    videoInfo() {
      if (this.activeVideoInfo) {
        return this.activeVideoInfo
      }
    },
    companyInfo() {
      const info = this.videoInfo
      return `ID: ${info.company_cid} / ${info.company_name}`.toUpperCase()
    },
    videoCompanyId() {
      return this.videoInfo.company_id
    },
    fileInfo() {
      return this.videoInfo.filename
    }
  },

  mounted() {
    if (!this.activeVideoInfo.id) {
      this.$store.dispatch('LOAD_ACTIVE_VIDEO_FILE')
    }
    
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
  },
  methods: {
    activateContent(contentId, key) {
      console.log('contentId=', contentId)
      switch (key) {
        case 'root.subItems.company.subItems.info':
          this.$store.commit('SET_ACTIVE_COMPANY', contentId)
          break
        default:
          break
      }
      this.$emit('contentElementClick', key)
    },
  } 
}
</script>
<style lang="scss">
  .browse-video-area {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .zone-company-info {
      padding-left: 20px;
    }
    .player-zone {
      display: flex;
      flex-direction: row;
      padding: 20px;
      video {
        width: 870px;
        height: 500px;
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
