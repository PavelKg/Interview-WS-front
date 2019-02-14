<template>
  <div>
    <div v-if="formActionIsReg" class="administrators-data">
      <div class="action-name">
        {{$t('administrators.new_account_add')}}
        <span
          class="label-red-start"
        >*{{$t('label.required')}}</span>
      </div>
      <div class="flex-row">
        <input
          id="uid"
          required
          :placeholder="$t('administrators.uid')"
          v-model="administrators_props.uid"
          @input="handleInput('uid', $event.target.value)"
        >
        <div class="helper-form-button">
          <span>{{$t('administrators.btn_genId')}}</span>
        </div>
      </div>
      <div class="flex-row">
        <input
          id="FullName"
          required
          :placeholder="$t('administrators.full_name')"
          v-model="administrators_props.name"
          @input="handleInput('name', $event.target.value)"
        >
        <input
          id="department"
          required
          :placeholder="$t('administrators.department')"
          v-model="administrators_props.department"
          @input="handleInput('department', $event.target.value)"
        >
      </div>
      <div class="flex-row">
        <select
          id="company_id"
          :placeholder="$t('administrators.company')"
          v-model="administrators_props.company_id"
          @input="handleInput('company_id', $event.target.value)"
        >
          <option
            v-for="company in actingCompanies" 
            :disabled="company.disabled"
            :key="company.id"
            :value="company.id"
          >{{ $t(company.name) }}</option>
        </select>
      </div>      
      <div class="flex-row">
        <select
          id="authority"
          :placeholder="$t('administrators.authority')"
          v-model="administrators_props.role"
          @input="handleInput('role', $event.target.value)"
        >
          <option
            v-for="option in authority_options"
            :disabled="option.disabled"
            :key="option.value"
            :value="option.value"
          >{{ $t(option.text) }}</option>
        </select>
      </div>
      <div class="flex-row">
        <input
          id="email"
          required
          :placeholder="$t('administrators.email')"
          v-model="administrators_props.email"
          @input="handleInput('email', $event.target.value)"
        >
      </div>
      <div class="flex-row">
        <input
          id="password"
          required
          :placeholder="$t('administrators.password')"
          v-model="administrators_props.password"
          @input="handleInput('password', $event.target.value)"
        >
      </div>
    </div>
    <div v-else class="administrators-data">
      <div class="action-name">
        {{$t('administrators.administrator_info')}}
        <span
          class="label-red-start"
        >*{{$t('label.required')}}</span>
      </div>
      <div class="flex-row">
        <div class="label-element">
          <span>{{$t('administrators.uid')}}:</span>
        </div>
        <input
          id="uid"
          required
          :placeholder="$t('administrators.uid')"
          v-model="administrators_props.uid"
          @input="handleInput('uid', $event.target.value)"
        >
      </div>
      <div class="flex-row">
        <div class="label-element">
          <span>{{$t('administrators.full_name')}}:</span>
        </div>                
        <input
          id="FullName"
          required
          :placeholder="$t('administrators.full_name')"
          v-model="administrators_props.name"
          @input="handleInput('name', $event.target.value)"
        >
      </div>
      <div class="flex-row">
        <div class="label-element">
          <span>{{$t('administrators.company')}}:</span>
        </div>                        
        <select
          id="company_id"
          :placeholder="$t('administrators.company')"
          v-model="administrators_props.company_id"
          @input="handleInput('company_id', $event.target.value)"
        >
          <option
            v-for="company in companies" 
            :disabled="company.disabled"
            :key="company.id"
            :value="company.id"
          >{{ $t(company.name) }}</option>
        </select>
      </div>           
      <div class="flex-row">      
        <div class="label-element">
          <span>{{$t('administrators.department')}}:</span>
        </div>        
        <input
          id="department"
          required
          :placeholder="$t('administrators.department')"
          v-model="administrators_props.department"
          @input="handleInput('department', $event.target.value)"
        >
      </div>
      <div class="flex-row">
        <div class="label-element">
          <span>{{$t('administrators.email')}}:</span>
        </div>                
        <input
          id="email"
          required
          :placeholder="$t('administrators.email')"
          v-model="administrators_props.email"
          @input="handleInput('email', $event.target.value)"
        >
      </div>
      <div class="flex-row">
        <div class="label-element">
          <span>{{$t('administrators.authority')}}:</span>
        </div>
        <select
          id="authority"
          :placeholder="$t('administrators.authority')"
          v-model="administrators_props.role"
          @input="handleInput('role', $event.target.value)"
        >
          <option
            v-for="option in authority_options"
            :disabled="option.disabled"
            :key="option.value"
            :value="option.value"
          >{{ $t(option.text) }}</option>
        </select>
      </div> 
      <div class="flex-row">
        <div class="label-element">
          <span>{{$t('administrators.new_pass')}}:</span>
        </div>        
        <input
          id="password"
          required
          :placeholder="$t('administrators.new_pass')"
          v-model="administrators_props.password"
          @input="handleInput('password', $event.target.value)"
        >
      </div>
    </div>
    <div class="administrator-mng">
      <div
        v-if="!formActionIsReg"
        class="mgn-button red"
        v-on:click="deleteAdministrator()"
      >{{$t('label.delete')}}</div>
      <div
        class="mgn-button gray"
        v-on:click="activateContent('root.subItems.settings.subItems.adminList')"
      >{{$t('label.back')}}</div>
      <div
        class="mgn-button blue"
        v-on:click="formActionApply"
      >{{$t(actionBtnCaption)}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'administrators-edit',
  data() {
    return {
      administrators_props: {role: ''},

      authority_options: [
        {
          text: 'administrators.choose_option',
          value: '',
          disabled: true,
          selected: true
        },
        { text: 'super', value: '1' },
        { text: 'editor', value: '2' },
        { text: 'viewer', value: '3' }
      ]
    };
  },
  computed: {
    ...mapGetters(['activeAdminData', 'activeAdminId', 'companies', 'actingCompanies']),
    formActionIsReg() {
      return this.activeAdminId === '';
    },
    actionBtnCaption() {
      const label = this.formActionIsReg ? 'label.register' : 'label.change';
      return label;
    }
  },
  watch: {
    formActionIsReg(newVal, oldVal) {
      if (newVal) {
        this.administrators_props = {};
      }
    }
  },
  mounted() {
    console.log('this.activeAdminData=', this.activeAdminData)
    if (this.activeAdminData) {
      this.administrators_props = this.activeAdminData;
    }
  },
  methods: {
    handleInput(elem, value) {
      this.administrators_props[elem] = value;
    },
    informAction(resType, message) {
      this.$notify({
        group: 'app',
        type: resType,
        title: 'Information',
        text: message,
        duration: 10000
      });
    },
    activateContent(key) {
      this.$emit('contentElementClick', key);
    },
    formActionApply() {
      let actionName = '';
      if (this.formActionIsReg) {
        actionName = 'ADD_ADMINISTRATOR';
      } else {
        actionName = 'UPDATE_ADMINISTRATOR';
      }

      this.$store.dispatch(actionName, this.administrators_props).then(
        res => {
          this.informAction('success', `${actionName}: ${res}`);
        },
        err => {
          this.informAction('error', `${actionName}: ${err.message}`);
        }
      );
    },
    deleteAdministrator() {
    }
  }
};
</script>

<style lang="scss">
.administrators-data {
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
  .label-element {
    font-size: 16px;
    padding-right: 10px;
    min-width: 120px;    
  }
  .item {
    font-size: 16px;
    padding: 5px 0;
  }
  .flex-row {
    display: flex;
    padding-bottom: 10px;
    align-items: center;
  }
  input {
    height: 23px;
    width: 200px;
    margin-right: 10px;
  }
  select {
    font-size: 14px;
    height: 30px;
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
}
.administrator-mng {
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
</style>  

