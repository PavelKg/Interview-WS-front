<template>
  <div class="company-data">
    <div v-if="formActionIsReg" class="action-name">
      {{$t('company.data_reg')}}
      <span class="label-red-start"> *{{$t('label.required')}}</span>
    </div>
    <div v-else class="action-name">
      {{$t('company.data_change')}}
      <span class="label-red-start">*{{$t('label.required')}}</span>
    </div>
    <div class="label">{{$t('company.basic_information')}} <span class="label-red-start">*</span></div>
    <div class="flex-row">
      <input
        id="company_cid"
        required
        :placeholder="$t('company.cid')"
        @input="handleInput('companyId', $event.target.value)"
      >
      <div class="helper-form-button"><span>{{$t('company.btn_genId')}}</span></div>
    </div>
    <div class="flex-row">
      <input
        id="company_name"
        required
        :placeholder="$t('company.name')"
        @input="handleInput('companyName', $event.target.value)"
      >    
    </div>
    <div class="label">{{$t('company.address')}} / {{$t('company.contact')}}</div>
    <div class="flex-row">
      <input
        id="company_zipcode"
        required
        :placeholder="$t('company.zipcode')"
        @input="handleInput('companyZipcode', $event.target.value)"
      >    
      <div class="helper-form-button"><span>{{$t('company.btn_search')}}</span></div>
      <input
        id="company_address"
        required
        :placeholder="$t('company.address')"
        @input="handleInput('companyAddress', $event.target.value)"
      >    
    </div>
    <div class="flex-row">
      <input
        id="company_department"
        required
        :placeholder="$t('company.depart_and_pos')"
        @input="handleInput('companyDepartment', $event.target.value)"
      >    
      <input
        id="company_contact"
        required
        :placeholder="$t('company.contact_name')"
        @input="handleInput('companyContact', $event.target.value)"
      >          
    </div>
    <div class="flex-row">
      <input
        id="company_email1"
        required
        :placeholder="`${$t('company.email')} 1`"
        @input="handleInput('companyEmail1', $event.target.value)"
      >    
      <input
        id="company_email2"
        required
        :placeholder="`${$t('company.email')} 2`"
        @input="handleInput('companyEmail2', $event.target.value)"
      >          
    </div>
    <div class="flex-row">
      <input
        id="company_phone1"
        required
        :placeholder="`${$t('company.phone')} 1`"
        @input="handleInput('companyPhone1', $event.target.value)"
      >    
      <input
        id="company_phone2"
        required
        :placeholder="`${$t('company.phone')} 2`"
        @input="handleInput('companyPhone2', $event.target.value)"
      >          
    </div>
      <div
        class="mgn-button blue"
      >{{$t(this.actionBtnCaption)}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'companies-edit',
  computed: {
    ...mapGetters(['companies', 'activeCompanyId']),
    formActionIsReg() {
      return this.activeCompanyId === '';
    },
    actionBtnCaption() {
      const label = this.formActionIsReg ? 'label.register' : 'label.change'
      return label
    }
  }
};
</script>

<style lang="scss">
.company-data {
  display: flex;
  flex-direction: column;
  margin: 15px;
  .action-name {
    font-size: 22px;
    padding: 10px 10px;
    font-weight: 700;
  }
  .label-red-start {
    padding: 0 12px 0 2px;
    font-size: 12px;
    color: #ef444e;
  }  
  .label {
    font-size: 18px;
    padding: 10px 0;
  }
  .item {
    font-size: 16px;
    padding: 5px 0;
  }
  .flex-row { 
    display: flex;
    padding-bottom: 10px;
  }
  input {
      height: 23px;
      width: 200px;
      margin-right: 10px;
  }
  .helper-form-button {
    display: flex;
    text-align: center;
    align-items: center;
    border: 1px solid #bfc0c2;
    padding: 3px 7px;
    margin-right: 10px;
    background: #d0cece;
    cursor: pointer;
    &:hover {
      border: 1px solid #aeaeaf;
      background: #aeaeaf;
    }
  }
  .mgn-button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100px;
    height: 40px;
    margin-top: 10px;
    color: #ffffff;
  }
  .blue {
    background: #4472c4;
  }

}
</style>  