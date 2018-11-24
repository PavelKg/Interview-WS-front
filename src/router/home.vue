<template>
<div id="home">
  <img src="../assets/images/IntervieW.png" class="avatar">
  <router-link :to="'login'">Login</router-link>
</div>  
</template>

<script>
  
</script>

<style lang="scss">
  #home {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    flex-flow: column;
    padding-top: 150px;
    image {
      padding: 50px 0;
    }
    .bottom {
      padding-left: 150px;
      display: block;
    }
  }

</style>

