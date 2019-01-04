<template>
  <div class="menu-table">
    <menu-tree :node="userMenu" :handle-click="handleClick"></menu-tree>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuTree from './MenuTree'

export default {
  name: 'menu-area',
  components: {
    MenuTree
  },
  mounted() {
    this.$store.dispatch('LOAD_MENU_STATE')
  },
  data() {
    return {
      menuTree: {}
    };
  },
  computed: {
    ...mapGetters(['userMenu']),
    menuItems() {
      return this.userMenu.subItems
    }
  },
  methods: {
    handleClick(node) {
      console.log('ind=', node);
      if (node.isSection) {
        this.$store.commit('SECTION_STATE', node.type)
        //node.isOpen = !node.isOpen;
      }
      //this.$store.commit('SECTION_STATE', ind)
      this.$store.dispatch('SAVE_MENU_STATE')
    }    
  }
};
</script>  

<style lang='scss'>
  .menu-table {
    display: flex;
    padding: 10px 0;
    flex-direction: column;
    flex: 1 1 0;
    font-size: 24px;
  }
</style>