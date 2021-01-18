/**
 * 向下广播
 * @param {string} componentName  目标组件名称
 * @param {string} eventName 事件名称
 * @param {*} params 
 */
function broadCast(componentName,eventName,params) {
    //拿到子元素开始遍历,找到目标组件
    this.$children.forEach(child => {
        let name = child.$options.name;
        if(name === componentName){
            //发射事件，传递参数
            child.$emit.apply(child,[eventName].concat(params));
        }else{
            // broadCast(child,eventName,params)
            broadCast.apply(child,[componentName,eventName].concat(params))
        }
        //Q:为啥作者要使用apply
    });
}

export default {
    methods: {
        dispatch(componentName,eventName,params){
            //向上找到目标组件,派发事件并传递参数
            let parent = this.$parent || this.$root;
            while ( parent&& parent.$options.name !== componentName) {
               parent = parent.$parent; 
            }
            if (parent) {
                parent.$emit.apply(parent,[eventName].concat(params))
            }
        },
        broadCast(componentName,eventName,params){
            broadCast.apply(this,[componentName,eventName].concat(params))
        }
    },
}