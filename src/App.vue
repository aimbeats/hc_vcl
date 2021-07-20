<!--
 * @Author: Hakuro
 * @Project: 演示界面
 * @Description: 
-->
<template>
	<div class="hcl_table clearfix">
		<!-- table组件 -->
		<vcl-table ref="vclTable" :tableObj="tableObj" @formBtnClick="formBtnClick"
			@formChange="formChange" @formBlur="formBlur" @formQuery="formQuery"
			@handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
			<!-- slot写法 -->
			<el-table-column slot="operateT" label="操作" align='center' width='120'>
				<template slot-scope="scope">
					<el-button type="primary" size="mini" icon="el-icon-edit" circle @click="edit(scope.row)">
					</el-button>
					<el-button type="danger" size="mini" icon="el-icon-delete" circle
						@click="del(scope.$index)">
					</el-button>
				</template>
			</el-table-column>
		</vcl-table>
		<!-- 弹窗组件 -->
		<vcl-popup ref="pop" :popObj="popObj" @popupBtnFn="popupBtnFn">
			<!-- form组件 -->
			<vcl-form ref="uiForm" :formObj="dataForm" />
		</vcl-popup>
	</div>
</template>

<script>
export default {
	name: 'App',
	data () {
		return {
			// 弹窗配置
			popObj: {
				title: '新增',
				show: false
			},
			// 表格组件配置
			tableObj: {
				loading: false,
				dataForm: {
					id: 'tableForm',
					col: 6,
					labelWidth: '100',
					labelPosition: 'right',
					showQuery: true,
					itemArr: [
						{
							type: 'input',
							key: 'name',
							label: '用户姓名'
						},
						{
							type: 'select',
							key: 'isOverdue',
							label: '是否过期'
						},
						{
							type: 'date',
							key: 'date',
							label: '登记日期',
							isHidden: true
						},
						{
							type: 'input',
							key: 'keyName4',
							label: '地址',
							col: 3,
							isHidden: true
						}
					],
					selectData: {
						isOverdue: [{
							label: '是',
							value: '是'
						}, {
							label: '否',
							value: '否'
						}]
					},
					btnGroup: [
						{
							value: '新增',
							key: 'add'
						},
						{
							value: '导入',
							key: 'export'
						}
						// {
						// 	value: '导出',
						// 	key: 'export'
						// }
					],
					modelData: {}
				},
				tableColumn: [
					{
						type: 'index'
					}, {
						label: '用户名称',
						key: 'name',
					}, {
						label: '登记日期',
						key: 'date'
					}, {
						label: '地址',
						key: 'address',
						minWidth: 160
					}, {
						label: '是否过期',
						type: 'render',
						width: 100,
						align: 'center',
						render: (h, params) => {
							let iO = params.row.isOverdue
							return h('span', {
								props: {},
								style: {
									color: iO ? '#ff0000' : '#606266'
								},
								on: {
									click: () => { }
								}
							}, iO ? '是' : '否')
						}
					}, {
						slot: 'operateT'
					}
				],
				tableData: [],
				pageIndex: 1,
				pageSize: 10,
				total: 0
			},
			//弹窗内的表单组件配置
			dataForm: {
				id: 'form',
				col: 2,
				labelWidth: '100',
				labelPosition: 'right',
				showQuery: false,
				itemArr: [
					{
						type: 'input',
						key: 'name',
						label: '用户姓名'
					},
					{
						type: 'select',
						key: 'isOverdue',
						label: '是否过期'
					},
					{
						type: 'date',
						key: 'date',
						label: '登记日期'
					},
					{
						type: 'input',
						key: 'address',
						label: '地址',
						col: 2
					},
					{
						type: 'input',
						key: 'remark',
						label: '备注',
						inputType: 'textarea',
						col: 2
					}
				],
				rules: {
					name: [{ required: true, message: '用户姓名不能为空', trigger: ['blur', 'change'] }]
				},
				selectData: {
					isOverdue: [{
						label: '是',
						value: '是'
					}, {
						label: '否',
						value: '否'
					}]
				},
				modelData: {
					name: '',
					isOverdue: '',
					date: '',
					address: '',
					remark: ''
				}
			}
		}
	},
	mounted () { },
	methods: {
		/**
		 * 按钮集合：table组件的按钮事件
		 * @description 不包含查询重置，查询方法是formQuery
		 * @param {Str} key 按钮的唯一标识，对应着itemArr里的key值
		 */
		formBtnClick (key) {
			console.log('value,key', key);
			switch (key) {
				case 'add':
					this.popObj.show = true;
					break;
				case 'export':
					break;
				default:
					break;
			}
		},
		/**
		 * 查询：form的查询事件
		 * @deprecated formQuery默认返回event本身，但本身其实是空的
		 * @param {Num}} index 当前分页位置，设计的常规写法
		 */
		formQuery (index = 1) {
			this.tableObj.loading = true;
			setTimeout(() => {
				for (let index = 0; index < 20; index++) {
					this.tableObj.tableData.push({
						name: '姓名' + (index + 1),
						isOverdue: Math.round(Math.random()),
						date: '2021年1月1号',
						address: 'XX路XX小区XX单元'
					})
				}
				this.tableObj.loading = false;
				this.tableObj.pageIndex = index;
				this.tableObj.total = 100;
			}, 1000);
		},
		/**
		 * 按钮集合：弹窗按钮事件
		 * @description 默认按钮中确认的key为“submit”，取消按钮不会触发该方法而是默认关闭弹窗
		 * @param {Str} key 按钮的唯一标识，对应着btnArr里的key值
		 */
		popupBtnFn (key) {
			if (this.$refs.uiForm.verify) {
				this.$refs.pop.setDefaultBtnDisabled(true)
				setTimeout(() => {
					this.$message.success('添加!')
					this.$refs.pop.setDefaultBtnDisabled(true)
					this.tableObj.tableData.push(this.dataForm.modelData)
					this.popObj.show = false;
				}, 500);
			}
		},
		/**
		 * 编辑：table内部slot插槽的编辑方法
		 * @param {Obj} row 所在行的数据
		 */
		edit (row) {
			console.log('row', row);
			this.dataForm.modelData = JSON.parse(JSON.stringify(row));
			this.popObj.show = true;
		},
		/**
		 * 删除：table内部slot插槽的删除方法
		 * @param {Num} index 所在行的index位置
		 */
		del (index) {
			this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.listloading = true;
				setTimeout(() => {
					this.tableObj.tableData.splice(index, 1);
					this.$message.success('删除成功!');
				}, 500);
			}).catch(() => {
				this.$message.info('已取消删除!');
			})
		},
		/**
		 * 分页位置变更
		 * @param {Num} e 分页pageIndex的值
		 */
		handleCurrentChange (e) {
			this.formQuery(e)
		},
		/**
		 * 分页大小变更
		 * @param {Num} e 分页pageSize的值
		 */
		handleSizeChange (e) {
			this.tableObj.pageSize = e;
			this.formQuery()
		}
	}
}
</script>

<style>
/* html {
	width: 100%;
	height: 100%;
}
body {
	width: 100%;
	height: 100%;
	margin: 0;
} */
</style>
<style scoped>
.hcl_table {
	/* display: flex;
	flex-flow: column wrap; */
	height: 100%;
}
.page {
	padding: 10px;
	text-align: right;
}
</style>
