<template>
	<div class="layout">
		<Layout>				
			<head-bar></head-bar>
			<Layout>
				<side-menu></side-menu>
				<Layout :style="{padding: '0 24px 24px'}">
					<Breadcrumb :style="{margin: '24px 0'}"></Breadcrumb>
					<Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}"></Content>
				</Layout>
			</Layout>
		</Layout>
	</div>
</template>

<script>
  import SideMenu from '_c/main/side-menu/side-menu'
  import HeadBar from '_c/main/head-bar/head-bar'
  export default {
  	data () {
  		return {
  			
  		}
  	},
  	components: {
  		SideMenu,
  		HeadBar
  	}
  }
</script>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
