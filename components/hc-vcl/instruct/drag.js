/*
 * @Author: Hakuro
 * @Project: v-drag(可拖拽指令)
 * @Description: 
 */
import Vue from 'vue'
Vue.directive('drag',{
    /**
     * @param {*} el 所绑定的元素，可以直接操作dom
     * @param {*} binding 对象，内容包含：name（指令名），value（绑定值），指令表达式等等
     * @param {*} vnode 生成的虚拟节点
     */
    bind(el,binding,vnode){
        let header = el.querySelector('.el-dialog__header'),
            dv = el.querySelector('.el-dialog'),
            cursorP = {
                x : 0,
                y : 0
            },
            offsetP = {
                x : 0,
                y : 0
            },
            allowMove = false;
        console.log('el',el);
        console.log('header',header);
        let start = e =>{
            console.log('start');
            cursorP = {
                x : e.clientX, 
                y : e.clientY
            };
            //获取左部和顶部的偏移量
            offsetP = {
                x : el.offsetLeft, 
                y : el.offsetTop
            };
            el.style.cursor = 'move';
            allowMove = true;
        },end = e => {
            console.log('end');
            allowMove = false;
            el.style.cursor = 'default';
        };
        window.onmousemove = e => {
            // console.log('allowMove',allowMove);
            if (allowMove == false) {
                return;
            }
            //获取x和y
            var nP = {
                x : e.clientX,
                y : e.clientY
            };
            //计算移动后的左偏移量和顶部的偏移量
            var oP = {
                x : nP.x - (cursorP.x - offsetP.x),
                y : nP.y - (cursorP.y - offsetP.y)
            };

            // console.log('nP',nP);
            // console.log('cursorP',cursorP);
            // console.log('offsetP',offsetP);
            // console.log('oP',oP);
            el.style.left = oP.x + 'px';
            el.style.top = oP.y + 'px';
        }
        header.addEventListener('mousedown',start)
        header.addEventListener('mouseup',end)
    }
})