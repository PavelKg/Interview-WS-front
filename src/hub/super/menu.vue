<template>
<div class='menu-table'>
  <div class='menu-item'>{{$t('menu.home')}}</div>
  <div class='menu-item'><span>HGHGHGJHJdfghdfhfghfgh</span></div>
</div>  
</template>

<script>
  export default {
    name: "menu-area",
  }
</script>  

<style lang="scss">
.menu-table {
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  flex: 1 1 0;
  .menu-item {
      padding: 15px 5px;
      color: white;
      span {
        display: block;
        width: 100%;
      }
  }
}
</style>