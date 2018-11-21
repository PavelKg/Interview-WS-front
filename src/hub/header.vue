<template>
  <div class='header'>
    <div class='app-title'>{{ $t('message.appHeader') }}</div>
    <div class='user-info'>
      <img src="../assets/images/acc-circle-white-24dp.png" class="user-logo">
      <span>{{user_name}}</span>
    </div>
  </div>  
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: {},
    name: "headerArea",
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      user_name() {
        return this.user.name
      }
    }
  }
    
</script>

<style lang="scss">
.header {
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #464a4f;
  height: 50px;
  top: 0px;
  left: 0px;
}
.app-title {
  display: flex;
  flex-grow: 20;
  align-items: center;
  font-size: 28px;
  color: white;
  padding-left: 20px;
}
.user-info {
  display: flex;
  flex-grow: 2;
  justify-content: flex-end;
  flex-direction: row;
  padding-right: 20px;

  span {
    padding-left: 10px;
    font-size: 20px;
    color: white;
    align-self: center;

  }
  .user-logo {
    padding: 2px 0;
    width: auto;
  }
}
</style>