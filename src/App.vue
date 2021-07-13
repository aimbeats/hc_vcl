<template>
	<div class="hcl_table clearfix">
		<vcl-table ref="vclTable" :tableObj="tableObj" @formBtnClick="formBtnClick">
			<el-table-column slot="operateT" label="操作" align='center' width='120'>
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="edit(scope.row)">查看</el-button>
					<el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
				</template>
			</el-table-column>
		</vcl-table>
		<vcl-popup :popObj="popObj">
			<vcl-form ref="uiForm" :formObj="dataForm" />
		</vcl-popup>
	</div>
</template>

<script>
export default {
	name: 'App',
	data () {
		return {
			popObj: {
				title: '新增',
				show: false
			},
			tableObj: {
				dataForm: {
					id: 'tableForm',
					col: 4,
					labelWidth: '100',
					labelPosition: 'right',
					showQuery: true,
					itemArr: [
						{
							type: 'input',
							key: 'keyName1',
							label: '钥匙名称1'
						},
						{
							type: 'input',
							key: 'keyName2',
							label: '钥匙名称2',
							needHidden: true,
							col: 2
						},
						{
							type: 'input',
							key: 'keyName3',
							label: '钥匙名称3',
							needHidden: true
						},
						{
							type: 'input',
							key: 'keyName4',
							label: '钥匙名称4',
							needHidden: true
						},
						{
							type: 'input',
							key: 'keyName4',
							label: '钥匙名称4'
						},
						{
							type: 'input',
							key: 'keyName4',
							label: '钥匙名称5',
							needHidden: true
						},
						{
							type: 'input',
							key: 'keyName4',
							label: '钥匙名称6',
							needHidden: true
						}
					],
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
					modelData: {
						keyName1: 1,
						keyCode: 1
					}
				},
				tableColumn: [
					{
						type: 'index'
					}, {
						label: '名称',
						key: 'name'
					}, {
						label: '性别',
						key: 'sex'
					}, {
						label: '生日',
						key: 'birday'
					}, {
						label: '自定义reader',
						type: 'render',
						render: (h, params) => { return h('el-button', params.row.reader) }
					}, {
						slot: 'operateT'
					}
				],
				tableData: [],
				pageIndex: 1,
				pageSize: 10,
				total: 0
			},
			dataForm: {
				id: 'form',
				col: 2,
				labelWidth: '100',
				labelPosition: 'right',
				showQuery: false,
				itemArr: [
					{
						type: 'input',
						key: 'keyName1',
						label: '钥匙名称1'
					},
					{
						type: 'input',
						key: 'keyName2',
						label: '钥匙名称2',
						needHidden: true,
						col: 2
					},
					{
						type: 'input',
						key: 'keyName3',
						label: '钥匙名称3',
						needHidden: true
					},
					{
						type: 'input',
						key: 'keyName4',
						label: '钥匙名称4',
						needHidden: true
					},
					{
						type: 'input',
						key: 'keyName4',
						label: '钥匙名称4'
					},
					{
						type: 'input',
						key: 'keyName4',
						label: '钥匙名称5',
						needHidden: true
					},
					{
						type: 'input',
						key: 'keyName4',
						label: '钥匙名称6',
						needHidden: true
					}
				],
				modelData: {
					keyName1: 1,
					keyCode: 1
				}
			}

		}
	},
	mounted () {
		// this.dataForm.keyName == '111'
		// console.log('22');
		for (let index = 0; index < 50; index++) {
			this.tableObj.tableData.push({
				name: '姓名' + (index + 1),
				reader: 'reader' + (index + 1),
				sex: '男',
				birday: '2021'
			})
		}
		this.$nextTick(e => {
			this.dataForm.modelData.keyName1 = 2
			// this.$set(this.$refs.uiForm.formItem, 'keyName', '1113')
		});

	},
	methods: {
		edit (row) {
			console.log('row', row);
		},
		formBtnClick (key) {
			console.log('value,key', key);
			switch (key) {
				case 'add':
					// this.popObj.show = false;
					this.popObj.show = true;
					break;
				case 'export':
					this.tableObj.dataForm.modelData.keyName1++;
					console.log('this.dataForm.modelData', this.dataForm.modelData);
					break;
				default:
					break;
			}
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
