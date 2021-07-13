<!--
 * @Author: Hakuro
 * @Project: table组件
 * @Description: 
-->
<template>
	<div class="hcl_table clearfix">
		<vcl-form ref="uiForm" :formObj="tableObj.dataForm" @formBtnClick="formBtnClick" />
		<el-table :data="tableObj.tableData" :header-cell-style="headClass" height="600" size="small"
			border>
			<template v-for="(item,index) in tableObj.tableColumn">
				<!--复选框-->
				<el-table-column v-if="item.type=='selection'" :key="index" type="selection"
					:width="item.width || 60" :align="item.align || 'center'">
				</el-table-column>
				<!--序号 -->
				<el-table-column v-else-if="item.type=='index'" :key="index" type="index"
					:label="item.title || '序号'" :width="item.width || 60" :align="item.align || 'center'">
				</el-table-column>
				<slot v-else-if="item.slot" :name="item.slot" :tit='index'></slot>
				<el-table-column v-else-if="item.type=='render'" :key="index" :label="item.label"
					:prop="item.key">
					<template slot-scope="scope">
						<ex-slot :render="item.render" :row="scope.row" :index="scope.$index" :column="item" />
					</template>
				</el-table-column>
				<el-table-column v-else :key="index" :label="item.label" :prop="item.key" />
			</template>
		</el-table>
		<el-pagination style="padding:10px " :page-size="tableObj.pageSize"
			:page-sizes="[10, 20, 30, 40]" :current-page="tableObj.pageIndex" :total="tableObj.total"
			class="page" background layout="total, sizes, prev, pager, next" />
		<!-- <button @click="btn">测试</button> -->
	</div>
</template>

<script>
var exSlot = {
	functional: true,
	props: {
		row: Object,
		render: Function,
		index: Number,
		column: {
			type: Object,
			default: null
		}
	},
	render: (h, data) => {
		const params = {
			row: data.props.row,
			index: data.props.index
		}
		if (data.props.column) params.column = data.props.column
		return data.props.render(h, params)
	}
}
export default {
	name: 'vclTable',
	components: { exSlot },
	data () {
		return {}
	},
	props: {
		'tableObj': Object
	},
	mounted () { },
	methods: {
		// 表头样式设置
		headClass () {
			// return 'background:#eef1f6;'
			// return ''
		},
		formBtnClick (event, key) {
			console.log('value,item', key);
			this.$emit('formBtnClick', key, event)
		}
	}
}
</script>

<style>
html {
	width: 100%;
	height: 100%;
}
body {
	width: 100%;
	height: 100%;
	margin: 0;
}
</style>
<style scoped>
.hcl_table {
	display: flex;
	flex-flow: column wrap;
	height: 100%;
}
.hcl_table >>> .el-table {
	padding: 0 4px;
}
.hcl_table >>> .el-table__body-wrapper::-webkit-scrollbar {
	width: 6px;
}
.hcl_table >>> .el-table__body-wrapper::-webkit-scrollbar {
	width: 6px;
}
.hcl_table >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 3px;
}
.page {
	padding: 10px;
	text-align: right;
}
</style>