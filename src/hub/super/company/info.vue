<template>
  <div class="content">CompanyInfo for {{company}}</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'companies-info',
  date() {
    return {
      companyData: {
        name: ''
      }
    };
  },
  computed: {
    ...mapGetters(['companies', 'activeCompanyId']),
    company() {
      return this.companyData
    }
  },
  created() {
    this.companyData = this.companies.find(el => {
      if (el.id === this.activeCompanyId) {
        return el;
      }
    })
    console.log(this.companyData)
  }
};
</script>