<template>
  <div>
    <div class="page-header">{{$t('label.administratorList')}}</div>
    <table class="tb-administrators">
      <thead>
        <th>{{$t('administrators.uid')}}</th>
        <th>{{$t('administrators.name')}}</th>
        <th>{{$t('administrators.company')}}</th>        
        <th>{{$t('administrators.authority')}}</th>
        <th>{{$t('administrators.last_login')}} (Server time)</th>
        <th colspan="2">{{$t('administrators.management')}}</th>
      </thead>
      <tr
        v-for="(admin, index) in administrators"
        :key="admin.id"
        :class="{second: index%2!==0, deleted: Boolean(admin.deleted_at)}"
      >
        <td align="left">
          <span
            class="table-admin-id"
            title="Edit"
            v-on:click="activateContent(admin.id, 'root.subItems.settings.subItems.adminEdit')"
          >{{admin.uid}}</span>
        </td>
        <td>{{admin.name}}</td>
        <td>{{companyName(admin.company_id)}}</td>
        <td>{{admin.role_name}}</td>
        <td align="center">{{admin.last_login}}</td>
        <td align="center" class="cell-icon" title="Edit">
          <img
            v-if="Boolean(!admin.deleted_at)"
            src="@/assets/images/edit_black.png"
            v-on:click="activateContent(admin.id, 'root.subItems.settings.subItems.adminEdit')"
          >
        </td>
        <td align="center" class="cell-icon" title="Delete">
          <img
            v-if="Boolean(!admin.deleted_at)"
            src="@/assets/images/delete_black.png"
            v-on:click="deleteAdmin(index)"
          >
        </td>
      </tr>
    </table>
  </div>
</template>  

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'administrators',
  data() {
    return {
      isLoadCompany: true  
    }
  },
  computed: {
    ...mapGetters(['administrators', 'companyById']),
  },
  created() {
      this.$store.dispatch('GET_ADMINISTRATORS_LIST').then( res => {
        this.isLoadCompany = false
      })      
  },
  methods: {
    activateContent(adminId, key) {
      this.$store.dispatch('SET_ACTIVE_ADMIN', adminId);
      this.$emit('contentElementClick', key);
    },
    informAction(resType, message) {
      this.$notify({
        group: 'app',
        type: resType,
        title: 'Information',
        text: message
      });
    },
    deleteAdmin(ind) {
      this.$store.dispatch('DEL_ADMINISTRATOR', this.administrators[ind]).then(
        res => {
          this.informAction('success', `DEL_ADMINISTRATOR: ${res}`);
        },
        err => {
          this.informAction('error', `DEL_ADMINISTRATOR: ${err.message}`);
        }
      );
      this.activateContent('', 'root.subItems.settings.subItems.adminList');
    },
    companyName(comanyId) {
      const companyName =  this.companyById(comanyId)
      if (companyName) {
        return companyName.name
      }
      return 'SUPER'
    }     
  }
};
</script> 

<style lang="scss">
.page-header {
  font-size: 20px;
  margin: 15px;
}
.tb-administrators {
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
      cursor: pointer;
    }
  }
  .gray {
    background-color: #f2f2f2;
  }
}
</style>