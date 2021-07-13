<!--
 * @Author: IIISakura
 * @Project: 
 * @Description: 
-->
<template>
	<div>
		<div v-if="item.type === 'nullItem'"></div>
		<el-input v-else-if="item.type === 'input'" v-model="formItem[item.key]" placeholder="请输入内容"
			style="width:100%" />
		<el-select v-else-if="item.type === 'select'">
			<el-option v-for="(item,index) in formItem.selectData[item.key]" :key="index"
				:label="it.label" :value="it.value">
			</el-option>
		</el-select>
	</div>
</template>

<script>
export default {
	name: 'formItem',
	props: {
		'formItem': Object,
		'item': Object
	},
	data () {
		return {}
	}
}
</script>

<style>
</style>
