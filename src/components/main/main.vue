<template>
	<div>
		<Layout>				
			<head-bar></head-bar>
			<Layout>
				<side-menu></side-menu>
				<Layout>
					<Breadcrumb></Breadcrumb>
					<Content></Content>
				</Layout>
			</Layout>
		</Layout>
	</div>
</template>

<script>
  import SideMenu from './side-menu/side-menu'
  import HeadBar from './head-bar/head-bar'
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

<style></style>
