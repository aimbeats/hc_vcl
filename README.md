# 基于elementUI二次封装组件库（初版）
## 介绍
旨在减少重复性开发工作，减少代码量，哪怕是后端上手后也能轻松快速画出简单却又功能完整、样式布局统一的系统页面。
+ form表单（vcl_form）：多列表单、展开收起

+ 常规查询页面结构（vcl_table）：上form+中table+下page的查询页面，form和page可隐藏

+ 可拖拽式全屏功能弹窗（vcl_popup）：默认确认+取消按钮

_PS：目前还是初版状态，功能不完善。参考之前工作和同事所开发的组件库设计，个人也用于技术提升实验，建议仅做案列参考（但拿来改改用也不是不行，大概吧）_  

#### 特性
+ 常见的业务场景所需功能：展开收起功能（查询条件过多）、多列表单某项占位更多位置（表单项内容较多需要更长）、弹窗全屏按钮等   
+ 处理了些常见的开发需求：table高度自适应问题，行内表单宽度无法占满100%等 	
+ 尽可能优化提高代码自由度：喜欢iview的table所以特意添加支持了table组件render写法，当然不喜欢的话也可以插槽式写法，弹窗内容同样是插槽式写法；提高rule自由度（不觉的rule全写一块挺讨厌的么？）	

#### UI风格变更
> + 按钮等size大小统一默认更换为small   
> + 表格滚动条样式更换为[圆角、宽度6、颜色rgba(0, 0, 0, 0.3)]

### 安装
***

### 使用文档
***



#### 表单组件（vcl_form）

> + 支持多列表单     
> + 支持Rules对应书写（暂未实现）    
> + （table扩展）自定义按钮
> + （table扩展）展开收起功能

##### API
**Form Attributes**

| 参数          | 说明                                                      | 类型    | 可选值                | 默认值 |
| ------------- | --------------------------------------------------------- | ------- | --------------------- | ------ |
| id            | **必填** form唯一标识                                     | string  | -                     | -      |
| col           | 一行所占列数 <br> Ps:不填写默认非行内表单（等同于col：1） | number  | -                     | -      |
| size          | 表单域控件大小样式                                        | string  | medium / small / mini | small  |
| labelPosition | 表单域标签位置                                            | string  | right/left/top        | right  |
| labelWidth    | 表单域标签宽度                                            | string  | -                     | 100px  |
| label-suffix  | 表单域标签的后缀                                          | string  | -                     | -      |
| showQuery     | 是否展示查询、重置按钮、展开收起功能                      | boolean | -                     | false  |
| selectData    | 存放选择框等列表数据                                      | array   | -                     | -      |
| modelData     | 存放表单相关对应的值                                      | object  | -                     | -      |

**Form formItem(itemArr)**

| 参数     | 说明                                                | 类型    | 可选值                                              | 默认值 |
| -------- | --------------------------------------------------- | ------- | --------------------------------------------------- | ------ |
| key      | **必填 ** 控件唯一标识、用于prop校验关联等          | string  | -                                                   | -      |
| type     | **必填 ** 控件输入类型                              | number  | -                                                   | -      |
| label    | 控件标签文本                                        | string  | nullItem/text/input/select<br>inputNumber/time/date | -      |
| col      | 控件单独所占行                                      | string  | -                                                   | 1      |
| isHidden | 是否隐藏，用于展开收起功能或单独暂时隐藏处理        | boolean | -                                                   | false  |
| ....     | 不同控件基本跟element相关控件保持一致，没有的待补全 |         |                                                     |        |

**Form btnGroup**

| 参数     | 说明                    | 类型    | 可选值 | 默认值  |
| -------- | ----------------------- | ------- | ------ | ------- |
| key      | **必填** button唯一标识 | string  | -      | -       |
| value    | 按钮名称                | string  | -      | -       |
| type     | 按钮样式                | string  | -      | primary |
| disabled | 是否禁用                | boolean | -      | false   |

**Form Methods**

| 方法名       | 说明               | 参数           |
| ------------ | ------------------ | -------------- |
| formQuery    | 表单查询按钮触发   | event          |
| formBtnClick | 表单自定义按钮触发 | key,event      |
| formChange   | 表单change触发     | key,item,event |
| formBlur     | 表单blur触发       | key,item,event |
| ....         | 功能待补全         |                |

**Form Event**

