<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" :buttons="buttons" @on-delete="handleDelete"/>
      <Page :total="page.total" :page-size="page.limit" :current="page.page" show-elevator />
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
export default {
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
                            type: 'error',
                            size: 'small'
                            },
                        on: {
                            click: () => {
                                 this.remove(params.index)
                                    }
                                }
                            }, '冻结')
                 ]);
            }
        }
        ],
      tableData: [],
      page: {
      	total: 100,
      	page: 1,
      	limit: 10
      },
      buttons:[
      	{
      		text: '新增',
      		icon: 'ios-add',
      		acton: 'add',
      		key: 'add',
      		type: 'primary'
      	}
      ]
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    edit(index) {
    	console.log(index)
    	this.$Modal.confirm({
                    title: '编辑',
                    width: 500,
                    closable: false,
                    okText: '保存',
                    cancelText: '取消',
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
                    					value: this.tableData[index].userId
                    				}
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
                    					value: this.tableData[index].userName
                    				}
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
                    					value: this.tableData[index].email
                    				}
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
                    					value: this.tableData[index].mobile
                    				}
                    			})
                    			])
                    		])
                    }
                })
    },
    remove(index){
        this.$Modal.confirm({
        	title: '是否冻结?',
        	okText: '冻结',
            cancelText: '取消',
            onCancel: () => {this.$Modal.remove()},
        	content: `确定要冻结用户 ${this.tableData[index].userName}?`
        })
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    getTableData(this.page).then(res => {
    	if (res.data&&res.data.sucess) {
    		this.tableData = res.data.data.list
    		this.page.total = res.data.data.totalCount
    		this.page.limit = res.data.data.pageSize
    		this.page.page = res.data.data.currPage
    	}else{
    		this.$Message.err(res.data.message)
    	}
    })
  }
}
</script>