<template>
  <div class='content'>
    <Companies/>
  </div>  
</template>

<script>
  import { mapGetters } from 'vuex'
  import Companies from './companies'

  export default {
    name: "content-area",
    computed: {},
    components: {
      Companies
    }
  }
</script> 

<style lang="scss">
  .content {
    padding: 20px 20px;
    width: 100%;
  }
</style>