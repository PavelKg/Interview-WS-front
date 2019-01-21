<template>
  <div>
    <headerArea/>
    <div class='body'>
      <div class='menu-zone'><superMenu/></div>
      <div class='content-zone' v-if="!isLoadCompany"><superContent/></div>
    </div>  
  </div>
</template>

<script>
  import headerArea from '../header'
  import superMenu from '../menu/'
  import superContent from './content'

  export default {
    name: "super-page",
    data() {
      return {
        isLoadCompany: true
      }
    },
    components: {
      headerArea,
      superMenu,
      superContent
    },
    created() {
      this.$store.dispatch('GET_COMPANY_LIST').then( res => {
        this.isLoadCompany = false
      })
    }
  }
</script>

<style lang="scss">
.body {
  display: flex;
  height: 100vh;
  flex-direction: row;
  .menu-zone {
    display: flex;
    flex-grow: 1;
    background-color: #464a4f;
    max-width: 150px;
  }
  .content-zone {
    display: flex;
    flex-grow: 20;
    overflow: auto;
    background-color: #ffffff;
  }
}
</style>
