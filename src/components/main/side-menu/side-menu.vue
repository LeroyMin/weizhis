<template>
	<Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
            <Menu active-name="" theme="light" width="auto" @on-select="gotoRouteHandle">
                <MenuItem name="home">
          			<Icon type="ios-analytics" />
           			首页
        		</MenuItem>
        		<Submenu v-for="menu in menuList" :name="menu.mid" :key="menu.mid">
        			<template slot="title">
	          			<Icon type="icon" />
	          			{{menu.mname}}
        			</template>
        			<MenuItem v-for="item in menu.list" :name='item.mid' :key="item.mid">{{item.mname}}</MenuItem>
      			</Submenu>
            </Menu>
        </Sider>
    </Layout>
</template>

<script>
	export default {
		name: 'SideMenu',
    methods: {
       // 路由操作
      routeHandle (route) {
        if (route.meta.isTab) {
          // tab选中, 不存在先添加
          var tab = this.mainTabs.filter(item => item.name === route.name)[0]
          if (!tab) {
            if (route.meta.isDynamic) {
              route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
              if (!route) {
                return console.error('未能找到可用标签页!')
              }
            }
            tab = {
              menuId: route.meta.menuId || route.name,
              name: route.name,
              title: route.meta.title,
              type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
              iframeUrl: route.meta.iframeUrl || ''
            }
            this.mainTabs = this.mainTabs.concat(tab)
          }
          this.menuActiveName = tab.menuId + ''
          this.mainTabsActiveName = tab.name
        }
      },
       // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
      gotoRouteHandle (itname) {
        console.log(itname)
        if (itname === 'home') {
          this.$router.push({ name: 'home' })
          return
        }
        var route = this.dynamicMenuRoutes.filter(item => item.meta.menuId === itname)
        console.log(route)
        if (route.length >= 1) {
          this.$router.push({ name: route[0].name })
        }
      }
    },
     created () {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
      this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
      this.routeHandle(this.$route)
    }
	}
</script>

<style></style>