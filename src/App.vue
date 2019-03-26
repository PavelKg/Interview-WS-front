<template>
  <div id="app">
    <router-view class="view"></router-view>
    <notifications group="app" position="bottom right" width="500" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      window: {
        width: 0,
        height: 0,
        mobileWidth: 768
      }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      let rect = {}
      rect.width  = window.innerWidth
      rect.height = window.innerHeight;
      this.$store.commit('windowsResize', rect); 
      if (rect.width < this.window.mobileWidth) (
        this.$store.commit('MENU_HIDE') 
      )
      //this.window.width = window.innerWidth;
      //this.window.height = window.innerHeight;

    }
  }
}
</script>

<style lang="scss">
  @import "./assets/styles";
  body {
    background-color: white;
    margin: 0; 
    // height: 100%; 
    // overflow: hidden;
    font-family: Arial, Helvetica, sans-serif;
  }
  .vue-notification {
    border-radius: 4px;
  }
</style>
