<template>
  <div id="app">
    <router-view class="view"></router-view>
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
    overflow: auto;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
