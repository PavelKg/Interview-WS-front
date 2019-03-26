<template>
  <div>
    <div class="page-header">{{$t('label.storageVideo')}}</div>
    <table class="tb-videos">
      <thead>
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
        <td>          
          <img
            class="img-active"
            src="@/assets/images/baseline_play_circle_white.png"
            v-on:click="activateContent(videos.filename, 'root.subItems.company.subItems.player')"
          >
          <img
            class="img-active"
            src="@/assets/images/baseline_play_circle_white.png"
            v-on:click="activateContent(videos.filename, 'root.subItems.company.subItems.player')"
          >
        </td>
        <td align="center">{{video.created_at}}</td>
        <td>{{video.company_id}}</td>
        <td>{{video.company_id}}</td>
        <td align="center" class="cell-icon" title="Edit">
          <img
            class="img-active"
            src="@/assets/images/baseline_play_circle_white.png"
            v-on:click="activateContent(videos.filename, 'root.subItems.company.subItems.player')"
          >
        </td>
        <td align="center" class="cell-icon">
          <img src="@/assets/images/mp4-music-file-format.png">
        </td>
      </tr>
    </table>
  </div>
</template>  

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'administrators',
  data() {
    return {
      isLoadVideo: true
    }
  },
  computed: {
    ...mapGetters(['videos'])
  },
  created() {
    this.$store.dispatch('GET_VIDEO_LIST', [{field:"id", cond:"=", val:2}]).then(res => {
      this.isLoadVideo = false
    })
  },
  methods: {
    activateContent(adminId, key) {
      this.$store.dispatch('SET_ACTIVE_ADMIN', adminId)
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
    deleteAdmin(ind) {
      this.$store.dispatch('DEL_ADMINISTRATOR', this.administrators[ind]).then(
        res => {
          this.informAction('success', `DEL_ADMINISTRATOR: ${res}`)
        },
        err => {
          this.informAction('error', `DEL_ADMINISTRATOR: ${err.message}`)
        }
      )
      this.activateContent('', 'root.subItems.settings.subItems.adminList')
    },
    companyName(comanyId) {
      const companyName = this.companyById(comanyId)
      if (companyName) {
        return companyName.name
      }
      return 'SUPER'
    }
  }
}
</script> 

<style lang="scss">
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