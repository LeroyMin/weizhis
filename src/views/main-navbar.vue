<template>
  <div>
    <div class="navbar">
      <Dropdown style="margin-left: 20px" placement="bottom-end" @on-click="handleClick">
      <Avatar>{{userName}}</Avatar>
        <DropdownMenu slot="list">
          <DropdownItem name="updatePassword">修改密码</DropdownItem>
          <DropdownItem name="logout">退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </div>
</template>

<script>
  import UpdatePassword from './main-navbar-update-password'
  import { clearLoginInfo } from '@/utils'
  export default {
    data () {
      return {
        updatePassowrdVisible: false
      }
    },
    components: {
      UpdatePassword
    },
    computed: {
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold },
        set (val) { this.$store.commit('common/updateSidebarFold', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      userName: {
        get () { return this.$store.state.user.name }
      }
    },
    methods: {
      handleClick (name) {
        switch(name){
          case 'updatePassword':
            this.updatePasswordHandle()
            break
          case 'logout':
            this.logoutHandle()
            break
        }
      },
      // 修改密码
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      },
      exlogout () {
         this.$http({
            url: this.$http.adornUrl('/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              clearLoginInfo()
              this.$router.push({ name: 'login' })
            }
          }).catch(() => {})
      },
      // 退出
      logoutHandle () {
        this.$Modal.confirm({
          'title':'确定进行[退出]操作?',
          'okText': '确定',
          'cancelText': '取消',
          'onOk':this.exlogout
        })
      }
    }
  }
</script>
<style>
  .navbar{
    position: absolute;
    top:3px;
    right:6px;
  }
</style>