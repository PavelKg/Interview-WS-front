<template>
  <div>
    <div class="company-info" v-if="companyInfo">{{companyInfo}}</div>
    <div class="page-header">{{$t('label.storageVideoCapacity')}}: 6GB / 10GB</div>
    <table class="tb-videos">
      <thead>
        <th>{{$t('videos.check')}}</th>
        <th>{{$t('videos.state')}}</th>
        <th>{{$t('videos.sub_date')}}</th>
        <th>{{$t('videos.company_id')}}</th>
        <th>{{$t('videos.company_name')}}</th>
        <th>{{$t('videos.view')}}</th>
        <th>{{$t('videos.video_format')}}</th>
      </thead>
      <tr
        v-for="(video, index) in videos"
        :key="video.id"
        :class="{second: index%2!==0, deleted: Boolean(video.deleted_at)}"
      >
        <td align="center">
          <b-form-checkbox :id="`check-${video.id}`" :name="'check'+video.id"></b-form-checkbox>
        </td>
        <td align="center">
          <img
            class="img-active"
            src="@/assets/images/outline_lock_black.png"
            @click="activateContent(video.filename, 'root.subItems.company.subItems.player')"
          >
        </td>
        <td align="center">{{video.created_at}}</td>
        <td>
          <a
            href="#"
            @click="activateContent(video.company_id, 'root.subItems.company.subItems.info')"
          >{{video.company_cid}}</a>
        </td>
        <td>{{video.company_name}}</td>
        <td align="center" class="cell-icon" :title="video.filename">
          <img
            class="img-active"
            src="@/assets/images/baseline_play_circle_white.png"
            @click="activateContent(video.id, 'root.subItems.company.subItems.player')"
          >
        </td>
        <td v-if="extFormat(video.filename) === 'mp4'" align="center" class="cell-icon">
          <img src="@/assets/images/mp4-music-file-format.png">
        </td>
        <td v-else align="center" class="cell-icon">
          <img src="@/assets/images/m3u8-file-format.png">
        </td>        
      </tr>
    </table>
  </div>
</template>  

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'videos',
  data() {
    return {
      isLoadVideo: true
    }
  },
  computed: {
    ...mapGetters(['videos', 'activeCompanyId', 'companyById']),
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
    const video_list = this.videos
    const compId = this.activeCompanyId
    let reqConstr = {field: 'company_id', cond: '>', val: 0}
    if (Boolean(compId)) {
      reqConstr = {...reqConstr, cond: '=', val: compId}
    }

    if (video_list.length === 0) {
      this.$store.dispatch('GET_VIDEO_LIST', [reqConstr])
    }
  },
  methods: {
    activateContent(contentId, key) {
      console.log('contentId==',contentId)
      switch (key) {
        case 'root.subItems.company.subItems.info':
          this.$store.commit('SET_ACTIVE_COMPANY', contentId)
          break
        case 'root.subItems.company.subItems.player':
          this.$store.dispatch('SET_ACTIVE_VIDEO', contentId)
          break
        default:
          this.$store.dispatch('SET_ACTIVE_VIDEO', contentId)
          break
      }
      this.$emit('contentElementClick', key)
    },
    informAction(resType, message) {
      this.$notify({
        group: 'app',
        type: resType,
        title: 'Information',
        text: message
      })
    },
    extFormat(file) {
      const re = /\.[A-z0-9]{3,4}$/gi
      const found = file.match(re);
      return found[0].slice(1)
    }
  }
}
</script> 

<style lang="scss">
.company-info {
  font-size: 20px;
  margin: 15px;
}
.page-header {
  font-size: 20px;
  margin: 15px;
}
.tb-videos {
  width: 100%;
  max-width: 100%;
  margin-bottom: 16px;
  margin-bottom: 1rem;
  background-color: transparent;
  border-collapse: collapse;
  th {
    padding: 15px 0;
    border-bottom: 2px solid #dee2e6;
    background: #6e6e70;
    color: #ffffff;
    text-align: center;
  }
  tr {
    background: #ffffff;
    &.second {
      background: #dcdcde;
    }
    &:hover {
      background: #bdbec1;
    }
    &.deleted {
      color: red;
    }
  }
  td {
    padding: 12px;
    padding: 0.75rem;
    vertical-align: middle;
    border-top: 1px solid #dee2e6;
    .table-admin-id {
      cursor: pointer;
    }
  }
  .cell-icon {
    width: 5%;

    img {
      max-width: 48px;
      max-height: 48px;
    }
    .img-active {
      cursor: pointer;
    }
  }
  .gray {
    background-color: #f2f2f2;
  }
}
</style>