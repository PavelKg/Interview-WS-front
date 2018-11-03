<template>
    <div id="login-form">
      <div id="header"></div>
      <form class="login" @submit.prevent="login">
      <div class="logo-container"><img src="../assets/images/logo.png" class="avatar"></div>
      <div class='locales-container'>
        <div class='locale' v-for="(locale, index) in locales" :key="locale.code" @click="switchLocale(locale.code)">
          <span v-if="index!==0">|</span>
          <span class='locale-item' :class="{ active: locale.code===activeLocale}">{{locale.code}}</span>
        </div>
      </div>  
      <div class="field-container">
        <div id="company_id" class="field-row">
          <label>{{ $t("message.company_id") }}</label>
          <input id="company_id"/>
          <div class="right_space"/>
        </div>
        <div id="user_id" class="field-row">
          <label>{{ $t("message.personal_id") }}</label>
          <input id="personal_id"/>
          <div class="right_space"/>
        </div>
        <div id="password" class="field-row">
          <label>{{ $t("message.password") }}</label>
          <input id="password"/>
          <div class="right_space"/>
        </div>
      </div>
      <div class='button-container'>
        <button type="submit" v-on:click="switchLocale()">{{ $t("message.btnLogin") }}</button>
      </div>
      </form>
      <a href="#" class="password-recovery">{{ $t("message.lnkPassRec")}}</a>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  mounted () {
    this.$store.commit('INIT_LANG')
  },
  methods: {
    login() {
      const { username, password } = this
      //this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
      //this.$router.push('/')
      //})
    },
    switchLocale (code) {
      this.$i18n.locale = code
    },
  },
  computed: {
    ...mapGetters([
      'locales'
    ]),
    activeLocale () {
        return this.$i18n.locale 
    }
  }  
}
</script>

<style lang="scss">
  #header {
    height: 100px
  }

  #login-form {
    display: flex;
    flex-direction: column;
    max-width: 900px;
    background-color: #fff;
    margin: 0 auto;
    padding: 0 60px;
  }
  .logo-container {
    //text-align: center;
    //margin: 24px 0 12px 0;
    display: flex;
    justify-content: center;
  }
  .locales-container {
    display: flex;
    justify-content: center;
    padding-left: 100px;
  }
  .locale { 
    span { color: #cfcfcf }
    span.active { color: #4272c4 }
    span.locale-item {
      margin-right: 4px;
      cursor: pointer;
    }
    span.locale-item:hover { color: #4272c4 }
  }
  .field-container {
    padding-top: 40px;
  }
  .field-row {
    display: flex;
    align-content: space-between;
    margin-bottom: 10px;
    height: 30px;
    label {
      flex-grow:3;
      text-align: right;
      padding-right: 30px;
      line-height: 1.6;
      flex-shrink: 1;
      flex-basis: 0%;
      font-size: 20px;
    }
    input {
      flex-grow: 2;
      flex-shrink: 1;
      flex-basis: 0%;
      //width: 35%;
      //margin-right: 300px;
    }
    .right_space {
      flex-grow: 2;
      flex-shrink: 1;
      flex-basis: 0%;
    }
  }
  .button-container {
    padding: 20px 0;
    display: flex;
    justify-content: center;    
  }
  button {
    background-color: #4272c4;
    border: none;
    font-size: 20px; 
    padding: 10px 40px;
    color: #fff;
    cursor: pointer;
    text-transform: uppercase;
    &:hover {
      opacity: 0.8;
    }
  }
  .password-recovery{
    display: flex;
    justify-content: center;    
  }

</style>


