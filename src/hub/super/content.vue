<template>
  <div class='content'>
  </div>  
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "content-area",
    computed: {
      ...mapGetters([
        'companies',
      ]),
    }
  }
</script> 

<style lang="scss">
  .content {
    padding: 20px 20px;
    width: 100%;
    .tb-companies {
      width: 100%;
      max-width: 100%;
      margin-bottom: 16px;
      margin-bottom: 1rem;
      background-color: transparent;
      border-collapse: collapse;
      th {
        padding: 15px 0;
        border-bottom: 2px solid #dee2e6;
      }
      td {
        padding: 12px;
        padding: .75rem;
        vertical-align: middle; 
        border-top: 1px solid #dee2e6;
      }
      .cell-icon {
        width: 5%;
      }
      .gray {
          background-color: #f2f2f2;
      }
    }
  }
</style>