<template>
  <div class='content'>
    CompanyEdit
  </div>  
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'companies-edit',
  computed: {
    ...mapGetters(['companies', 'activeCompanyId'])
  }
}

</script>