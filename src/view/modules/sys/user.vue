<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" :buttons="buttons" @on-click="action" @on-delete="handleDelete"/>
      <Page :total="page.total" :page-size="page.limit" :current="page.page" on-change="changePage" show-elevator />
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
import { addUser,getUserInfo,updateUser,remove } from '@/api/sysuser'
import { getRoleList } from '@/api/sysrole'
export default {
  inject: ['reload'],
  name: 'user',
  components: {
    Tables
  },
  data () {

    return {
      columns: [
        {title: '用户ID', key: 'userId'},
        {title: '用户名', key: 'userName'},
        {title: '邮箱', key: 'email'},
        {title: '手机号', key: 'mobile'},
        {title: '创建时间', key: 'createTime'},
		{
            title: 'Action',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params,vm) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                            },
                        style: {
                            marginRight: '5px'
                            },
                        on: {
                            click: () => {
                                this.edit(params.index)
                                }
                            }
                        }, '编辑'),
                    h('Button', {
                        props: {
                            type: params.row.status == '0' ? 'success':'error',
                            size: 'small'
                            },
                        on: {
                            click: () => {
                                 this.remove(params.index,params.row.status)
                             }
                         }
                     }, params.row.status == '0' ? '解冻' : '冻结')
                 ]);
            }
        }
        ],
      tableData: [],
      page: {
      	total: 0,
      	page: 1,
      	limit: 5
      },
      buttons:[
      	{
      		text: '新增',
      		icon: 'ios-add',
      		action: 'add',
      		key: 'add',
      		type: 'primary'
      	}
      ],
      newUserInfo: {
      	userName: '',
      	password: '',
      	email: '',
      	mobile: '',
      	roleIdList: []
      },
      userForm: {
      	userId: '',
      	userName: '',
      	password: '',
      	email: '',
      	mobile: '',
      	roleIdList: []
      },
      roleList:[]
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    edit(index) {
    	getUserInfo(this.tableData[index].userId).then(res => {
    		if (res.data&&res.data.success) {
    			this.userForm = res.data.data
    			this.genModel(index)
    		}else{
    			this.$Message(res.data.message)
    		}
    	}).catch(err => {
    		this.$Message("服务器繁忙")
    	})
    	
    },
    genModel(index){
    	this.$Modal.confirm({
                    title: '编辑',
                    width: 500,
                    closable: false,
                    okText: '保存',
                    cancelText: '取消',
                    onOk: () => {
                    	updateUser(this.userForm).then(res=>{
                    		if (res.data&&res.data.success) {
                    			this.$set(this.tableData, index, this.userForm)
                    			this.$Notice.success({
                    				title: '提示信息',
                    				desc: '更新成功'
                    			})
                    		}else{
                    			this.$Notice.error({
                    				title: '提示信息',
                    				desc: `更新失败,${res.data.message}`
                    			})
                    		}
                    	}).catch(err => {
                    		this.$Notice.error({
                    				title: '提示信息',
                    				desc: '更新失败,服务器繁忙'                    			
                    		})
                    	})
                    },
                    onCancel: () => {this.$Modal.remove()},
                    render: (h, params,vm) => {
                    	return h('Form',{
                    		props:{
                    			'label-position': 'left',
                    			'label-width': 60
                    		}
                    	},[
                    		h('FormItem',{
                    			props:{
                    				label: '用户ID'
                    			}
                    		},[
                    			h('Input',{
                    				props: {
                    					type: 'text',
                    					readonly: true,
                    					disabled: true,
                    					value: this.userForm.userId
                    				},
                    				on: {input: (value) => { this.userForm.userId = value }}
                    			})
                    			]),
                    		h('FormItem',{
                    			props:{
                    				label: '用户名'
                    			}
                    		},[
                    			h('Input',{
                    				props: {
                    					type: 'text',
                    					value: this.userForm.userName
                    				},
                    				on: {input: (value) => { this.userForm.userName = value }}
                    			})
                    			]),
                    		h('FormItem',{
                    			props:{
                    				label: '邮箱'
                    			}
                    		},[
                    			h('Input',{
                    				props: {
                    					type: 'text',
                    					value: this.userForm.email
                    				},
                    				on: {input: (value) => { this.userForm.email = value }}
                    			})
                    			]),
                    		h('FormItem',{
                    			props:{
                    				label: '手机号'
                    			}
                    		},[
                    			h('Input',{
                    				props: {
                    					type: 'text',
                    					value: this.userForm.mobile
                    				},
                    				on: {input: (value) => { this.userForm.mobile = value }}
                    			})
                    			]),
                    		h('FormItem',{
                    			props: {
                    				label: '角色'
                    			}
                    		},[
                    			h('Select',{
                    				props: {
                    					multiple: true,
                    					placement: 'top',
                    					value: this.userForm.roleIdList
                    				},
                    				on: {input: (value) => {this.userForm.roleIdList = value}}
                    			},this.roleList.map((item)=>{
                    				return h('Option',{
                    					props: {
                    						value: item.roleId,
	        								label: item.roleName
                    					}
                    				})
                    			}))
                    		])
                    		])
                    }
                })
    },
    remove(index,status){
    	if(status == '0'){
    		this.$Modal.confirm({
    			title: '解冻',
	        	okText: '解冻',
	            cancelText: '取消',
	            onOk: () => {
	            	remove(this.tableData[index].userId, status).then(res => {
	            		if (res.data&&res.data.success) {
	            			this.tableData[index].status='1'
	            		}
	            	})
	            },
	            onCancel: () => {this.$Modal.remove()},
	        	content: `确定要取消冻结用户 ${this.tableData[index].userName}?`
    		})
    	}else{
	        this.$Modal.confirm({
	        	title: '是否冻结?',
	        	okText: '冻结',
	            cancelText: '取消',
	            onOk: () => {
	            	remove(this.tableData[index].userId, status).then(res => {
	            		if (res.data&&res.data.success) {
	            			this.tableData[index].status='0'
	            		}
	            	})
	            },
	            onCancel: () => {this.$Modal.remove()},
	        	content: `确定要冻结用户 ${this.tableData[index].userName}?`
	        })
    	}
    },
    action(name){
    	// 新增
    	if (name === 'add') {
	    		this.$Modal.confirm({
	        	title: '新增用户',
	        	okText: '保存',
	            cancelText: '取消',
	            onOk: () => {
	            	addUser(this.newUserInfo).then(res => {
	            		if (res.data&&res.data.success) {
	            			this.reload()
	            			this.$Notice.success({
                    				title: '提示信息',
                    				desc: '更新成功'
                    			})
	            		}else{
	            			this.$Notice.error({
                    				title: '提示信息',
                    				desc: `操作失败,${res.data.message}`
                    			})
	            		}
	            	})
	            },
	            onCancel: () => {this.$Modal.remove()},
	        	render: (h, params,vm) => {
	        		return h('Form',{
	        			props: {
	        				'label-position': 'left',
	        				'label-width': 60
	        			}
	        		},[
	        			h('FormItem',{
	        				props: {
	        					label: '用户名'
	        				}
	        			},[
	        				h('Input',{
	        					props: {
	        						type: 'text',
	        						value: this.newUserInfo.userName
	        					},
	        					on: {input: (value) => { this.newUserInfo.userName = value }}
	        				})
	        			]),
	        			h('FormItem',{
	        				props: {
	        					label: '密码'
	        				}
	        			},[
	        				h('Input',{
	        					props: {
	        						type: 'text',
	        						value: this.newUserInfo.password
	        					},
	        					on: {input: (value) => { this.newUserInfo.password = value }}
	        				})
	        			]),
	        			h('FormItem',{
	        				props: {
	        					label: '邮箱'
	        				}
	        			},[
	        				h('Input',{
	        					props:{
	        						type: 'email',
	        						value: this.newUserInfo.email
	        					},
	        					on: {input: (value) => { this.newUserInfo.email = value }}
	        				})
	        			]),
	        			h('FormItem',{
	        				props: {
	        					label: '手机号'
	        				}
	        			},[
	        				h('Input',{
	        					props: {
	        						type: 'text',
	        						value: this.newUserInfo.mobile
	        					},
	        					on: {input: (value) => { this.newUserInfo.mobile = value }}
	        				})
	        			]),
	        			h('FormItem',{
	        				props: {
	        					label: '角色'
	        				}
	        			},[
	        				h('Select',{
	        					props:{
	        						multiple: true,
	        						placement: 'top'
	        					},
	        					on: {input: (value) => {this.newUserInfo.roleIdList=value}}
	        				},this.roleList.map((item)=>{
	        					return h('Option',{
	        						props:{
	        							value: item.roleId,
	        							label: item.roleName
	        						}
	        					})
	        				}))
	        			])
	        		])
	        	}
        	})
    	}
    },
    changePage(){

    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    getTableData(this.page).then(res => {
    	if (res.data&&res.data.success) {
    		this.tableData = res.data.data.list
    		this.page.total = res.data.data.totalCount
    		this.page.limit = res.data.data.pageSize
    		this.page.page = res.data.data.currPage
    	}else{
    		this.$Message.err(res.data.message)
    	}
    }),
    getRoleList({
    	total: 100,
      	page: 1,
      	limit: 999}).then(res => {
      		console.log(res)
      		if(res.data&&res.data.success){
      			this.roleList = res.data.data.list
      		}else{
      			console.err("加载角色信息出错")
      		}
      	})
  }
}
</script>