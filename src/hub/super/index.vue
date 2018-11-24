<template>
  <div>
    <headerArea/>
    <div class='body'>
      <div class='menu-zone'><superMenu/></div>
      <div class='content-zone'><superContent/></div>
    </div>  
  </div>
</template>

<script>
  import headerArea from '../header'
  import superMenu from './menu'
  import superContent from './content'

  export default {
    name: "super-page",
    components: {
      headerArea,
      superMenu,
      superContent
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
    flex-grow: 15;
    overflow: auto;
    div {
      height: 300vh;
    }
  }
}
</style>