| 方法名 | 说明                   | 返回值  |
| ------ | ---------------------- | ------- |
| verify | 触发校验并返回校验结果 | Boolean |



#### 弹窗组件(vcl_popup)

> + 添加全屏开关功能     
> + 支持可拖拽（暂未实现）    
> + 默认查询、取消按钮或自定义按钮组
##### Api
**popup Attributes**

| 参数  | 说明                  | 类型    | 可选值 | 默认值 |
| ----- | --------------------- | ------- | ------ | ------ |
| show  | **必填** 是否展示弹窗 | boolean | -      | -      |
| width | 弹窗宽度              | string  | -      | -      |
| title | 弹窗标题              | string  | -      | -      |

**popup btnArr**

| 参数     | 说明                    | 类型    | 可选值 | 默认值  |
| -------- | ----------------------- | ------- | ------ | ------- |
| key      | **必填** button唯一标识 | string  | -      | -       |
| value    | 按钮名称                | string  | -      | -       |
| type     | 按钮样式                | string  | -      | primary |
| disabled | 是否禁用                | boolean | -      | false   |

**popup Methods**

| 方法名       | 说明               | 参数           |
| ------------ | ------------------ | -------------- |
| popupClick | 弹窗自定义按钮触发 | key,event      |

**popup Event**

| 方法名 | 说明                   | 参数           | 默认值 |
| ------ | ---------------------- | ------- | ------- |
| setDefaultBtnDisabled | 是否禁用默认的确定按钮 | Boolean |false|




### 表格组件(vcl_table)

> + flex布局，表格自适应填充     
> + 支持iview的render写法或slot插槽写法    
> + （form表单）自定义按钮
> + （form表单）展开收起功能

##### API
**Table Attributes**

| 参数       | 说明                 | 类型    | 可选值 | 默认值           |
| ---------- | -------------------- | ------- | ------ | ---------------- |
| loading    | 是否展示表格加载状态 | boolean | -      | false            |
| tableData  | 表格数据存放         | array   | -      | -                |
| pageIndex  | 分页当前位置         | string  | -      | -                |
| pageSize   | 分页大小             | string  | -      | [10, 20, 30, 40] |
| total      | 总数                 | string  | -      | -                |
| formHidden | 是否隐藏查询条件部分 | boolean | -      | false            |
| pageHidden | 是否隐藏分页部分     | boolean | -      | false            |

**Table dataForm**

***参考vcl_form表单配置***

**Table tableColumn**

| 参数     | 说明                                       | 类型   | 可选值                      | 默认值 |
| -------- | ------------------------------------------ | ------ | --------------------------- | ------ |
| key      | **必填 ** 表格列唯一标识（特殊type可不填） | string | -                           | -      |
| type     | 表格列类型（不填写默认为常规表格列）       | string | index/selection/slot/render | -      |
| width    | 表格列固定宽度                             | number | -                           | -      |
| minWidth | 表格列最小宽度                             | number | -                           | -      |
| align    | 对齐方式                                   | string | left/center/right           | left   |
| ....     | 功能还未写完，待补全                       |        |                             |        |

**Table btnGroup**

| 参数     | 说明                    | 类型    | 可选值 | 默认值  |
| -------- | ----------------------- | ------- | ------ | ------- |
| key      | **必填** button唯一标识 | string  | -      | -       |
| value    | 按钮名称                | string  | -      | -       |
| type     | 按钮样式                | string  | -      | primary |
| disabled | 是否禁用                | boolean | -      | false   |

**Table Methods**

| 方法名              | 说明               | 参数             |
| ------------------- | ------------------ | ---------------- |
| formQuery           | 表单查询按钮触发   | event            |
| formBtnClick        | 表单自定义按钮触发 | key,event        |
| formChange          | 表单change触发     | key,item,event   |
| formBlur            | 表单blur触发       | key,item,event   |
| rowClickFn          | 表格行点击触发     | row,column,event |
| rowDblclickFn       | 表格行双击触发     | row,column,event |
| selectFn            | 多选框触发         | selection, row   |
| handleCurrentChange | 分页位置变更触发   | value            |
| handleSizeChange    | 分页大小变更触发   | value            |
| ....     | 功能还未写完，待补全                       |        |                             |        |




### 备注
***
弹窗可拖拽式效果不理想，设计的样式和偏移有冲突，先放着吧，反正是自定义指令

计划添加更多的组件、功能
