<template>
  <div class="company-info">
    <div class="company-name">{{company.name}}</div>
    <div class="label">{{$t('company.basic_information')}}</div>
    <div class="item">{{$t('company.cid')}}: {{company.cid}}</div>
    <div class="item">{{$t('company.plan')}}: {{company.plan}}</div>
    <div class="label">{{$t('company.contact')}}</div>
    <div class="item">{{company.zipcode}}</div>
    <div class="item">{{company.address}}</div>
    <div class="item">{{company.department}}</div>
    <div class="item">{{company.contact_name}}</div>
    <div class="item">{{company.email1}}, {{company.email2}}</div>
    <div class="item">{{company.phone1}}, {{company.phone2}}</div>
    <div class="company-res">
      <div class="res-button">{{$t('company.btn_video_capacity_check')}}</div>
      <div class="res-button">{{$t('company.btn_resume_check')}}</div>
    </div>
    <div class="company-mng">
      <div class="mgn-button red">{{$t('label.delete')}}</div>
      <div
        class="mgn-button gray"
        v-on:click="activateContent('root.subItems.home')"
      >{{$t('label.back')}}</div>
      <div
        class="mgn-button blue"
        v-on:click="activateContent('root.subItems.company.subItems.edit')"
      >{{$t('label.edit')}}</div>
    </div>
  </div>
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
      return this.companyData;
    }
  },
  created() {
    this.companyData = this.companies.find(el => {
      if (el.id === this.activeCompanyId) {
        return el;
      }
    });
  },
  methods: {
    activateContent(key) {
      this.$emit('contentElementClick', key);
    }
  }
};
</script>

<style lang="scss">
.company-info {
  display: flex;
  flex-direction: column;
  margin: 15px;
  .company-name {
    font-size: 38px;
    padding: 10px 10px;
  }
  .label {
    font-size: 18px;
    padding: 10px 0;
  }
  .item {
    font-size: 16px;
    padding: 5px 0;
  }
  .company-res {
    display: flex;
    flex-direction: column;
    padding: 15px;
    .res-button {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 250px;
      height: 40px;
      margin-bottom: 10px;
      background: #4472c4;
      color: #ffffff;
    }
  }
  .company-mng {
    display: flex;
    flex-direction: row;
    padding: 15px;
    .mgn-button {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 100px;
      height: 40px;
      margin-right: 10px;
      color: #ffffff;
    }
    .blue {
      background: #4472c4;
    }
    .red {
      background: #ef444e;
    }
    .gray {
      background: #767171;
    }
  }
}
</style>