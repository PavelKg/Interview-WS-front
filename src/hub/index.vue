<template>
  <div>
    <div class='header-zone'><headerArea/></div>      
    <div class='menu-zone' v-if="!isSmallScreen || isMenuVisible"><menuArea/></div>
    <div class='body'>
      <div class='content-zone' v-if="!isLoadCompany "><!--superContent/--></div>
    </div>  
  </div>
</template>

<script>
  import headerArea from './header'
  import menuArea from './menu/'
  //import superContent from './content'

  export default {
    name: "super-page",
    data() {
      return {
        isLoadCompany: true
      }
    },
    components: {
      headerArea,
      menuArea,
      //superContent
    },
    created() {
      this.$store.dispatch('GET_COMPANY_LIST').then( res => {
        this.isLoadCompany = false
      })
    },
    computed: {
      isMenuVisible() {
        return this.$store.getters.userMenuVisible
      },
      isSmallScreen() {
        return this.$store.getters.windowsRect['width'] < 768
      }
    }
  }
// :style="[isMenuVisible ? {'width':'150px'} : {'width':'0px'}]"  
</script>

<style lang="scss">
.header-zone {
  position: fixed; /* Stay in place */
  width: 100%;
  height: 50px;
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
}
.menu-zone {
  position: fixed; /* Stay in place */
  height: 100%;
  background-color: #464a4f;
  width: 150px; /* 0 width - change this with JavaScript */
  z-index: 1; /* Stay on top */
  left: 0;
  top: 50px;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 10px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}
.body {
  display: flex;
  margin-left: 150px;
  margin-top: 50px;
  flex-direction: column;
  .content-zone {
    display: flex;
    flex-grow: 20;
    overflow: auto;
    background-color: #ffffff;
  }
}

@media screen and (max-width: 768px) {
  //.menu-zone {width: 0px;}
  .body {margin-left: 0px;}
}
</style>
