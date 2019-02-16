<template>
  <div id="app">
    <router-view class="view"></router-view>
    <notifications group="app" position="bottom right" width="500" />
  </div>
</template>

<script>
export default {
  name: 'App'
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
