<template>
	<Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
            <Menu active-name="" theme="light" width="auto">
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
		name: 'SideMenu'
	}
</script>

<style></style>