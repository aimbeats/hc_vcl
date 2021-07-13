<!--
 * @Author: IIISakura
 * @Project: 
 * @Description: 
-->
<template>
	<div class="popup">
		<el-dialog :visible.sync="popObj.show" :fullscreen="fullscreen" :width="popObj.width"
			:close-on-click-modal=false>
			<!-- 加个全屏按钮 -->
			<span slot="title">
				<span class="el-dialog__title">{{popObj.title}}</span>
				<el-button type="text" :icon="fullscreen ? 'el-icon-minus' : 'el-icon-full-screen'"
					class="el-dialog__headerbtn full_screen" @click="fullscreen = !fullscreen" />
			</span>
			<slot></slot>
			<span slot="footer" class="dialog-footer">
				<!-- 自定义的按钮组 -->
				<div v-if="popObj.btnArr&&popObj.btnArr.length>0">
					<el-button v-for="(item) in popObj.btnArr" :key="item.key" :type="item.type?item.type:''"
						:disabled="item.disabled" @click="popupClick($event,item.key)">{{item.title}}
					</el-button>
				</div>
				<div v-else>
					<el-button size="small" :disabled="isDisabled" @click="popObj.show = false">取 消
					</el-button>
					<el-button size="small" :disabled="isDisabled" type="primary"
						@click="popupClick($event,'submit')">确 定
					</el-button>
				</div>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'vclPopup',
	props: {
		'popObj': Object
	},
	data () {
		return {
			fullscreen: false,
			isDisabled: false
		}
	},
	methods: {
		popupClick (event, type) {
			this.$emit('popupBtnFn', type);
		},
		//设置默认按钮的disabled的状态
		setDefaultBtnDisabled (disabled = false) {
			this.isDisabled = disabled;
		}
	}
}
</script>

<style scoped>
.full_screen {
	padding: 0;
	font-size: 18px !important;
	color: #909399;
	right: 50px;
}
.popup >>> .el-dialog {
	display: flex;
	flex-flow: column wrap;
}
.popup >>> .el-dialog__header {
	padding: 15px 20px;
	background: #f8f8f8;
}
.popup >>> .el-dialog__header {
	padding: 15px 20px;
	background: #f8f8f8;
}
.popup >>> .el-dialog__headerbtn {
	font-size: 20px;
}

.popup >>> .el-dialog__body {
	flex: 1;
	border-top: 1px solid #e4e4e4;
	/* border-bottom: 1px solid #e4e4e4; */
}
</style>
