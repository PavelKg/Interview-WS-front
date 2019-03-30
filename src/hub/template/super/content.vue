<template>
  <div class='content'>
    <component v-bind:is="activePage" v-on:contentElementClick="contentElementClick"></component>
  </div>  
</template>

<script>
  import { mapGetters } from 'vuex'
  import root_home from './company/list'
  import root_company_info from './company/info'
  import root_company_edit from './company/edit'
  import root_company_add from './company/edit'
  import root_company_videos from './videos/list'
  import root_company_resumes from './videos/list'
  import root_company_player from './videos/player'
  import root_email_check from './mail/check'
  import root_email_make from './mail/make'
  import root_email_notif from './mail/notif'
  import root_settings_adminAdd from './settings/admin-edit'
  import root_settings_adminEdit from './settings/admin-edit'
  import root_settings_adminList from './settings/admin-list'

  export default {
    name: "content-area",
    computed: {
      ...mapGetters(['userMenuActiveItem']),
      activePage() {
        let activeItem = 'root_home'
        if (this.userMenuActiveItem) {
          activeItem = this.userMenuActiveItem
          activeItem = activeItem.replace(/\.subItems/g, '').replace(/\./g, '_')
        }
        return activeItem
      }
    },
    methods: {
      contentElementClick(key) {
        console.log('key=', key)
        this.$store.commit('ITEM_STATE', key)
        this.$store.dispatch('SAVE_COMPANY_STATE') 
        this.$store.dispatch('SAVE_MENU_STATE') 
      }
    },
    components: {
      root_home,
      root_company_info,
      root_company_edit,
      root_company_add,
      root_company_videos,
      root_company_resumes,
      root_company_player,
      root_email_check,
      root_email_make,
      root_email_notif,
      root_settings_adminAdd,
      root_settings_adminEdit,
      root_settings_adminList
    }
  }
</script> 

<style lang="scss">
  .content {
    padding: 20px 20px;
    width: 100%;
  }
</style>