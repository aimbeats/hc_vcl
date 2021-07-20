<!--
 * @Author: IIISakura
 * @Project: 
 * @Description: 
-->
<template>
	<div>
		<!-- 占位项 -->
		<div v-if="item.type === 'nullItem'" style="width:100%" />
		<!-- 文本展示项 -->
		<div v-else-if="item.type === 'text'" slot="content">{{formItem[item.key]}}</div>
		<!-- 常规输入框 -->
		<el-input v-else-if="item.type === 'input'" v-model="formItem[item.key]"
			:minlength="item.minlength" :maxlength="item.maxlength"
			:clearable="item.clearable?item.clearable:false" :disabled="item.disabled?item.disabled:false"
			:autocomplete="item.autocomplete || 'off'" :type="item.inputType || 'text'"
			@input="formChange($event,item)" @change="formBlur($event,item)"
			:placeholder="item.placeholder?item.placeholder:'请输入内容'" style="width:100%" />
		<!-- 常规下拉选择框 -->
		<el-select v-else-if="item.type === 'select'" filterable
			:multiple="item.multiple?item.multiple:false" :remote="item.remote?item.remote:false"
			:remote-method="item.remoteMethod?item.remoteMethod:null"
			:placeholder="item.placeholder || '请选择'" :clearable="item.clearable!=null?item.clearable:true"
			:popper-append-to-body="false" :allow-create="item.allowCreate || false"
			:disabled="item.disabled || false" v-model="formItem[item.key]" style="width:100%"
			:filter-method="item.filterMethod" @change="formChange($event,item)"
			@blur="formBlur($event,item)" @visible-change="formVisibleChange($event,item)">
			<el-option v-for=" (it,index) in formObj.selectData[item.key]" :key="index" :label="it.label"
				:value="it.value">
			</el-option>
		</el-select>
		<!-- 数字输入框 -->
		<el-input-number style="width:100%" v-if="item.type ==='inputNumber'"
			v-model="formItem[item.key]" :controls="item.controls?item.controls:false"
			:precision="item.precision?item.precision:null" controls-position="right"
			:disabled="item.disabled?item.disabled:false" @change="formChange($event,item)"
			:min="item.min" :max="item.max" />
		<!-- 时间选择框 -->
		<el-time-picker style="width:100%" v-if="item.type=='time'" v-model="formItem[item.key]"
			:editable="item.editable!=null?item.editable:true"
			:picker-options="item.pickerOptions?item.pickerOptions:null" @change="formChange($event,item)"
			placeholder="任意时间点" />
		<!-- 日期选择框  -->
		<el-date-picker v-if="item.type=='date'" v-model="formItem[item.key]"
			:popper-append-to-body="false" :clearable="item.clearable===false?item.clearable:true"
			:disabled="item.disabled?item.disabled:false" :type="item.dataType!=null?item.dataType:'date'"
			:format="item.format!=null?item.format:'yyyy-MM-dd'"
			:value-format="item.valueFormat!=null?item.valueFormat:'yyyy-MM-dd'"
			:picker-options="item.pickerOptions?item.pickerOptions:null" placeholder="请选择日期"
			@change="formChange($event,item)" />
	</div>
</template>

<script>
export default {
	name: 'formItem',
	props: {
		'formObj': Object,
		'formItem': Object,
		'item': Object
	},
	data () {
		return {}
	},
	mounted () {
		// console.log('formItem', this.formItem);
	},
	methods: {
		//表单项修改
		formChange (event, item) {
			this.$emit('formChange', event, item, item.key)
		},
		//表单项焦点
		formBlur (event, item) {
			this.$emit('formBlur', event, item, item.key)
		}
	}
}
</script>

<style>
</style>
