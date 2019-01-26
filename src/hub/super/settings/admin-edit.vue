<template>
  <div class="administrators-data">
    <div v-if="formActionIsReg" class="action-name">
      {{$t('administrators.new_account_add')}}
      <span class="label-red-start">*{{$t('label.required')}}</span>
    </div>
    <div v-else class="action-name">
      {{$t('administrators.administrator_info')}}
      <span class="label-red-start">*{{$t('label.required')}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'administrators-edit',
  data() {
    return {
      administrators_props: {}
    }
  },
  computed: {
    ...mapGetters(['activeAdminData', 'activeAdminId']),
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
        this.administrators_props= {}
      }
    }
  },
  mounted() {
    if (this.activeAdminData) {
      this.administrators_props = this.activeAdminData
    }
  }, 
  methods: {
    handleInput(elem, value) {
      this.administrators_props[elem] = value;
    },
    informAction (resType, message) {
      this.$notify({
        group: 'app',
        type: resType,
        title: 'Information',
        text: message
      });
    },
    formActionApply() {
      let actionName = ''
      if (this.formActionIsReg) {
        actionName = 'ADD_ADMINISTRATOR'
      } else {
        actionName = 'UPDATE_ADMINISTRATOR'
      }

      this.$store.dispatch(actionName, this.administrators_props).then( 
        res => {
          this.informAction('success', `${actionName}: ${res}`)
        }, 
        err => {
          this.informAction('error', `${actionName}: ${err.message}`)
        }
      )
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

