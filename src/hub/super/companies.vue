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