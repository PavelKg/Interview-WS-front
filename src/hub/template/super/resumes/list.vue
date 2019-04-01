<template>
  <div>
    <div class="company-info" v-if="companyInfo">{{companyInfo}}</div>
    <div class="page-header">{{$t('label.resumesList')}}</div>
    <table class="tb-resumes">
      <thead>
        <th>{{$t('resumes.check')}}</th>
        <th>{{$t('resumes.rid')}}</th>
        <th>{{$t('resumes.sub_date')}}</th>
        <th>{{$t('resumes.resume_link')}}</th>
        <th>{{$t('resumes.contact')}}</th>
      </thead>
      <tr
        v-for="(resume, index) in resumes"
        :key="resume.id"
        :class="{second: index%2!==0, deleted: Boolean(resume.deleted_at)}"
      >
        <td align="center">
          <b-form-checkbox :id="`check-${resume.id}`" :name="'check'+resume.id"></b-form-checkbox>
        </td>
        <td align="center">
          <img
            class="img-active"
            src="@/assets/images/outline_lock_black.png"
            @click="activateContent(resume.filename, 'root.subItems.company.subItems.player')"
          >
        </td>
        <td align="center">{{resume.created_at}}</td>
        <td>
          <a
            href="#"
            @click="activateContent(resume.company_id, 'root.subItems.company.subItems.info')"
          >{{resume.company_cid}}</a>
        </td>
        <td>{{resume.company_name}}</td>
      </tr>
    </table>
  </div>
</template>  

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'resume-list',
  data() {
    return {
      isLoadResumes: true,
    }
  },
  computed: { 
    ...mapGetters(['resumes', 'activeCompanyId', 'companyById']),
    companyInfo() {
      if (this.activeCompanyId) {
        const compInfo = this.companyById(this.activeCompanyId)
        return `ID: ${compInfo.cid} / ${compInfo.name}`.toUpperCase()
      } else {
        return false
      }
    },
   },
  mounted() {},
  methods: {}
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
.tb-resumes {
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