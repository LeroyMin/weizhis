<template>
  <div>
      <Submenu name="menu.mid">
        <template slot="title">
          <Icon type="icon" />
          {{msg}}
        </template>
        <MenuItem v-for="item in menu.list" :name='item.mid' :key="item.mid">{{item.mname}}</MenuItem>
      </Submenu>
  </div>
</template>

<script>
  import ChildMenu from './main-sidebar-sub-menu'
  export default {
    name: 'child-menu',
    props: {
      menu: {
        type: Object,
        required: true
      },
      dynamicMenuRoutes: {
        type: Array,
        required: true
      },
      msg:{
        type: String,
        required: false
      },
      icon: {
        type: String,
        required: false
      }
    },
    components: {
      ChildMenu
    },
    computed: {
      sidebarLayoutSkin: {
        get () { return this.$store.state.common.sidebarLayoutSkin }
      }
    },
    methods: {
    }
  }
</script>
