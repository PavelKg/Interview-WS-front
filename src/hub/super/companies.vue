<template>    
  <table class="tb-companies">
    <thead>
    <tr>
      <th>#</th>
      <th>{{$t('company.name')}}</th>
      <th>{{$t('company.description')}}</th>
      <th></th>
      <th></th>
    </tr>
    <tr v-for="(company, index) in companies" :key="company.name" >
      <td align='center'>{{index}}</td>
      <td>{{company.name}}</td>
      <td>{{company.description}}</td>
      <td align='center' class="cell-icon"><img src="../../assets/images/edit_black.png"></td>
      <td align='center' class="cell-icon"><img src="../../assets/images/delete_black.png"></td>
    </tr>
    </thead>
  </table>  
</template>  

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "companies",
    computed: {
      ...mapGetters([
        'companies',
      ]),
    }
  }
</script> 

<style lang="scss">
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
</style>