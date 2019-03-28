<template>
  <div>
    <div class="page-header">{{$t('label.companyList')}}</div>
    <table class="tb-companies">
      <thead>
        <th>{{$t('company.cid')}}</th>
        <th>{{$t('company.name')}}</th>
        <th>{{$t('company.contract_plan')}}</th>
        <th>{{$t('company.videos')}}</th>
        <th colspan="2">{{$t('company.actions')}}</th>
      </thead>
      <tr
        v-for="(company, index) in companies"
        :key="company.id"
        :class="{second: index%2!==0, deleted: Boolean(company.deleted_at)}"
      >
        <td align="left">
          <a href="#">
            <span
              class="table-company-id"
              title="Information"
              v-on:click="activateContent(company.id, 'root.subItems.company.subItems.info')"
            >{{company.cid}}</span>
          </a>
        </td>
        <td>{{company.name}}</td>
        <td>{{company.description}}</td>
        <td align="center" class="cell-icon" title="Video capacity">
          <img
            src="@/assets/images/video_library_black.png"
            v-on:click="activateContent(company.id, 'root.subItems.company.subItems.videos')"
          >
        </td>
        <td align="center" class="cell-icon" title="Edit">
          <img
            v-if="Boolean(!company.deleted_at)"
            src="@/assets/images/edit_black.png"
            v-on:click="activateContent(company.id, 'root.subItems.company.subItems.edit')"
          >
        </td>
        <td align="center" class="cell-icon" title="Delete">
          <img
            v-if="Boolean(!company.deleted_at)"
            src="@/assets/images/delete_black.png"
            v-on:click="deleteCompany(index)"
          >
        </td>
      </tr>
    </table>
  </div>
</template>  

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'companies',
  computed: {
    ...mapGetters(['companies'])
  },
  mounted() {
    this.$store.commit('SET_ACTIVE_COMPANY', '')
    this.$store.dispatch('SAVE_COMPANY_STATE')
  },
  methods: {
    activateContent(companyId, key) {
      this.$store.commit('SET_ACTIVE_COMPANY', companyId)
      this.$store.dispatch('SAVE_COMPANY_STATE')

      if (key === 'root.subItems.company.subItems.videos') {
        this.$store.dispatch('GET_VIDEO_LIST', [
          {field: 'company_id', cond: '=', val: companyId}
        ])
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
    deleteCompany(ind) {
      this.$store.dispatch('DEL_COMPANY', this.companies[ind]).then(
        res => {
          this.informAction('success', `DEL_COMPANY: ${res}`)
        },
        err => {
          this.informAction('error', `DEL_COMPANY: ${err.message}`)
        }
      )
      this.activateContent('', 'root.subItems.home')
    }
  }
}
</script> 

<style lang="scss">
.page-header {
  font-size: 20px;
  margin: 15px;
}
.tb-companies {
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
    padding: 12px 20px;
    padding: 0.75rem;
    vertical-align: middle;
    border-top: 1px solid #dee2e6;
    .table-company-id {
      cursor: pointer;
    }
  }
  .cell-icon {
    width: 5%;
    img {
      cursor: pointer;
    }
  }
  .gray {
    background-color: #f2f2f2;
  }
}
</style>