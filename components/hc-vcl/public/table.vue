<!--
 * @Author: Hakuro
 * @Project: table组件
 * @Description: 
-->
<template>
	<div class="hcl_table clearfix">
		<vcl-form ref="uiForm" :formObj="tableObj.dataForm" @formBtnClick="formBtnClick"
			@formChange="formChange" @formQuery="formQuery" @formBlur="formBlur"
			v-show="!tableObj.formHidden" />
		<el-table :data="tableObj.tableData" :header-cell-style="headClass" height="600"
			:size="tableObj.size || 'small'" border :show-summary="tableObj.showSummary"
			v-loading="tableObj.loading" @row-click="rowClickFn" @row-dblclick="rowDblclickFn"
			@select="selectFn">
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
					:width="item.width" :minWidth="item.minWidth" :prop="item.key" :align="item.align">
					<template slot-scope="scope">
						<ex-slot :render="item.render" :row="scope.row" :index="scope.$index" :column="item" />
					</template>
				</el-table-column>
				<el-table-column v-else :key="index" :label="item.label" :prop="item.key"
					:width="item.width" :minWidth="item.minWidth" :align="item.align" />
			</template>
		</el-table>
		<el-pagination style="padding:10px " v-show="!tableObj.pageHidden"
			:page-size="tableObj.pageSize" :page-sizes="tableObj.pageSizes || [10, 20, 30, 40]"
			:current-page="tableObj.pageIndex" :total="tableObj.total" class="page" background
			layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange"
			@size-change="handleSizeChange" />
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
		formBtnClick (key, event) {
			console.log('value,item', key);
			this.$emit('formBtnClick', key, event)
		},
		rowClickFn (row, column, event) {
			this.$emit('rowClickFn', row, column, event)
		},
		rowDblclickFn (row, column, event) {
			this.$emit('rowDblclickFn', row, column, event)
		},
		selectFn (selection, row) {
			this.$emit('selectFn', selection, row)
		},
		formQuery (e) {
			this.$emit('formQuery', e)
		},
		//表单项修改
		formChange (event, item) {
			this.$emit('formChange', item.key, item, event)
		},
		//表单项焦点
		formBlur (event, item) {
			this.$emit('formBlur', item.key, item, event)
		},
		handleCurrentChange (e) {
			this.$emit('handleCurrentChange', e)
		},
		handleSizeChange (e) {
			this.$emit('handleSizeChange', e)
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
