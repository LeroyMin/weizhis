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
			<side-menu></side-menu>
		<Layout>
			<Breadcrumb></Breadcrumb>
			<Content></Content>
		</Layout>
		</Layout>
	</div>
</template>

<script>
  import SideMenu from './side-menu/side-menu'
</script>

<style></style>