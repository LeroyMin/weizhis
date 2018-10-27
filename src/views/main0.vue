<template>
	<div>
		<Layout>
			<Header>
				<Menu mode="horizontal" theme="dark">
					<div class="layout-logo"></div>
                    <div class="layout-nav">
                    	<MenuItem>
                    		 <Dropdown style="margin-left: 20px" placement="bottom-end" @on-click="handleClick">
						      <Avatar>{{userName}}</Avatar>
						        <DropdownMenu slot="list">
						          <DropdownItem name="updatePassword">修改密码</DropdownItem>
						          <DropdownItem name="logout">退出</DropdownItem>
						        </DropdownMenu>
						      </Dropdown>
                    	</MenuItem>
                    </div>
				</Menu>
			</Header>
		</Layout>
		<Layout>
			<Sider>
				 <div>
			      <Menu @on-select="gotoRouteHandle">
			        <MenuItem name="home">
			          <Icon type="ios-analytics" />
			           首页
			        </MenuItem>
			        <child-menu
			          v-for="menu in menuList"
			          :key="menu.mid"
			          :menu="menu"
			          :msg="menu.mname"
			          :icon="menu.micon"
			          :dynamicMenuRoutes="dynamicMenuRoutes">
			        </child-menu>
			      </Menu>
			    </div>
			</Sider>
		<Layout>
			<Breadcrumb></Breadcrumb>
			<Content></Content>
		</Layout>
		</Layout>
	</div>
</template>

<script>
  import ChildMenu from './main-sidebar-sub-menu'
	data () {
	      return {
	        loading: true
	      }
    	},
    	components: {
      		ChildMenu
    	},
    	computed: {
      		documentClientHeight: {
	        	get () { return this.$store.state.common.documentClientHeight },
	        	set (val) { this.$store.commit('common/updateDocumentClientHeight', val) }
      		},
	      	sidebarFold: {
	        	get () { return this.$store.state.common.sidebarFold }
	      	},
	     	userId: {
	       		get () { return this.$store.state.user.id },
	        	set (val) { this.$store.commit('user/updateId', val) }
	      	},
	      	userName: {
	        	get () { return this.$store.state.user.name },
	        	set (val) { this.$store.commit('user/updateName', val) }
	      	},
	      	sidebarLayoutSkin: {
		        get () { return this.$store.state.common.sidebarLayoutSkin }
		    },
		    sidebarFold: {
		        get () { return this.$store.state.common.sidebarFold }
		    },
		    menuList: {
		        get () { return this.$store.state.common.menuList },
		    	set (val) { this.$store.commit('common/updateMenuList', val) }
		    },
		    menuActiveName: {
		        get () { return this.$store.state.common.menuActiveName },
		        set (val) { this.$store.commit('common/updateMenuActiveName', val) }
		    },
		    mainTabs: {
		    	get () { return this.$store.state.common.mainTabs },
		        set (val) { this.$store.commit('common/updateMainTabs', val) }
		    },
		    mainTabsActiveName: {
		    	get () { return this.$store.state.common.mainTabsActiveName },
		        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
		    }
    	},
    	 watch: {
	      $route: 'routeHandle'
	    },
	    created () {
	      this.getUserInfo()
	    },
	    mounted () {
	      this.resetDocumentClientHeight()
	    },
	    methods: {
		    // 重置窗口可视高度
		    resetDocumentClientHeight () {
		    	this.documentClientHeight = document.documentElement['clientHeight']
		        window.onresize = () => {
		        	this.documentClientHeight = document.documentElement['clientHeight']
		        }
		    },
	       // 获取当前管理员信息
		    getUserInfo () {
		    	this.$http({
		        	url: this.$http.adornUrl('/sys/user/info'),
		        	method: 'get',
		        	params: this.$http.adornParams()
		        }).then(({data}) => {
		        	if (data && data.sucess === true) {
			            this.loading = false
			            this.userId = data.data.userId
			            this.userName = data.data.username
		          	}
		        })
		    }
      	}
</script>

<style></style>