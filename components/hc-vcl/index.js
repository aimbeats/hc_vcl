/*
 * @Author: IIISakura
 * @Project: 
 * @Description: 
 */
import vclTable from './public/table.vue'
import vclForm from './public/form.vue'
import vclPopup from './public/newPopup.vue'
// import uiDragPopup from './public/dragPopup.vue'



let ui = {}
ui.install = (Vue,options)=>{
//   Vue.prototype.$info = 'form和table组件库'
//   Vue.prototype.$myMethod = function (arr) {
//     if (arr.length < 0) {
//       return false
//     } else {
//       arr = arr.join('组件库已启用')
//       return arr
//     }
//   }
    Vue.component(vclTable.name, vclTable) // 组件的name属性
    Vue.component(vclForm.name, vclForm) // 组件的name属性
    Vue.component(vclPopup.name, vclPopup) // 组件的name属性
//   Vue.component(uiDragPopup.name, uiDragPopup) // 组件的name属性
}

export default ui
