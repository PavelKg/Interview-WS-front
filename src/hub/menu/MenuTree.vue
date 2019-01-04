<template>
  <div class="menu-item">
    <div class="menu-item-name" @click="handleClick(node)">
      <span v-if="node.caption" class="caption">{{$t(node.caption)}}</span>
      <div v-if="node.isSection" class="triangle-bottom" :class="{triangleActive: node.isOpen}"/>
    </div>
    <div v-if="node.subItems && node.subItems.length && node.isOpen">
      <node
        v-for="subItems in node.subItems"
        :node="subItems"
        :key="subItems.type"
        :handle-click="handleClick"
      ></node>
    </div>
  </div>
</template>

<script>
export default {
  name: 'node',
  data() {
    return {
      showChildren: true
    };
  },
  props: {
    node: Object,
    ind: Number,
    handleClick: Function
  },
  mounted() {
    //console.log('this.$props.node=', this.$props.node);
  },
  methods: {
  }
};
</script>

<style lang="scss">
.menu-item {
  font-size: 0.9em;
  display: flex;
  align-content: space-between;
  flex-direction: column;
  padding: 15px 10px 15px 2px;
  color: white;
  cursor: pointer;
  .menu-item-name {
    display: flex;
    flex-direction: row;
    .caption {
    }
    .triangle-bottom {
      width: 10px;
      margin-left: auto;
      &:before {
        position: relative;
        right: 0;
        top: 65%;
        color: #999;
        margin-top: 4px;
        border-style: solid;
        border-width: 5px 5px 0;
        border-color: #999 transparent transparent;
        content: '';
      }
    }
  }

  .triangleActive {
    transform: rotate(180deg);
  }
  .sub-menu-item {
    display: flex;
  }
}
.last {
  border-bottom: 0px;
}
</style>
>
