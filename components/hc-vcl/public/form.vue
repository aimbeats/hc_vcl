<!--
 * @Author: IIISakura
 * @Project: 
 * @Description: formObj配置项
 * formObj:{
        id:'',//必填项，string,
        col: 1,//必填项
    }
-->
<template>
	<div :ref="formObj.id" :style="{ padding:showMore ? '20px 10px 0 0' : '20px 10px 20px 0'}">
		<el-form :ref="'form'+formObj.id" :model="formItem" :rules="formObj.rules || null"
			:label-position="formObj.labelPosition?formObj.labelPosition:'right'"
			:inline="Boolean(formObj.col)"
			:label-width="formObj.labelTop?'100%':(formObj.labelWidth?formObj.labelWidth+'px':'100px')"
			:label-suffix="formObj.labelSuffix || ''" :size="formObj.size || 'small '"
			style="display:inline">
			<el-form-item v-for="(item,index) in formObj.itemArr" :key="index" :label="item.label"
				:prop="item.prop" v-show="!item.needHidden || !showMore" :style="{
                    width:(item.col ? 100/(formObj.col || 1) * item.col :100/(formObj.col || 1)) +'%',
                }">
				<form-item :formItem="formItem" :item="item"></form-item>
			</el-form-item>
			<div class="queryMod" v-if="formObj.showQuery">
				<el-button type="primary" :size="formObj.size || 'small'">查询</el-button>
				<el-button :size="formObj.size || 'small'" @click="resetFn">重置</el-button>
				<a @click="showMore = !showMore" class="more_a">{{ showMore ? '展开' : '收起'}}
					<i :class="showMore ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>
				</a>
			</div>
		</el-form>
		<div v-if="formObj.btnGroup" class="btn_group">
			<template v-for="item in formObj.btnGroup">
				<el-button :key="item.key" :type="item.type || 'primary'" :disabled="item.disabled"
					:size="formObj.size || 'small'" @click="formBtnClick($event,item)">
					{{item.value}}</el-button>
			</template>
		</div>
		<!-- <el-form :ref="formObj.id" :model="formItem" :inline="formObj.inline ?? true"></el-form> -->
	</div>
</template>
<script>
//form表单元素      
import formItem from './formItem'
export default {
	name: "vclForm",
	components: {
		formItem
	},
	props: {
		'formObj': Object
	},
	data () {
		return {
			formItem: {},
			showMore: true
		}
	},
	created () { },
	mounted () {
		this.setFormContent();
		// this.formObj.itemArr && this.formObj.itemArr.forEach(item => {
		// 	console.log('this.$refs[this.formObj.id].model', this.$refs[this.formObj.id]);
		// 	this.$set(this.$refs[this.formObj.id].model, item.key, item.model || null)
		// });
	},
	watch: {
		'formObj': {
			handler (val, newval) {
				this.setFormContent()
			},
			deep: true
		},
		'formObj.modelData': {
			handler (newVal) {
				console.log('newVal', newVal);
				this.formItem = newVal;
			},
			immediate: true,
			deep: true
		}
	},
	computed: {},
	methods: {
		formBtnClick (event, item) {
			this.$emit('formBtnClick', event, item.key)
		},
		/** 输入框的宽度计算 */
		setFormContent () {
			// console.log('1111');
			//设置labelWidth的宽度，如果没有设置就默认100
			this.labelWidth = this.formObj.labelWidth || 100;

			// console.log('this.$refs[this.formObj.id]', this.$refs[this.formObj.id]);
			this.$nextTick(e => {
				let custForm = this.$refs[this.formObj.id],
					formContent = custForm.getElementsByClassName('el-form-item__content'),
					len = formContent.length;

				for (let i = 0; i < len; i++) {
					formContent[i].style.width = `calc(100% - ${this.labelWidth}px)`;

					if (formContent[i].parentNode.getAttribute('tag') == 'selectInputComp' || formContent[i].parentNode.getAttribute('tag') == 'selectDateComp' || formContent[i].parentNode.getAttribute('tag') == 'beforeSelectComp') {
						//如果是带select的输入框或者带select的日期选择器，是不需要label的
						formContent[i].style.width = `100%`;
					}
				}
			})
		},
		/** 重置 */
		resetFn () {
			this.$refs['form' + this.formObj.id].resetFields();
		}
	}
}
</script>
<style scoped>
.el-form--inline .el-form-item {
	margin-right: 0px;
}
.queryMod {
	display: inline-block;
	margin-left: 10px;
}
.more_a {
	margin-left: 5px;
	font-size: 14px;
	cursor: pointer;
	color: rgb(64, 158, 255);
}
.btn_group {
	float: right;
}
</style>
